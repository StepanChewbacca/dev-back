import { Router } from 'express';

import { setImageToS3, getImageFromS3 } from '../Controllers/imageController';
//import { checkImage } from '../middlewares/image';

import { uploadToS3 } from '../services/s3';

const router = Router();

router
  .post('/', uploadToS3, setImageToS3)
  .get('/:id', getImageFromS3);

export default router;
