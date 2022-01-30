import { Request } from 'express';

// export interface IRequest extends Request {
//     file: File
// }

export interface IMailer {
    result?: TMailer;
    error?: Error;
}

export type TMailer = {
    data: TImageData,
    status: number
};

// export type TFiles = {
//     fieldname: string,
//     originalname: string,
//     encoding: string,
//     mimetype: string,
//     destination: string,
//     filename: string,
//     path: string,
//     size: number,
// };

export type TImageData = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    size: number,
    bucket: string,
    key: string,
    acl: string,
    contentType: string,
    contentDisposition: string | null,
    contentEncoding: string | null,
    storageClass: string,
    serverSideEncryption: string | null,
    location: string,
    etag: string,
    versionId: string | undefined

};

export interface IError extends Error{
    status: number
}
