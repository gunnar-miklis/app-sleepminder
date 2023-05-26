const { Schema, model } = require( 'mongoose' );

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
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
