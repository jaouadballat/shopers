'use strict';

const multer = require('multer');
const path = require('path');

//get the storage.
const storage = multer.diskStorage({
	destination: './public/images',
	filename: (req, file, callback) => {
		callback(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`);
	}
});

//check file type
const checkFileType = (file, callback) => {
	const file_types = /jpeg|jpg|png|gif/;
	const ext_name = file_types.test(path.extname(file.originalname).toLowerCase());
	const mime_type = file_types.test(file.mimetype);

	if (mime_type && ext_name) return callback(null, true);
	else callback('You can upload images only!');
};

//then init the upload
const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000},
	fileFilter: (req, file, callback) => {
		checkFileType(file, callback);
	}
}).single('file');

module.exports = upload;