import React, { ReactNode, PropsWithChildren } from 'react';
import { Navigate, useLocation} from 'react-router-dom';

const PrivateRoute = ({
  children,
}: {
  children: JSX.Element
}) => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }  

  return children
}

export default PrivateRoute;