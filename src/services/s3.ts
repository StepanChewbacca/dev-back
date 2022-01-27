require('dotenv').config()
const fs = require('fs')
const AWS = require('aws-sdk');
import { TFiles } from '../TS/interface'
const bucketName = process.env.BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId =  process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
})

function uploadFile(file: TFiles) {
    try {
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename,
            //ACL:'public-read'
        }
        return s3.upload(uploadParams).promise()
    } catch (e) {
       return e
    }
}
exports.uploadFile = uploadFile
