import AuthorizedApiService from './AuthorizedApiService';

class EventService extends AuthorizedApiService
{
    create = (title, description, timeStart, timeEnd, tags, pictures, videos, onSuccessHandler, onErrorHandler) => {
        this.makeRequest(
            'POST',
            'event',
            {
                title, description, timeStart, timeEnd, tags, pictures, videos
            },
            (response) => {
                debugger;
                this.transformObjectTimestampFieldsToDate(response.data, ['timeStart', 'timeEnd']);
                onSuccessHandler(response.data);
            },
            (error) => {

                //debugger;
                const errors = {};

                const fields = ['title', 'description', 'timeStart', 'timeEnd', 'tags', 'pictures', 'videos'];
                const fieldErrors = error.response.data.errors;

                fields.forEach((field) => {
                    if (fieldErrors[field] && (fieldErrors[field].length > 0))
                    {
                        errors[field] = fieldErrors[field][0];
                    }
                });


                onErrorHandler(errors);
            }
        )
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
                    this.transformObjectTimestampFieldsToDate(event, ['timeStart', 'timeEnd']);
                });

                onSuccessHandler(events, total, page);
            },
            (error) => {
                onErrorHandler(error.response.data);
            }
        );
    }
}

export default EventService;