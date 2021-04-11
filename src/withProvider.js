import React from 'react';
import WithThemeProvider from './Theme';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({ store, StoreProvider }) => WrappedComponent => props => {
  return (
    <StoreProvider store={store}>
      <WithThemeProvider>
        <WrappedComponent {...props} />
      </WithThemeProvider>
    </StoreProvider>
  );
};

export default withProvider;
