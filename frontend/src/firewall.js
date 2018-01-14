import SessionManager from './services/SessionManager';

const firewall = (history, config) => {

    const checkLocation = (location, firewallConfig) => {

        const isAuthorized = SessionManager.isTokenValid();

        if (!isAuthorized && firewallConfig.anonymous.indexOf(location.pathname) === -1)
        {
            history.replace(firewallConfig.login);
        }
        else if (firewallConfig.redirects[location.pathname])
        {
            history.replace(firewallConfig.redirects[location.pathname]);
        }
    };

    history.listen((location, action) => {
        checkLocation(location, config);
    });

    checkLocation(history.location, config);
};

export default firewall;