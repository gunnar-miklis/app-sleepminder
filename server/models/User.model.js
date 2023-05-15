const { Schema, model } = require( 'mongoose' );

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		birth: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ['', 'female', 'male', 'diverse'],
		},
		weight: {
			type: Number,
		},
		height: {
			type: Number,
		},
		wakeTime: {
			type: String,
		},
		bedTime: {
			type: String,
		},
		sleepTips: {
			type: [],
		},
		caffeine: {
			type: Boolean,
		},
		alcohol: {
			type: Boolean,
		},
		moods: {
			type: [],
		},
	},
	{
		timestamps: true,
	},
);

const User = model( 'User', userSchema );

module.exports = User;
