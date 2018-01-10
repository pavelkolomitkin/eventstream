import SessionManager from './SessionManager';
import FileUploadService from './api/FileUploadService';
import EventPictureService from './api/EventPictureService';


class ApiServiceFactory {

    static createAuthService = (classConstructor) => {
        return new classConstructor(SessionManager.getAuthToken());
    }

    static createFileUploader = () => {
        return ApiServiceFactory.createAuthService(FileUploadService);
    }

    static createEventPictureService = () => {
        return ApiServiceFactory.createAuthService(EventPictureService);
    }

}

export default ApiServiceFactory;