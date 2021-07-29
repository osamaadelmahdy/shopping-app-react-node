import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import userContext from "../context/userContext";
export default function LoginRoute({ path, component, ...rest }) {
  const { user, userLoading } = useContext(userContext);
  if (userLoading) return <h1>loading...</h1>;
  if (user) return <Redirect to="/" />;
  if (!user) return <Route path={path} component={component} {...rest} />;
}
