import * as securityActions from '../../actions/securityActions';
import SessionManager from '../../services/SessionManager';

const sessionListener = (store) => {

    store.subscribe(() => {

        const { token } = store.getState().security;

        if (token)
        {
            SessionManager.keepAuthToken(token);
        }
        else
        {
            SessionManager.logout();
        }

        /*let token = null;
        const {loginUserData, registerResult} = store.getState().security;

        if (loginUserData && loginUserData.token)
        {
            token = loginUserData.token;
        }
        else if (registerResult && registerResult.token)
        {
            token = registerResult.token;
        }

        if (token !== SessionManager.getAuthToken())
        {
            console.log('Store subscribe handler ', SessionManager.getAuthToken(), token);
            if (token)
            {
                SessionManager.keepAuthToken(token);
                store.dispatch(securityActions.userAuthorized(SessionManager.getSessionData()));
            }
            else
            {
                SessionManager.logout();
                store.dispatch(securityActions.userUnAuthorized());
            }
        }*/
    });

}


export default sessionListener;