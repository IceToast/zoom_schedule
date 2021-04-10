import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, IconButton, Typography } from '@material-ui/core';
import { Schedule, SignIn } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeState } from './actions/actions.setThemeState';
import { fetchMeetings } from './actions/actions.meeting';
import { setLoginState } from './actions/actions.setLoginState';
import { AccountCircle as AccountCircleIcon, Brightness7 as DarkIcon, Brightness4 as BrightIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
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
  avatarIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4),
  },
}));

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const themePaletteType = useSelector(state => state.theme.paletteType);
  const classes = useStyles({ themePaletteType });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeetings()).then(({ error }) => {
      const errResStatus = error?.response?.status;
      const errorMessage = error?.response?.data;

      if (
        errResStatus === 403 ||
        errResStatus === 500 ||
        errorMessage === 'invalid Cookie or session expired' ||
        process.env.NODE_ENV !== 'development'
      ) {
        dispatch(setLoginState(false));
      } else {
        dispatch(setLoginState(true));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDarkModeButtonClick() {
    if (themePaletteType === 'dark') {
      localStorage.removeItem('themePaletteType');
      dispatch(setThemeState('light'));
    } else {
      localStorage.setItem('themePaletteType', 'dark');
      dispatch(setThemeState('dark'));
    }
  }

  if (!isLoggedIn) {
    return <SignIn />;
  } else {
    return (
      <>
        <AppBar position="static" className={classes.appBar}>
          <Container className={classes.appBarContainer}>
            <Typography variant="h4" className={classes.appTitle}>
              Zoom Schedule
            </Typography>
            <div>
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
              <IconButton className={classes.userButton} color="secondary.main" variant="contained">
                <AccountCircleIcon className={classes.avatarIcon} />
              </IconButton>
            </div>
          </Container>
        </AppBar>
        <Schedule />
      </>
    );
  }
};

export default App;
