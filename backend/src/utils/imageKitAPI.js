// const ImageKit = require('imagekit')

// const imagekit = new ImageKit({
// 	publicKey: process.env.IMAGEKIT_PUBLICKEY,
// 	privateKey: process.env.IMAGEKIT_PRIVATEKEY,
// 	urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
// })

// exports.uploadFiles = async (files) => {
// 	const uploadedImagesUrl = []
// 	try {
// 		for (var i = 0; i < files.length; i++) {
// 			var file = files[i]
// 			var filename = Date.now() + '-' + file.originalname
// 			try {
// 				const response = await imagekit.upload({
// 					file: file.buffer,
// 					fileName: filename,
// 					folder: 'product_images'
// 				})
// 				if (response) {
// 					uploadedImagesUrl.push(response.url)
// 				}
// 			} catch {
// 				return []
// 			}
// 		}
// 	} catch {
// 		console.log('Error Occured')
// 	}
// 	return uploadedImagesUrl
// }

// exports.deleteFiles = async (imageUrls) => {
// 	try {
// 		for (var i = 0; i < imageUrls.length; i++) {
// 			var filename = imageUrls[i].split('/')[5]
// 			var fileInfo = await imagekit.listFiles({
// 				searchQuery: `name="${filename}"`
// 			})
// 			var response = await imagekit.deleteFile(fileInfo[0].fileId)
// 		}
// 	} catch {
// 		console.log('Error')
// 	}
// }
