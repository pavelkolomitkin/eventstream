import SessionManager from './SessionManager';
import FileUploadService from './api/FileUploadService';


class ApiServiceFactory {

    static createAuthService = (classConstructor) => {
        return new classConstructor(SessionManager.getAuthToken());
    }

    static createFileUploader = () => {
        return ApiServiceFactory.createAuthService(FileUploadService);
    }

}

export default ApiServiceFactory;