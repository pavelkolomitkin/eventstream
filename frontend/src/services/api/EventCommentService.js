import AuthorizedApiService from './AuthorizedApiService';

class EventCommentService extends AuthorizedApiService
{
    static dateFields = ['createdAt', 'updatedAt'];

    static editableFields = ['text'];

    getEventComments(eventId, page, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'GET',
            'comment/list/' + eventId + '?page=' + page,
            {},
            (response) => {
                onSuccessHandler(response.data.events);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    create(text, eventId, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'POST',
            'comment/create/' + eventId,
            {
                text
            },
            (result) => {
                const { comment } = result.data;
                this.transformObjectTimestampFieldsToDate(comment, EventCommentService.dateFields);

                onSuccessHandler(comment);
            },
            (error) => {
                const errors = this.getErrorFromResponse(error, EventCommentService.editableFields);
                onErrorHandler(errors);
            }
        );
    }

    update(comment, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'PUT',
            'comment/' + comment.id + '/edit',
            comment,
            (result) => {
                const { comment } = result.data;
                this.transformObjectTimestampFieldsToDate(comment, EventCommentService.dateFields);

                onSuccessHandler(comment);
            },
            (error) => {
                const errors = this.getErrorFromResponse(error, EventCommentService.editableFields);
                onErrorHandler(errors);
            }
        );
    }

    remove(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'DELETE',
            'comment/' + id + '/delete',
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

export default EventCommentService;