// Generates 20 digit unique id in numbers(returns string)
const generateNumber = () => {
	const rand = String(Math.floor(10000 + Math.random() * 90000))

	const uniqueId =
		rand + String(Math.floor(Number(new Date()) * (100 + Math.random() * 100)))
	return uniqueId
}

module.exports = generateNumber
