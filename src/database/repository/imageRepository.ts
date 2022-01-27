const pgClient = require('../database');

const setImage = async (name: string, url: string) => {
    try {

        const images = await pgClient.query(
            `INSERT INTO images
                            ("name", url)
                            VALUES('${name}', '${url}');
`);

        return { result: images.rows };
    } catch (error) {
        return { error };
    }
};

module.exports = { setImage };
