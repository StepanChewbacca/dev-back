import multer from 'multer';
import { NextFunction, Response, Request } from 'express';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb({ message: 'Upload current image', status: 400 });
  }
};

export const uploadToServer = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({
    fileFilter,
    dest: 'uploads/',
  }).array('image', 1);

  upload(req, res, (err) => {
    if (err) {
      next({ message: err.message, status: 400 });
    } else {
      next();
    }
  });
};
