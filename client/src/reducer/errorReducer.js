// import {  } from "redux";
import {GET_ERRORS} from '../action/type'

const initstate={}


// export default function(state = initstate, action ) {
//     switch(action.type) {
//         case GET_ERRORS:
//             return action.payload;
//         default: 
//             return state;
//     }
// }


export default function(state=initstate,action){
   if(action.type===GET_ERRORS){
       return action.payload
   }
   return state
}