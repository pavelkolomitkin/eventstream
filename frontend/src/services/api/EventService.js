import AuthorizedApiService from './AuthorizedApiService';

class EventService extends AuthorizedApiService
{
    create = (title, description, timeStart, timeEnd, tags, onSuccessHandler, onErrorHandler) => {
        this.makeRequest(
            'POST',
            'event',
            {
                title, description, timeStart, timeEnd, tags
            },
            (response) => {

                //debugger;

                onSuccessHandler(response.data);
            },
            (error) => {

                //debugger;
                const errors = {};

                const fields = ['title', 'description', 'timeStart', 'timeEnd', 'tags'];
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
}

export default EventService;