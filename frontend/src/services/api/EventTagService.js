
import AuthorizedApiService from './AuthorizedApiService';

class EventTagService extends AuthorizedApiService
{
    search(title, successCallback, errorCallback) {
        this.makeRequest(
            'GET',
            'tag/list?' + this.buildQueryString({title}),
            {},
            (response) => {
                successCallback(response.data);
            },
            (error) => {
                errorCallback(error);
            }
        )
    }
}

export default EventTagService;