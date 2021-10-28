const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const sendEmail = async (subject, text, to, from) => {
	try {
		const auth = {
			auth: {
				api_key: process.env.MAILGUN_API_KEY,
				domain: process.env.MAILGUN_DOMAIN
			}
		}

		const transporter = nodemailer.createTransport(mailGun(auth))

		const mailOptions = {
			from,
			to,
			subject,
			text
		}

		await transporter.sendMail(mailOptions)
	} catch (error) {
		console.log(error)
		throw new Error('Could not send email')
	}
}

module.exports = sendEmail
