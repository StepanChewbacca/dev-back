import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { NextFunction, Request } from 'express';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Config = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const fileFilter = (req: Request, file, cb: CallableFunction) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb({ message: 'Plz download correct image', status: 400 });
  }
};

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: bucketName,
  key(req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

export const uploadToS3 = (req: Request, res, next: NextFunction) => {
  const upload = multer({
    storage: multerS3Config,
    fileFilter,
  }).array('image', 1);

  if (!req.file) {
    return next({ message: 'Upload current image', status: 400 });
  }

  upload(req, res, (err) => {
    if (err) {
      next({ message: err.message, status: 400 });
    } else {
      next();
    }
  });
};

export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3Config.getObject(downloadParams).createReadStream();
};
