import { SET_SOCKET, SET_EVENT, LOGOUT, SET_LOADING } from "../action/action";

const initState = {
    socket : null,
    events: [],
    loading:false
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case SET_SOCKET:return {...state,socket:payload}
        case SET_EVENT:return {...state,events:payload}
        case LOGOUT:return {...state,events:[]}
        case SET_LOADING:return {...state,loading:payload}
        default : return state
    }
}

export default rootReducer