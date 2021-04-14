import React from 'react';
import WithThemeProvider from './Theme';
import ReactPWAInstallProvider from 'react-pwa-install';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({ store, StoreProvider }) => WrappedComponent => props => {
  return (
    <StoreProvider store={store}>
      <WithThemeProvider>
        <ReactPWAInstallProvider enableLogging>
          <WrappedComponent {...props} />
        </ReactPWAInstallProvider>
      </WithThemeProvider>
    </StoreProvider>
  );
};

export default withProvider;
