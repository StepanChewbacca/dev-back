import { Router } from 'express';

import { imageController, getImageFromSaveLocation } from '../Controllers/imageController';
import { uploadToServer } from '../services/uploadToServer';
import { uploadToS3 } from '../services/s3';

const router = Router();

router
  .post('/uploadToS3', uploadToS3, imageController)
  .post('/uploadToServer', uploadToServer, imageController)
  .get('/download/:id', getImageFromSaveLocation);

export default router;

