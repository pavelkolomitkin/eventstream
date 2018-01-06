import axios from './axios';


class BaseApiService
{
    makeRequest(method, url, data, successCallback, errorCallback)
    {
        axios({
            method: method,
            url: url,
            headers: this.getRequestHeaders(),
            data: data,
        }).then((response) => {
            successCallback(response);
        }).catch((error) => {
            errorCallback(error);
        });
    }

    getRequestHeaders()
    {
        return {};
    }

    buildQueryString(params)
    {
        const queryComponents = [];
        for (const param in params)
        {
            queryComponents.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
        }

        return queryComponents.join('&');
    }
}

export default BaseApiService;