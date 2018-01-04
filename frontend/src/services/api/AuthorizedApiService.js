import BaseApiService from './BaseApiService';

class AuthorizedApiService extends BaseApiService
{
    constructor(authToken)
    {
        super();

        this.authToken = authToken;
    }

    getAuthToken()
    {
        return this.authToken;
    }

    getRequestHeaders()
    {
        let result = super.getRequestHeaders();

        result['Authorization'] = 'Bearer ' + this.getAuthToken();

        return result;
    }
}

export default AuthorizedApiService;