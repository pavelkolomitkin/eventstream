import BaseApiService from './BaseApiService';

class SecurityService extends BaseApiService
{
    login(username, password, successCallback, errorCallback)
    {
        //console.log('Make request to login!');
        this.makeRequest(
            'POST',
            'login',
            {
                username: username,
                password: password
            },
            (response) => {
                successCallback(response.data);
            },
            (error) => {
                errorCallback(error.response.data.message);
            }
        );
    }

    register(username, email, password, passwordRepeat, successCallback, errorCallback)
    {
        this.makeRequest(
            'POST',
            'register',
            {
                email: email,
                username: username,
                plainPassword: {
                    first: password,
                    second: passwordRepeat
                }
            },
            (response) => {
                successCallback(response.data);
            },
            (error) => {

                const errors = {};

                let responseErrors = error.response.data.errors.children;
                if (responseErrors.email &&
                    responseErrors.email.errors &&
                    responseErrors.email.errors.length > 0)
                {
                    errors.email = responseErrors.email.errors[0];
                }

                if (responseErrors.plainPassword &&
                    responseErrors.plainPassword.children.first.errors &&
                    responseErrors.plainPassword.children.first.errors.length > 0)
                {
                    errors.password = responseErrors.plainPassword.children.first.errors[0];
                }

                if (responseErrors.plainPassword &&
                    responseErrors.plainPassword.children.second.errors &&
                    responseErrors.plainPassword.children.second.errors.length > 0)
                {
                    errors.passwordRepeat = responseErrors.plainPassword.children.second.errors[0];
                }

                if (responseErrors.username &&
                    responseErrors.username.errors &&
                    responseErrors.username.errors.length > 0)
                {
                    errors.username = responseErrors.username.errors[0];
                }

                errorCallback(errors)
            }

        );
    }
}

export default SecurityService;