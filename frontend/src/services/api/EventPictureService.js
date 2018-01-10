import AuthorizedApiService from './AuthorizedApiService';

class EventPictureService extends AuthorizedApiService
{
    getAllUnlinkedList(onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'GET',
            'picture/allunlinkedlist ',
            {},
            (result) => {
                onSuccessHandler(result.data.pictures);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
            );
    }

    remove(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'DELETE',
            'picture/' + id + '/delete',
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

export default EventPictureService;