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

    getList(timeFilter, page, onSuccessHandler, onErrorHandler)
    {
        const url = 'event/list/' + timeFilter + '?page=' + page;

        this.makeRequest(
            'GET',
            url,
            {},
            (result) => {

                let { events, total } = result.data;
                events = events.map((event) => {
                    event = this.mergeWithExtrafields(event, 'eventObject');
                    this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);
                    return event;
                });

                onSuccessHandler(events, total, page);
            },
            (error) => {
                onErrorHandler(error.response.data);
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

                let { events, total } = result.data;
                events = events.map((event) => {
                    event = this.mergeWithExtrafields(event, 'eventObject');
                    this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                    return event;
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
                let { event } = result.data;

                event = this.mergeWithExtrafields(event, 'eventObject');
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
                let { event } = result.data;

                event = this.mergeWithExtrafields(event, 'eventObject');
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    addMeMember(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'POST',
            'event/' + id + '/addmember',
            {},
            (result) => {
                let { event } = result.data;

                event = this.mergeWithExtrafields(event, 'eventObject');
                this.transformObjectTimestampFieldsToDate(event, EventService.eventDatetimeFields);

                onSuccessHandler(event);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }

    removeMeMember(id, onSuccessHandler, onErrorHandler)
    {
        this.makeRequest(
            'POST',
            'event/' + id + '/removemember',
            {},
            (result) => {
                let { event } = result.data;

                event = this.mergeWithExtrafields(event, 'eventObject');
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