const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/validEmail')
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            min: 3,
            max: 20,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please provide a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'user' ,
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    },
    {timestamps: true},    
);

// create virtual 'friends' property for friends field
userSchema.virtual('userFriends',{
    ref: 'user',
    localField: '_id',
    foreignField: 'friends',
    justOne: false,
},
{toJSON: {virtuals: true} }
)

// create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// initialize our User model
const User = model('user', userSchema);

module.exports = User;