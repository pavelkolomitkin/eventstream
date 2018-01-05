import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid
} from 'material-ui';

const CommonPage = (props) => {
    return (
        <Grid container className="common-page">
            <Grid item xs={1} sm={1} md={3} lg={3} xl={3} />
            <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                { props.children }
            </Grid>
            <Grid item xs={1} sm={1} md={3} lg={3} xl={3} />
        </Grid>

    );
};

CommonPage.propTypes = {};

export default CommonPage;