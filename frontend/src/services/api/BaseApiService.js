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

    getDateObject(timeStampFieldValue)
    {
        return new Date(timeStampFieldValue * 1000);
    }

    transformObjectTimestampFieldsToDate(target, fields)
    {
        for (const field of fields)
        {
            target[field] = this.getDateObject(target[field]);
        }
    }
}

export default BaseApiService;