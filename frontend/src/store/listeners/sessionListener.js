import * as securityActions from '../../actions/securityActions';
import SessionManager from '../../services/SessionManager';

const sessionListener = (store) => {

    store.subscribe(() => {

        let token = null;
        const {loginUserData, registerResult} = store.getState().security;

        if (loginUserData && loginUserData.token)
        {
            token = loginUserData.token;
            //SessionManager.keepAuthToken(loginUserData.token);
        }
        else if (registerResult && registerResult.token)
        {
            token = registerResult.token;
            //SessionManager.keepAuthToken(registerResult.token);
        }

        if (token !== SessionManager.getAuthToken())
        {
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
        }
    });

}


export default sessionListener;