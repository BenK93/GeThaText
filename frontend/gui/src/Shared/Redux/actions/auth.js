import axios from "axios";
import * as actionTypes from "./actionTypes";

// need to add comments for each function here!
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
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

export const facebookLogin = (response) => {
  return (dispatch) => {
    dispatch(authStart());
    debugger;
    try {
      axios
        .post("http://127.0.0.1:8000/auth/convert-token", {
          token: response.accessToken,
          grant_type: "convert_token",
          backend: "facebook",
          client_id: "0lc8Vyira4xlClcmqzC3sBOXYS2vuLMXb1F2etds",
          client_secret:
            "tu9FU5zzvgixjSOb4iNVCwfxeLVWELGYh6cDmCdi2WARHNptD97Egd0YQkIrNaQdUZq3bs35esvJMk2AJ7mZZCNjRnPnk3ZRYVm5f2tDSV02lbjPvpx6Kio2ISLqmE2D",
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
          dispatch(checkAuthTimeout(3600));
          dispatch(authSuccess(token));
        })
        .catch((err) => {
          dispatch(authFail(err));
        });
    } catch (e) {
      dispatch(authFail(e));
    }
  };
};

export const googleLogin = (response) => {
  return (dispatch) => {
    dispatch(authStart());
    debugger;
    try {
      axios
        .post("http://127.0.0.1:8000/auth/convert-token", {
          token: response.accessToken,
          grant_type: "convert_token",
          backend: "google-oauth2",
          client_id: "0lc8Vyira4xlClcmqzC3sBOXYS2vuLMXb1F2etds",
          client_secret:
            "tu9FU5zzvgixjSOb4iNVCwfxeLVWELGYh6cDmCdi2WARHNptD97Egd0YQkIrNaQdUZq3bs35esvJMk2AJ7mZZCNjRnPnk3ZRYVm5f2tDSV02lbjPvpx6Kio2ISLqmE2D",
        })
        .then((res) => {
          const token = res.data["access_token"];
          const refresh_token = res.data["refresh_token"];
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          const username = response["profileObj"]["email"].split("@")[0];
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(checkAuthTimeout(3600));
          dispatch(authSuccess(token));
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
      .post("http://127.0.0.1:8000/login/", {
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
        dispatch(checkAuthTimeout(3600));
        dispatch(authSuccess(token));
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
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
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
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
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
        dispatch(authSuccess(token));
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
