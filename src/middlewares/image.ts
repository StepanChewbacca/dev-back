import {Request, Response, NextFunction} from "express";
import {IRequest, TFiles} from "../TS/interface";

const checkImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file: TFiles = (<IRequest>req).file
        const mimetype: string = file.mimetype
        if (!file || (!mimetype.endsWith('image/png') && !mimetype.endsWith('image/jpg')))
            throw new Error('Plz upload current file');
        next()
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkImage
}
