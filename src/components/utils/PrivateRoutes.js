import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { currentUser } = useAuth();

    return (
    <Route
      {...rest}
      render={(props) => (currentUser ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
}

  export default PrivateRoute;