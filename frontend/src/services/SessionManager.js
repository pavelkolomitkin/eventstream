import JWT from 'jwt-client';

const SessionManager = class {
    static getAuthToken()
    {
        return JWT.get();
    }

    static isTokenValid()
    {
        return JWT.validate(JWT.get());
    }

    static getSessionData()
    {
        let result = null;

        let data = JWT.remember();
        if (data)
        {
            result = data.claim;
        }

        return result;
    }

    static keepAuthToken(token)
    {
        if (JWT.validate(token))
        {
            JWT.keep(token);
        }
        else
        {
            this.logout();
        }
    }

    static logout()
    {
        let isSessionChanged = this.isTokenValid();

        JWT.forget();

        return isSessionChanged;
    }
};


export default SessionManager;