const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing reactions
    // await Reaction.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Create array to hold the user seeds
    const users = [
        {
            username: 'Zell',
            email: 'testing1@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Vincy',
            email: 'testing2@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Shion',
            email: 'testing3@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'George',
            email: 'testing4@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Mitch',
            email: 'testing5@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Toby',
            email: 'testing6@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Bob',
            email: 'testing7@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Susanne',
            email: 'testing8@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Patrick',
            email: 'testing9@gmail.com',
            thoughts: [],
            friends: []
        },
        {
            username: 'Mariano',
            email: 'testing10@gmail.com',
            thoughts: [],
            friends: []
        }
    ];

    // add users to the collection and await the results
    await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});