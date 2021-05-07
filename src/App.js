import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";
import { USER_LOGIN_SUCCESS } from "./constants/userConstants";
import { userLogout } from "./actions/userActions";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const userEmailUpdate = useSelector((state) => state.userEmailUpdate);
  const { success } = userEmailUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { uid: userAuth.uid, email: userAuth.email },
        });
      } else {
        dispatch(userLogout());
      }
    });

    return unsubscribe;
  }, [dispatch, success]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route exact path="/" component={HomeScreen}></Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
