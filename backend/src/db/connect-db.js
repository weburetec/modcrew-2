const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})

		console.log(`Connected to MongoDB Server ${conn.connection.host}`.cyan.bold)
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = connectDB
  