import { type } from "@testing-library/user-event/dist/type";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Alert, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";

import { primaryColor, requestHeaders } from "../../global_data";
import { userApiRoute } from "../../routes";
import useHttp from "../../shared/hooks/useHttp";

import "./auth.css";

// const basicStyle = { color: '#603fef' };

// const bgStyle = { 'background-color': 'white' };

const authApiLink = "users/";

const actionType = {
  login: "login",
  signUp: "signUp",
  usernameChange: "usernameChange",
  passwordChange: "passwordChange",
  nameChange: "nameChange",
  modeSwitch: "modeSwitch",
  reset: "reset",
};

const initState = {
  username: "",
  password: "",
  name: "",
  islogin: true,
};

function reducer(state, action) {
  if (action.type === actionType.reset) {
    console.log("RESET");
    return initState;
  }
  let prevState = { ...state };

  if (action.type === actionType.usernameChange) {
    prevState.username = action.username;
    return prevState;
  } else if (action.type === actionType.passwordChange) {
    prevState.password = action.password;
    return prevState;
  } else if (action.type === actionType.nameChange) {
    prevState.name = action.name;
    return prevState;
  } else if (action.type === actionType.modeSwitch) {
    prevState.islogin = !prevState.islogin;
    return prevState;
  } else {
    throw new Error("Inavlid actions request");
  }
}
export default function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [loading,error,sendRequest] = useHttp();

  const [state, dispatch] = useReducer(reducer, initState);

  const [Invalid, setInvalid] = useState(false);

  const userRef = useRef(null);

  async function onsubmitHandler(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem(authApiLink));

    if (users == null) {
      users = [];
    }

    const curUserInfo = { username: state.username, password: state.password , name:state.name};

    console.log(users);

    if (state.islogin) {
      for (const user of users) {
        if (
          user.username === curUserInfo.username &&
          user.password === curUserInfo.password
        ) {
          auth.login(curUserInfo);

          console.log("Logged in");

          navigate("/showProd");

          return;
        }
      }

      setInvalid(true);

      setTimeout(() => {
        setInvalid(false);
        dispatch({ type: actionType.reset });
      }, 1000);

      console.log("Invalid credentials");
    } else {
      

      try{
      const resData = await sendRequest(`${userApiRoute}/register`,'POST',requestHeaders,curUserInfo);

      console.log(resData);


      users.push(curUserInfo);

      localStorage.setItem(authApiLink, JSON.stringify(users));

      auth.login(curUserInfo);

      console.log("Registed");
      navigate("/showProd");
      }

      catch(err){
    
        console.error(err);
      }
    }
  }

  //   let namelist =  useCallback(()=>{

  //      return [username,username+" Bob" , username+" Great"];

  //     },[username]);

  return (
    <form className="auth-form" onSubmit={onsubmitHandler}>
      <h3> {state.islogin ? "Welcome back" : "Regsiter"} </h3>
      <hr />

      {!state.islogin && (
        <>
          <label>Name</label>
          <input
            className="auth-form-control"
            value={state.name}
            onChange={(e) => {
              dispatch({ type: actionType.nameChange, name: e.target.value });
            }}
            type="text"
          />
        </>
      )}

      <br />
      <label>Username</label>

      <input
        ref={userRef}
        onClick={(e) => {
          console.log("I am clicked");
        }}
        value={state.username}
        onChange={(e) => {
          dispatch({
            type: actionType.usernameChange,
            username: e.target.value,
          });
        }}
        className="auth-form-control"
        type="text"
      />

      <br />

      <label>Password</label>

      <input
        value={state.password}
        onChange={(e) => {
          dispatch({
            type: actionType.passwordChange,
            password: e.target.value,
          });
        }}
        className="auth-form-control"
        type="password"
      />

      <br />
      <br />

      <div className="row">
        <Button type="submit" className="auth-btn col">
          {state.islogin ? "Login" : "Register"}{" "}
        </Button>

        <Button
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: actionType.reset });
          }}
          className="btn-secondary mx-1 col"
        >
          Reset
        </Button>
      </div>

      <br />
      <a>
        <span
          onClick={(e) => {
            dispatch({ type: actionType.modeSwitch });
          }}
          className="link"
        >
          {state.islogin ? "Register" : "SignIn"}
        </span>
        , insted
      </a>

      {Invalid && (
        <Alert className="mx-5 my-3 px-3 py-3" variant="danger">
          Inavlid Credentials
        </Alert>
      )}

      <Button
        className="my-2 mx-2 px-3 py-3"
        onClick={(e) => {
          console.log(userRef.current.parentNode);
          userRef.current.focus();
        }}
      >
        Focus{" "}
      </Button>
    </form>
  );
}
