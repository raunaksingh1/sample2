import { GET_ERRORS } from "./type";
import axios from "axios";
import { SET_USER } from "./type";
import jwt_decode from "jwt-decode";
import authtoken from "../authtoken";
import { decode } from "punycode";

// export const registerUser=(user)=>(dispatch)=>{
//     axios.post('/api/user/register', user)
//     .then((res)=>{
// history.push('/login')
//     })
//     .catch(err=>{
//         dispatch({
//             type:GET_ERRORS,
//             payload:err.response.data
//         })
//     })

// }
// export const loginUser=(user)=>(dispatch)=>{
//     axios.post('/api/user/login', user)
//     .then((res)=>{
// // history.push('/login')
//     })
//     .catch(err=>{
//         dispatch({
//             type:GET_ERRORS,
//             payload:err.response.data
//         })
//     })

// }

export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/user/register", user)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("/api/user/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwt", token);
      authtoken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));

      // console.log(res.data.token)
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const setCurrentUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  authtoken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
};
