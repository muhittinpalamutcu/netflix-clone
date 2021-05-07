import React, { useState, useEffect } from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import Plans from "../components/Plans";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { updateUserEmail } from "../actions/userActions";

const ProfileScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const userEmailUpdate = useSelector((state) => state.userEmailUpdate);
  const { error } = userEmailUpdate;

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      setUserPassword("");
    }
  }, [user]);

  const changeEmail = () => {
    dispatch(updateUserEmail(user.email, userEmail, userPassword, user.uid));
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="profile-logo"
          />
          <div className="profileScreen__details">
            {error && (
              <div className="alert">
                <p>{error}</p>
              </div>
            )}
            {user.email && (
              <input
                type="email"
                name="email"
                value={userEmail}
                className="email-box"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            )}
            {user.email !== userEmail && (
              <>
                <p style={{ fontSize: "10px", marginTop: "5px" }}>
                  Please enter your password to update your email!
                </p>
                <input
                  type="password"
                  name="email"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="profileScreen-password-confirmation"
                />
              </>
            )}

            <button className="profileScreen__signOut" onClick={changeEmail}>
              Save
            </button>

            <div className="profileScreen__plans">
              <h4>Plans (Current Plan: premium)</h4>
              <Plans />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
