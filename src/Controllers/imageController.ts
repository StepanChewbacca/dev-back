import { NextFunction, Response, Request } from 'express';
import { constants as httpConstants } from 'http2';
import { sendEmail } from '../services/mailer';
import { getImage, setImage } from '../database/repository/imageRepository';

import { Adapter } from '../Class/Adapter';
import { ImageFromServer } from '../Class/imageFromServer';
import { ImageFromS3 } from '../Class/S3';

export const imageController = async (req: Request, res: Response, next: NextFunction) => {
  let saveType;
  const { files } = req;
  const { result, error } = await sendEmail(files[0]);

  if (error) {
    return next(error);
  }

  if (result.data.location) {
    saveType = 's3';
  } else if (result.data.path) {
    saveType = 'server';
  }

  const {
    error: dbError,
    result: dbResult,
  } = await setImage(req.body.name, result.data.location
      || result.data.path, result.data.key
      || result.data.filename, saveType);

  if (dbError) {
    return next(dbError);
  }

  res.status(dbResult.status);
  res.send(dbResult.data);
};

export const getImageFromSaveLocation = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { result } = await getImage(id);
  let saveType;

  switch (result.save_type) {
    case 'server': {
      saveType = new ImageFromServer(result.key);

      break;
    }

    case 's3': {
      saveType = new ImageFromS3(result.key);

      break;
    }

    default: {
      res.send('Error');
    }
  }

  const getFileClass = new Adapter(saveType);

  const image = getFileClass.getTargetFile();

  res.status(httpConstants.HTTP_STATUS_OK);
  image.pipe(res);
};
