import {compose,applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import rootreducer from './reducer/index'

const initstate={}


const store=createStore(rootreducer,initstate,compose(applyMiddleware(thunk), 
window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store
