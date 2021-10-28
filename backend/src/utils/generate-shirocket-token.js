const axios = require('axios')

module.exports.getToken = async () => {
	try {
		const { data } = await axios.post(
			'https://apiv2.shiprocket.in/v1/external/auth/login',
			{
				email: process.env.SHIPROCKET_EMAIL,
				password: process.env.SHIPROCKET_PASSWORD
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		const bearerToken = 'Bearer ' + data.token

		return bearerToken
	} catch (error) {
		throw new Error('Could not authenticate shiprocket user')
	}
}
