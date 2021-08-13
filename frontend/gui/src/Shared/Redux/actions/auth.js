import axios from "axios";
import * as actionTypes from "./actionTypes";

// need to add comments for each function here!
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user, token) => {
  return {
    user: user,
    token: token,
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const facebookRegistration = (response) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/api/auth/convert-token/", {
        token: response.accessToken,
        grant_type: "convert_token",
        backend: "facebook",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET_KEY,
      })
      .then((res) => {
        debugger;
        const token = res.data["access_token"];
        const refresh_token = res.data["refresh_token"];
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const username = response["name"].replaceAll(" ", "");
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expirationDate", expirationDate);
        // dispatch(checkAuthTimeout(expirationDate));
        setTimeout(() => {
          dispatch(authSuccess(username, token));
        }, 2000);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const googleRegistration = (response) => {
  return (dispatch) => {
    dispatch(authStart());
    try {
      axios
        .post("/api/auth/convert-token/", {
          token: response.accessToken,
          grant_type: "convert_token",
          backend: "google-oauth2",
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET_KEY,
        })
        .then((res) => {
          const token = res.data["access_token"];
          const refresh_token = res.data["refresh_token"];
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          const username = response["profileObj"]["email"].split("@")[0];
          localStorage.setItem("email", response["profileObj"]["email"]);
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("expirationDate", expirationDate);
          // dispatch(checkAuthTimeout(expirationDate));
          setTimeout(() => {
            dispatch(authSuccess(username, token));
          }, 3000);
        })
        .catch((err) => {
          dispatch(authFail(err));
        });
    } catch (e) {
      dispatch(authFail(e));
    }
  };
};

// login form
export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/api/login/", {
        username: email,
        password: password,
      })
      .then((res) => {
        const token = res.data["key"];
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const username = res.data["username"];
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", res.data["email"]);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("date_joined", res.data["date_joined"]);
        // dispatch(checkAuthTimeout(expirationDate));
        setTimeout(() => {
          dispatch(authSuccess(username, token));
        }, 2000);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
// on sign up form submit
export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/api/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        setTimeout(() => {
          dispatch(authSuccess(username, token));
        }, 2000);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        // dispatch(authSuccess(username, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// upload
export const authUploadImage = () => {
  return (dispatch) => {
    console.log("work");
  };
};
// social Login
export const socialUserLogin = (data, email) => {
  return (dispatch) => {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const token = data.userInfo.token;
    const username = data.userInfo.personal.username;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("expirationDate", expirationDate);
    setTimeout(() => {
      dispatch(authSuccess(username, token));
    }, 2000);
    // dispatch(checkAuthTimeout(expirationDate));
  };
};
