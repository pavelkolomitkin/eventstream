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

        // return uploader.post('http://127.0.0.1:8000/api/picture/create')
        //     .attach('imageFile', file)
        //     .set('Accept', 'application/json')
        //     .set('Authorization', 'Bearer ' + this.getAuthToken());
            // .on('progress', event => {
            //     console.log(event);
            //     /* the event is:
            //     {
            //       direction: "upload" or "download"
            //       percent: 0 to 100 // may be missing if file size is unknown
            //       total: // total file size, may be missing
            //       loaded: // bytes downloaded or uploaded so far
            //     } */
            // })
            // .end((error, result) => {
            //     if (error)
            //     {
            //         console.log('Error uploading file', error);
            //     }
            //     else
            //     {
            //         console.log('File uploaded!', result);
            //     }
            // });
    };

    uploadEventPicture = (file) => {
        return this.uploadFile('picture/create', file, 'imageFile').end();
    }
}

export default FileUploadService;