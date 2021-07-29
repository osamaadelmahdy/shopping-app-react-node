import { useEffect, useState } from "react";
import LoginScreen from "./component/loginScreen";
import NavbarComponent from "./component/navbar";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import RegisterScreen from "./component/registerScreen";
import { getUser } from "./http/auth";
import UserContext from "./context/userContext";
import HomeComponent from "./component/HomeComponent";
import PrivatRoute from "./component/privatRoute";
import SellScreen from "./component/SellScreen";
import productScreen from "./component/productScreen";
import CartScreen from "./component/cartScreen";
import LoginRoute from "./component/loginRouter";
export default function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    setUser(getUser() || null);
    setUserLoading(false);
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, userLoading }}>
        <NavbarComponent />
        <Switch>
          <LoginRoute path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivatRoute path="/sell" component={SellScreen} />
          <PrivatRoute path="/product/:id" component={productScreen} />
          <PrivatRoute path="/cart" component={CartScreen} />
          <PrivatRoute exact path="/" component={HomeComponent} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
