import AuthorizedApiService from './AuthorizedApiService';
import upload from './uploader';


class FileUploadService extends AuthorizedApiService
{
    uploadFile = (url, file, fieldName = 'imageFile') => {

        const result = upload(url, file, fieldName);

        const headers = this.getRequestHeaders();
        for (const header in headers)
        {
            result.set(header, headers[header]);
        }

        return result;
    };

    uploadEventPicture = (file) => {
        return this.uploadFile('picture/create', file, 'imageFile').end();
    }
}

export default FileUploadService;