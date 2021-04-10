import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

const mainColor = '#ffffff';

export const getColorPalette = (color, type) => ({
  type,
  primary: blue,
});

const theme = config => {
  const colorPalette = getColorPalette(mainColor, config.type);
  return responsiveFontSizes(
    createMuiTheme({
      palette: colorPalette,
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

function Theme(props) {
  const themePaletteType = useSelector(state => state.theme.paletteType);
  const themeInstance = theme({ type: themePaletteType });

  return (
    <ThemeProvider theme={themeInstance}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default Theme;
