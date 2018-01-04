import * as types from './types';

export function serverRequest()
{
    return {type: types.SERVER_REQUEST};
}

export function serverResponse()
{
    return {type: types.SERVER_RESPONSE};
}