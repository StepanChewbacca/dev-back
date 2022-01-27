require('dotenv').config();
const httpConstants = require('http2').constants;
import {TImageData} from '../TS/interface'
const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmail = async (result: TImageData) => {
    try {
        const emailMessage = {
            to: 'qweqwe322322322@gmail.com',
            from: 'miha1488plet@gmail.com',
            subject: 'Image Upload',
            text: `Image Upload`,
            html: `url: ${result.Location}`
        }
        await sendGrid.send(emailMessage);
        return { result: { data: result, status: httpConstants.HTTP_STATUS_CREATED } };
    } catch (error) {
        return { error };
    }
}

module.exports = {
    sendEmail
}
