import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
    throw new Error('Invalid Message');
  } else {
    cb(null, false);
  }
};

export const uploadToServer = (req, res, next) => {
  if (req.files) {
    const upload = multer({
      dest: 'uploads/',
      fileFilter,
    }).array('image', 1);

    upload(req, res, (err) => {
      if (err) {
        next({ message: err.message, status: 400 });
      } else {
        next();
      }
    });
  }

  next({ message: 'Plz upload current image', status: 400 });
};
