
import AuthorizedApiService from './AuthorizedApiService';

class VideoService extends AuthorizedApiService
{
    getAllUnlinkedList(onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'GET',
            'video/allunlinkedlist',
            {},
            (result) => {
                onSuccessHandler(result.data.videos);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    create(urlLink, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'POST',
            'video/create',
            {
                url: urlLink
            },
            (result) => {
                onSuccessHandler(result.data.video);
            },
            (error) => {
                onErrorHandler(error.response.data.error);
            }
        );
    }

    remove(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'DELETE',
            'video/' + id + '/delete',
            {},
            (result) => {
                onSuccessHandler(result.data);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }
}

export default VideoService;