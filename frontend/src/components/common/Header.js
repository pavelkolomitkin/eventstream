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
import { NavLink, Link } from 'react-router-dom';

import AddIcon from 'material-ui-icons/Add';

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

class Header extends Component {

    state = {
        anchorEl: null
    }

    onAvatarClickHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    menuClose = () => {
        this.setState({ anchorEl: null });
    };

    onLogoutClickHandler = (event) => {
        this.menuClose();
        this.props.onLogoutClick(event);
    }

    render () {

        const classes = styles;
        const {loading, userData } = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div className={classes.root}>

                <AppBar position="fixed">
                    {
                        loading && <LinearProgress style={classes.progress}/>
                    }
                    <Toolbar>
                        <IconButton style={classes.menuButton} color="contrast" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit" style={classes.flex}>
                            Event Stream
                        </Typography>
                        {
                            userData
                                ?
                                (
                                    <div>
                                        <Button component={Link} to="/event/new" color="contrast">
                                            <AddIcon/>
                                            Add Event
                                        </Button>

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
                                            onClose={this.menuClose}
                                        >
                                            <MenuItem component={NavLink} to="/me/myevents/all" onClick={this.menuClose}>My Events</MenuItem>
                                            <MenuItem onClick={this.onLogoutClickHandler}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <Button component={NavLink} to="/login" color="contrast">Login</Button>
                                        <Button component={NavLink} to="/register" color="contrast">Register</Button>
                                    </div>
                                )
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