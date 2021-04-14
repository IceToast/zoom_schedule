import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { purple, blue } from '@material-ui/core/colors';

const mainColor = '#ffffff';

export const getColorPalette = (color, type) => ({
  type,
  primary: {
    main: blue[500],
  },
  secondary: {
    main: purple[400],
  },
  background: {
    default: type === 'dark' ? '#303030' : '#fff',
  },
});

const theme = config => {
  const colorPalette = getColorPalette(mainColor, config.type);
  return responsiveFontSizes(
    createMuiTheme({
      palette: colorPalette,
      overrides: {
        MuiCssBaseline: {
          // Set body background color to primary color -> to fix iOS PWA Statusbar color
          // Override root element background color to default background color of theme type
          '@global': {
            body: {
              backgroundColor: blue[500],
              '& #root': {
                backgroundColor: colorPalette.type === 'dark' ? '#303030' : '#fff',
              },
            },
          },
        },
      },
      props: {
        MuiPaper: { elevation: 1 },
      },
      typography: {
        useNextVariants: true,
        h1: {
          fontSize: '5rem',
          fontWeight: 'bold',
        },
        h2: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
        h3: {
          fontSize: '1.3rem',
          fontWeight: 'bold',
        },
        subtitle2: {
          fontSize: '0.875em',
        },
        caption: {
          fontSize: '0.8em',
        },
        button: {
          textTransform: 'none',
        },
      },
    })
  );
};

const WithThemeProvider = props => {
  const themePaletteType = useSelector(state => state.theme.paletteType);
  const themeInstance = theme({ type: themePaletteType });

  return (
    <ThemeProvider theme={themeInstance}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default WithThemeProvider;
