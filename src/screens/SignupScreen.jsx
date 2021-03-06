import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";
import { userlogin } from "../actions/userActions";
import { useDispatch } from "react-redux";

const SignupScreen = (props) => {
  const [email, setEmail] = useState(props.email ? props.email : "");
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    dispatch(userlogin(email, passwordRef.current.value));
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
        />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray"> New to Netflix? </span>{" "}
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
