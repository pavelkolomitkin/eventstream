import AuthorizedApiService from './AuthorizedApiService';

class EventService extends AuthorizedApiService
{
    static eventFields = [
        'title',
        'description',
        'timeStart',
        'timeEnd',
        'tags',
        'pictures',
        'videos'
    ];

    static eventDatetimeFields = ['timeStart', 'timeEnd'];

    create = (title, description, timeStart, timeEnd, tags, pictures, videos, onSuccessHandler, onErrorHandler) => {
        this.makeRequest(
            'POST',
            'event',
            {
                title, description, timeStart, timeEnd, tags, pictures, videos
            },
            (result) => {
                const { event } = result.data;
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                const errors = this.getErrorFromResponse(error, EventService.eventFields);
                onErrorHandler(errors);
            }
        )
    }

    update(event, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'PUT',
            'event/' + event.id,
            event,
            (result) => {
                const { event } = result.data;
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                const errors = this.getErrorFromResponse(error, EventService.eventFields);
                onErrorHandler(errors);
            }
        );
    }

    getOwnList(timeFilter, page, onSuccessHandler, onErrorHandler)
    {
        const url = 'event/ownlist/' + timeFilter + '?page=' + page;

        this.makeRequest(
            'GET',
            url,
            {},
            (result) => {

                const { events, total } = result.data;
                events.forEach((event) => {
                    this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);
                });

                onSuccessHandler(events, total, page);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    get(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'GET',
            'event/' + id,
            {},
            (result) => {
                const { event } = result.data;
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    getOwn(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'GET',
            'event/own/' + id,
            {},
            (result) => {
                const { event } = result.data;
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }
}

export default EventService;