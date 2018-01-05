import AuthorizedApiService from './AuthorizedApiService';

class EventService extends AuthorizedApiService
{
    create = (title, description, timeStart, timeEnd, onSuccessHandler, onErrorHandler) => {
        this.makeRequest(
            'POST',
            'event',
            {
                title, description, timeStart, timeEnd
            },
            (response) => {

                //debugger;

                onSuccessHandler(response.data);
            },
            (error) => {

                //debugger;
                const errors = {};

                const fields = ['title', 'description', 'timeStart', 'timeEnd'];
                const fieldErrors = error.response.data.errors.children;

                fields.forEach((field) => {
                    if (fieldErrors[field].errors && (fieldErrors[field].errors.length > 0))
                    {
                        errors[field] = fieldErrors[field].errors[0];
                    }
                });


                onErrorHandler(errors);
            }
        )
    }
}

export default EventService;