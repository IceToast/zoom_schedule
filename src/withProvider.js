import React from 'react';
import Theme from './Theme';

/**
 * Utility Higher Order Component factory. Returns HOC which takes another
 * Component and wraps it with given Provider.
 */
const withProvider = ({store, Provider}) => WrappedComponent => props => {

  return(
    <Provider store={store}>
      <Theme>
        <WrappedComponent {...props} />
      </Theme>
    </Provider>
  )
}

export default withProvider;
