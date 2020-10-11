export const LOGOUT = 'LOGOUT'
export const SET_SOCKET = 'SET_SOCKET'
export const SET_EVENT = 'SET_EVENT'
export const SET_LOADING = 'SET_LOADING'



export const setSocket = payload => dispatch =>{
    return dispatch({type:SET_SOCKET,payload})
}

export const setEvents = payload => dispatch =>{
    return dispatch({type:SET_EVENT,payload})
}

export const setLoading = payload => dispatch =>{
    return dispatch({type:SET_LOADING,payload})
}

export const logout = () => dispatch =>{
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    return dispatch({type:LOGOUT})
}