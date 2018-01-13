import SessionManager from './SessionManager';
import FileUploadService from './api/FileUploadService';
import EventPictureService from './api/EventPictureService';
import EventService from './api/EventService';
import VideoService from './api/VideoService';
import EventCommentService from './api/EventCommentService';


class ApiServiceFactory {

    static createAuthService = (classConstructor) => {
        return new classConstructor(SessionManager.getAuthToken());
    }

    static createEventService = () => {
        return ApiServiceFactory.createAuthService(EventService);
    }

    static createFileUploader = () => {
        return ApiServiceFactory.createAuthService(FileUploadService);
    }

    static createEventPictureService = () => {
        return ApiServiceFactory.createAuthService(EventPictureService);
    }

    static createVideoService = () => {
        return ApiServiceFactory.createAuthService(VideoService);
    }

    static createCommentService = () => {
        return ApiServiceFactory.createAuthService(EventCommentService);
    }

}

export default ApiServiceFactory;