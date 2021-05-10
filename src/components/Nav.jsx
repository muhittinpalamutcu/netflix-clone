import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import "./Nav.css";

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
};

const Nav = (props) => {
  const [show, handleShow] = useState(false);
  const [key, setKey] = useState("");
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const openSearchBar = () => {
    setIsComponentVisible(true);
  };

  const searchKey = (e) => {
    setKey(e.target.value);
    props.findMovies(e.target.value);
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src="https://marka-logo.com/wp-content/uploads/2020/04/Netflix-Logo.png"
          alt="netflix-logo"
        />
        {props.search && (
          <>
            {isComponentVisible && (
              <span
                ref={ref}
                className="search__logo fas fa-search nav__search"
              >
                <input
                  type="text"
                  value={key}
                  onChange={(e) => searchKey(e)}
                  placeholder="Titles, people, genres"
                />
              </span>
            )}
            {!isComponentVisible && (
              <i
                className="fas fa-search nav__search__logo"
                style={{ color: "white" }}
                onClick={openSearchBar}
              ></i>
            )}
          </>
        )}

        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="profile-logo"
        />
      </div>
    </div>
  );
};

export default Nav;
