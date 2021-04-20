import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Container, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { UAParser } from 'ua-parser-js';
import { Schedule, SignIn } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeState } from './actions/actions.setThemeState';
import { fetchMeetings } from './actions/actions.meeting';
import { setLoginState, getUserData, getUserAgent } from './actions/actions.user';
import {
  AccountCircle as AccountCircleIcon,
  Brightness7 as DarkIcon,
  Brightness4 as BrightIcon,
  SystemUpdateAlt as SystemUpdateAltIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import { useReactPWAInstall } from 'react-pwa-install';
import Settings from './components/Settings';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(6),
  },
  appBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: '1.5em',
    marginLeft: theme.spacing(1),
  },
  userButton: {},
  darkModeIcons: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(3),
  },
  installIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(3),
  },
  avatarIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4),
  },
  logoutButton: {
    color: theme.palette.error.main,
  },
}));

const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const themePaletteType = useSelector(state => state.theme.paletteType);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const userData = useSelector(state => state.user.userData);

  const classes = useStyles({ themePaletteType });
  const dispatch = useDispatch();
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: 'Install Zoom Schedule as App',
      icon: '/images/android-chrome-192x192.png',
      features: (
        <ul>
          <li>Add meetings</li>
          <li>Edit meetings</li>
          <li>Delete meetings</li>
        </ul>
      ),
      description: 'Save your meetings at one place - Access them from everywhere',
    }).then(() => alert('App installed successfully or instructions for install shown'));
  };

  useEffect(() => {
    dispatch(fetchMeetings()).then(({ error }) => {
      const errResStatus = error?.response?.status;
      const errorMessage = error?.response?.data;

      if (
        errResStatus === 500 ||
        (errResStatus === 403 &&
          errorMessage === 'invalid Cookie or session expired' &&
          process.env.NODE_ENV !== 'development')
      ) {
        dispatch(setLoginState(false));
      } else {
        dispatch(setLoginState(true));
      }
    });

    dispatch(getUserData());

    let userAgent = new UAParser();
    dispatch(getUserAgent(userAgent.getResult()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDarkModeButtonClick = () => {
    if (themePaletteType === 'dark') {
      localStorage.setItem('themePaletteType', 'light');
      dispatch(setThemeState('light'));
    } else {
      localStorage.setItem('themePaletteType', 'dark');
      dispatch(setThemeState('dark'));
    }
  };

  const openUserDropdownMenu = e => setDropdownAnchorEl(e.currentTarget);

  const closeUserDropdownMenu = () => setDropdownAnchorEl(null);

  const pushToPathname = pathname => (window.location.pathname = pathname);

  if (!isLoggedIn) {
    return <SignIn />;
  } else {
    return (
      <>
        <AppBar position="sticky" className={classes.appBar}>
          <Container className={classes.appBarContainer}>
            <Typography variant="h4" className={classes.appTitle}>
              Zoom Schedule
            </Typography>
            <div>
              {supported() && !isInstalled() && (
                <IconButton onClick={handleClick} className={classes.userButton} color="secondary.main" variant="contained">
                  <SystemUpdateAltIcon className={classes.installIcon} />
                </IconButton>
              )}
              <IconButton
                onClick={() => setIsSettingsDialogOpen(true)}
                className={classes.userButton}
                color="secondary.main"
                variant="contained">
                <SettingsIcon className={classes.darkModeIcons} />
              </IconButton>
              <Settings open={isSettingsDialogOpen} onClose={() => setIsSettingsDialogOpen(false)} />
              <IconButton
                onClick={handleDarkModeButtonClick}
                className={classes.userButton}
                color="secondary.main"
                variant="contained">
                {themePaletteType === 'dark' ? (
                  <DarkIcon className={classes.darkModeIcons} />
                ) : (
                  <BrightIcon className={classes.darkModeIcons} />
                )}
              </IconButton>
              {userData ? (
                <>
                  <IconButton
                    className={classes.userButton}
                    onClick={openUserDropdownMenu}
                    color="secondary.main"
                    variant="contained">
                    <Avatar className={classes.avatarIcon} alt={userData.username} src={userData.avatarurl} />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={dropdownAnchorEl}
                    keepMounted
                    open={Boolean(dropdownAnchorEl)}
                    onClose={closeUserDropdownMenu}>
                    <MenuItem disabled>{userData.username}</MenuItem>
                    <MenuItem onClick={() => pushToPathname('/api/user/logout')} className={classes.logoutButton}>
                      Logout
                    </MenuItem>
                    <MenuItem
                      disabled
                      onClick={() => pushToPathname('/api/user/logoutall')}
                      className={classes.logoutButton}>
                      Logout from all devices
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton className={classes.userButton} color="secondary.main" variant="contained" disabled>
                  <AccountCircleIcon className={classes.avatarIcon} />
                </IconButton>
              )}
            </div>
          </Container>
        </AppBar>
        <Schedule />
      </>
    );
  }
};

export default App;
