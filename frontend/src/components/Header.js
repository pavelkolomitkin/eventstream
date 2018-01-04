import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';

import AccountCircle from 'material-ui-icons/AccountCircle';


const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    progress: {
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0
    }
};

//const Header = ({classes, loading, userData}) => {
class Header extends Component {

    state = {
        anchorEl: null
    }

    onAvatarClickHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render () {

        const classes = styles;
        const {loading, userData, onLogoutClick } = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div className={classes.root}>

                <AppBar position="fixed">
                    {
                        loading && <LinearProgress className={classes.progress}/>
                    }
                    <Toolbar>
                        <IconButton style={classes.menuButton} color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" style={classes.flex}>
                            Event Stream
                        </Typography>
                        {
                            userData !== null
                                ?
                                (
                                    <div>
                                        <IconButton
                                            aria-owns={open ? 'menu-appbar' : null}
                                            aria-haspopup="true"
                                            onClick={this.onAvatarClickHandler}
                                            color="contrast"
                                        >
                                            <AccountCircle/>
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={this.state.anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={open}
                                            onClose={this.handleClose}
                                        >
                                            {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                                            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                )
                                : <Button color="contrast">Login</Button>
                        }

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    userData: PropTypes.object,
    onLogoutClick: PropTypes.func.isRequired
};


export default Header;