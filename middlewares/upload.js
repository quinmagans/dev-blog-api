const path = require('path');

//Middleware for uploading data
const multer = require('multer');

//Storage in the server API/ Take the file and save it the folder called "images"
const storage = multer.diskStorage({
    //destination for files
    destination: (req, file, callback)  => {
        callback(null, "uploads/")
    }, 
    //read file name and extension
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        callback(null, Date.now() + extension)
    }
})

//File Uploading 
const upload = multer({
    storage: storage,
    filFilter: function(req, file, callback) {
        if (
            file.mimeType === 'image/png' ||
            file.mimeType === 'image/jpg'
        ) {
            callback(null, true)
        } else {
            console.log('Only .png .jpg file supported!')
            callback(null, false)
        }
    }, 
    limits: {fileSize: 1024 * 1024 * 3
    }
});

module.exports = upload;