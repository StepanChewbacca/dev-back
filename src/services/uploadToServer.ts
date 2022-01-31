import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadToServer = (req, res, next) => {
  const upload = multer({
    dest: 'uploads/',
    fileFilter,
  }).array('image', 1);

  console.log(req);
  upload(req, res, (err) => {
    if (err) {
      next({ message: err.message, status: 400 });
    } else {
      next();
    }
  });
};
