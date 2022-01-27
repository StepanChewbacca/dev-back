const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { imageController } = require ('../Controllers/imageController')
const { checkImage }  = require('../middlewares/image')

const router = express.Router();

router.post('/',  upload.single('image'), checkImage, imageController);

export default router;
