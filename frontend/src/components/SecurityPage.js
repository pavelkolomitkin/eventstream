import React from 'react';

import {
    Grid
} from 'material-ui';

const SecurityPage = (props) => {
    return (
        <Grid container className="security-page">
            <Grid item xs={1} sm={1} md={4} lg={4} xl={4} />
            <Grid item xs={10} sm={10} md={4} lg={4} xl={4}>
                { props.children }
            </Grid>
            <Grid item xs={1} sm={1} md={4} lg={4} xl={4} />
        </Grid>

    );
};


export default SecurityPage;