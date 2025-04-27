import React from 'react';
import { Navigate } from 'react-router';
import classes from './guard.module.css';
import useAuth from '../../hooks/auth.hook';

interface IProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const Guard = (props: IProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  } else if (props.allowedRoles.includes(user.role) || props.allowedRoles[0] === '*') {
    return props.children;
  } else {
    return (
      <div className={classes.noAccess}>
        <p>You are not allowed to access this page</p>
      </div>
    );
  }

  return (
    <div>Guard</div>
  )
}

export default Guard