import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { base } from '../App'

function Login({history,socket,...props}) {
    const [name,setName] = useState('abc')
    const [pass,setPass] = useState('123')

    useEffect(()=>{
        if(socket!==null){
            socket.on('login',data=>{
                if(data.status==='ok'){
                    localStorage.setItem("token",data.token)
                    localStorage.setItem("admin",data.isAdmin)
                    return data.isAdmin==='true'?history.push('/admin'):history.push('/')
                }else{
                    console.log(data)
                }
            })
        }
    },[socket])

    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            socket.emit('login',{
                name,pass
            })
            // const {data} = await Axios.post(`${base}/login`,{name,pass})
            // localStorage.setItem('token',data)
            // history.push('/')
        }catch(err){
            console.log(err.message)
        }
        
    }
    return (
        <div>
            <form 
            onSubmit={handleLogin} 
            className='col-10 col-md-5 ml-auto mr-auto mt-5 p-3 rounded shadow justify-content-center'>
                <input type="text" 
                name="name" 
                className='form-control col-12 border-secondary'
                placeholder='Enter phone number'
                value={name}
                onChange={e=>setName(e.target.value)}/>
                <input type="password" 
                name="pass"
                className='form-control col-12 border-secondary'
                placeholder='Enter phone number'
                value={pass}
                onChange={e=>setPass(e.target.value)}/>
                <button type='submit' 
                className='btn btn-sm mt-3 btn-secondary form-control'>Login</button>
            </form>
        </div>
    )
}

const mapState = state =>{return {...state}}

export default connect(mapState)(withRouter(Login))
