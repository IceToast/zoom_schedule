import React from 'react';
import Theme from './Theme';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({ store, StoreProvider }) => WrappedComponent => props => {
  return (
    <StoreProvider store={store}>
      <Theme>
        <WrappedComponent {...props} />
      </Theme>
    </StoreProvider>
  );
};

export default withProvider;
