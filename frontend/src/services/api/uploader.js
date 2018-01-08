import superagent from 'superagent';

const baseUrl = process.env.API_BASE_URL;

const uploader = (url, file, fileFieldName = 'imageFile') => {
    return superagent.post(baseUrl + url)
        .attach(fileFieldName, file)
        .set('Accept', 'application/json');
};

export default uploader;