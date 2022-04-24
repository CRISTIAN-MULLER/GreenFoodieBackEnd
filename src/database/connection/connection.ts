require('dotenv').config()

const { mongoose } = require('mongoose')

const { log } = require('mercedlogger')

const { MONGO_URL } = process.env

/// ////////////////////////////////
// Making the Database Connection
/// ////////////////////////////////
mongoose.connect(MONGO_URL!)

/// ////////////////////////////////
// Handling Connection Events
/// ////////////////////////////////
mongoose.connection
	// Event for When Connection Opens
	.on('open', () => log.green('STATUS', 'Connected to Mongo'))
	// Event for When Connection Closes
	.on('close', () => log.red('STATUS', 'Disconnected from Mongo'))
	// Event for Connection Errors
	.on('error', (error: any) => log.red('ERROR', error))

/// ////////////////////////////////
// Exporting Our Connection
/// ////////////////////////////////
module.exports = mongoose
