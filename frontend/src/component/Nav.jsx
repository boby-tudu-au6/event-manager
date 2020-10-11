import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { setSocket, logout, 
    setLoading, setEvents } from '../redux/action/action'
import { withRouter } from 'react-router-dom'

function Nav({setSocket,setEvents,setLoading,history,logout,...props}) {
    const [socket,setConn] = useState(io.connect('https://eventsites.herokuapp.com'))
    const token = localStorage.getItem('token')
    const admin = localStorage.getItem("admin")
    useEffect(() => {
        
        setSocket(socket)

        checkLogin()

        // socket.emit('getevent',{token})

        // socket.on('addevent',data=>{
        //     if(data.status=='ok'){
        //         socket.emit('getevent',{token})
        //         setLoading(true)
        //     }
        // })
    
        // socket.on("getevent",data=>{
        //     setLoading(false)
        //     setEvents(data.events)
        // })

        socket.on('checklogin',data=>{
            setLoading(false)
            if(data.status==='failed')logout()
        })
    }, [])

    const checkLogin = () =>{
        // setLoading(true)
        if(localStorage.getItem('token')!==null && 
        localStorage.getItem('admin')!==null){
            return socket.emit('checklogin',{token,admin})
        }else{
            return logout()
        }
        
    }

    
    
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a href="/" className='navbar-brand'>Logo</a>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/" onClick={e=>{
                        e.preventDefault()
                        logout()
                        return history.push('/login')
                    }}>Logout</a>
                </li>
            </ul>
            </nav>
    )
}

const mapDispatch = dispatch =>{
    return {
        setSocket:payload=>dispatch(setSocket(payload)),
        setEvents:payload=>dispatch(setEvents(payload)),
        logout:()=>dispatch(logout()),
        setLoading:payload=>dispatch(setLoading(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(withRouter(Nav))
