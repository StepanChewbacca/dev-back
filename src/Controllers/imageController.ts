import {NextFunction, Request, Response} from "express";
const  { IRequest } = require ('../TS/interface')
const mailer = require('../services/mailer');
const imageRepository = require('../database/repository/imageRepository')
const { uploadFile } = require('../services/s3')


export const imageController = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const file = (<typeof IRequest>req).file;
        const imageData = await uploadFile(file);
        const { result, error } = await mailer.sendEmail(imageData);
        if (error) {
            throw new Error(error)
        }
        const { error: dbError } = await imageRepository.setImage(req.body.name, result.data.Location);
        if (dbError) {
            throw new Error(dbError)
        }
        res.status(result.status)
        res.send(result.data);
    } catch (e) {
        next(e);
    }

};

module.exports = {
    imageController
}
