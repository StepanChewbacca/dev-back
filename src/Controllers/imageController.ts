import { NextFunction, Response, Request } from 'express';
import { constants as httpConstants } from 'http2';
import { sendEmail } from '../services/mailer';
import { getImage, setImage } from '../database/repository/imageRepository';
import { getFileStream } from '../services/s3';

export const setImageToS3 = async (req: Request, res: Response, next: NextFunction) => {
  const { files } = req;
  const { result, error } = await sendEmail(files[0]);

  if (error) {
    return next(error);
  }

  const {
    error: dbError,
    result: dbResult,
  } = await setImage(req.body.name, result.data.location, result.data.key);

  if (dbError) {
    return next(dbError);
  }

  res.status(dbResult.status);
  res.send(dbResult.data);
};

export const getImageFromS3 = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
  const imageData = await getImage(id);
  const image = getFileStream(imageData.result.key);

  res.status(httpConstants.HTTP_STATUS_OK);
  image.pipe(res);
};
