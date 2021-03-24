import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({store, Provider}) => WrappedComponent => props => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  </Provider>
);

export default withProvider;
