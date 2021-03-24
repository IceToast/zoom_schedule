import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Color from 'color';

const mainColor = '#ffffff';

export const getColorPalette = color => ({
  light: Color(color).lighten(0.25).hsl().string(),
  main: color,
  dark: Color(color).darken(0.25).hsl().string(),
  contrastText: Color(color).isDark() ? '#ffffff' : '#000000',
});

export const theme = () => {
  const colorPalette = getColorPalette(mainColor);
  return responsiveFontSizes(
    createMuiTheme({
      palette: colorPalette,
      props: {
        MuiPaper: {elevation: 1},
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
      },
    })
  );
};
