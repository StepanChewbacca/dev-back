import { Response, NextFunction, Request } from 'express';

export const checkImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  //console.log(req.file)
  const { file } = req;

  if (!file || (!file.mimetype.endsWith('image/png') && !file.mimetype.endsWith('image/jpg'))) {
    return next({ message: 'Plz upload current file', status: 400 });
  }

  next();
};
