import { constants as httpConstants } from 'http2';
import { pgClient } from '../database';

export const setImage = async (name: string, url: string, key: string) => {
  try {
    const images = await pgClient.query(
      `INSERT INTO images
                            (name, url, key)
                            VALUES('${name}', '${url}', '${key}') RETURNING *`,
    );

    return { result: { data: images.rows, status: httpConstants.HTTP_STATUS_CREATED } };
  } catch (error) {
    return { error: { message: error.message, status: httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR } };
  }
};

export const getImage = async (id: string) => {
  try {
    const image = await pgClient.query(
      `SELECT * FROM images
                      WHERE id = ${id}`,
    );

    return { result: image.rows[0] };
  } catch (error) {
    return { error };
  }
};
