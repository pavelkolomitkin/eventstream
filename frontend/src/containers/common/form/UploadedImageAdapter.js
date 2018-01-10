import ApiServiceFactory from '../../../services/ApiServiceFactory';


class UploadedImageAdapter
{
    static EVENT_UPLOAD_PROGRESS = 'progress';

    static EVENT_UPLOAD_RESULT = 'upload_result';

    static EVENT_UPLOAD_ERROR = 'upload_error';

    picture = null;

    worker = null;

    uploadingFile = null;

    eventCallbacks = {};

    static createFromUploadedImage(picture)
    {
        const result = new UploadedImageAdapter();

        result.setPicture(picture);

        return result;
    }

    static createUploadWorker(file)
    {
        const result = new UploadedImageAdapter();
        const worker = ApiServiceFactory.createFileUploader().uploadEventPicture(file);

        result
            .setUploadingFile(file)
            .setWorker(worker);

        return result;
    }

    clearEvents()
    {
        this.eventCallbacks = {};

        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_PROGRESS] = [];
        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_ERROR] = [];
        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_RESULT] = [];
    }

    getId()
    {
        return !this.isReady() ? this.uploadingFile.name : this.picture.id;
    }

    setUploadingFile(file)
    {
        this.uploadingFile = file;
        return this;
    }

    getThumbs()
    {
        return this.picture.thumbs ? this.picture.thumbs : null;
    }

    isReady()
    {
        return (this.picture !== null);
    }

    setPicture(picture)
    {
        this.picture = picture;
        return this;
    }

    setWorker(worker)
    {
        this.clearEvents();

        this.worker = worker;

        this
            .worker
            .on('progress', (event) => {
                for(const callback of this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_PROGRESS])
                {
                    callback(event);
                }
            })
            .on('error', (error) => {
                for(const callback of this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_ERROR])
                {
                    callback(error);
                }
            });
        this.worker.end((error, result) => {
            if (!error)
            {
                this.setPicture(result.body.picture);

                for(const callback of this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_RESULT])
                {
                    callback(result);
                }
            }
        });
        return this;
    }

    onUploadingProgress(callback)
    {
        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_PROGRESS].push(callback);
        return this;
    }

    onUploadingComplete(callback)
    {
        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_RESULT].push(callback);
        return this;
    }

    onUploadingError(callback)
    {
        this.eventCallbacks[UploadedImageAdapter.EVENT_UPLOAD_ERROR].push(callback);
        return this;
    }
}

export default UploadedImageAdapter;