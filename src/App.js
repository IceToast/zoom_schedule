import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, ThemeProvider, CssBaseline, Container, IconButton, Typography} from '@material-ui/core';
import {Schedule, SignIn} from './components';
import { useSelector } from 'react-redux';
import { theme } from './theme';
import {
  AccountCircle as AccountCircleIcon,
  Brightness7 as DarkIcon,
  Brightness4 as BrightIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2)
  },
  appBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: '1.5em',
    marginLeft: theme.spacing(1),
  },
  userButton: {},
  darkModeIcons: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(3)
  },
  avatarIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4)
  }
}));

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  const themePaletteTypeLocalStorageValue = localStorage.getItem('themePaletteType') || 'light';
  const [themePaletteType, setThemePaletteType] = useState(themePaletteTypeLocalStorageValue);
  const themeInstance = theme({type: themePaletteType});
  
  const classes = useStyles({themePaletteType});

  function handleDarkModeButtonClick(){
    if(themePaletteType === 'dark'){
      localStorage.removeItem('themePaletteType');
      setThemePaletteType('light');
    }else{
      localStorage.setItem('themePaletteType', 'dark');
      setThemePaletteType('dark');
    }
  }

  if (!isLoggedIn) {
    return <SignIn />;
  } else {
    return (
      <ThemeProvider theme={themeInstance}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Container className={classes.appBarContainer}>
            <Typography variant="h4" className={classes.appTitle}>
              Zoom Schedule
            </Typography>
            <div>
            <IconButton onClick={handleDarkModeButtonClick} className={classes.userButton} color="secondary.main" variant="contained">
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
      </ThemeProvider>
    );
  }
};

export default App;
