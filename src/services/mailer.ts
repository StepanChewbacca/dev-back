import dotenv from 'dotenv';

import { constants as httpConstants } from 'http2';

import sendGrid from '@sendgrid/mail';
import { IMailer, TImageData } from '../TS/interface';

dotenv.config();
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (file: TImageData): Promise<IMailer> => {
  try {
    const emailMessage = {
      to: 'qweqwe322322322@gmail.com',
      from: 'miha1488plet@gmail.com',
      subject: 'Image Upload',
      text: 'Image Upload',
      html: `url: ${file.location}`,
    };

    await sendGrid.send(emailMessage);

    return { result: { data: file, status: httpConstants.HTTP_STATUS_CREATED } };
  } catch (error) {
    return { error };
  }
};
