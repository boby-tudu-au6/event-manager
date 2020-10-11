import React, { useEffect, useState, useMemo } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import Cal from './Cal'
import { setEvents,setLoading } from '../redux/action/action'

function Home({history,setEvents,setLoading,events,socket,...props}) {
    
    const [con,setCon] = useState('')
    const [value,setValue] = useState('')
    let token = localStorage.getItem('token')
    let isAdmin = localStorage.getItem("admin")
    if(token===null)history.push('/login')
    if(isAdmin==='true')history.push('/admin')

    useEffect(()=>{

        if(socket!==null){

            socket.emit('getevent',{token})

            socket.on('addevent',data=>{
                if(data.status=='ok'){
                    socket.emit('getevent',{token})
                    
                }
            })

            socket.on("delete",data=>{
                setLoading(false)
                if(data.status==='ok'){
                    socket.emit("getevent",{token})
                }
            })
        
            socket.on("getevent",data=>{
                setLoading(false)
                setEvents(data.events)
            })

            socket.on("update",data=>{
                setLoading(false)
                if(data.status==='ok'){
                    socket.emit('getevent',{token})
                }
            })

            
        }
    },[socket])

    const handleSubmit = (_id,Subject) =>{
        setCon('')
        setLoading(false)
        socket.emit('update',{_id,Subject})
    }
    const handleDelete = id =>{
        setLoading(true)
        socket.emit('delete',{id})
    }

    return (
        <div>
            <Cal />
            {
                events!==undefined && events.length!==0?
                events.map(item=>(
                    <div key={item._id} 
                    className='row col-10 col-md-9 mr-auto ml-auto mt-4 shadow rounded pt-2'>
                    <div className='col-12 col-md-6 p-0'>
                    <form className='p-0 m-0 col-12' onSubmit={(e)=>{
                        e.preventDefault()
                        handleSubmit(item._id,e.target.title.value)
                    }}>
                        <input type="text" 
                        name='title'
                        className={`form-control col-12`} 
                        value={con!==item._id?item.Subject:value}
                        onChange={e=>setValue(e.target.value)}
                        disabled={con===item._id?false:true} />
                    </form>
                    </div>
                <div className='col-12 col-md-4'>
                    <p style={{fontSize:"12px"}}>
                        {(new Date((item.StartTime).toString())).toLocaleString()} to 
                    </p>
                    <p style={{fontSize:"12px"}}>
                    {(new Date((item.EndTime).toString())).toLocaleString()}
                    </p>
                </div>
                <div className='col-12 col-md-2 row p-0'>
                    <div className='col-6 p-0 text-center'>
                        <FontAwesomeIcon style={{cursor:"pointer"}} 
                        onClick={()=>{
                            setValue(item.Subject)
                            setCon(item._id)}
                        } icon={faPencilAlt} />
                    </div>
                    <div className='col-6 p-0 text-center'>
                        <FontAwesomeIcon style={{cursor:"pointer"}}
                        onClick={()=>handleDelete(item._id)} icon={faTrash} />
                    </div>
                    
                </div>
            </div>
                )):null
            }
        </div>
        
    )
}

const mapDispatch = dispatch =>{
    return {
        setEvents:payload=>dispatch(setEvents(payload)),
        setLoading:payload=>dispatch(setLoading(payload))
    }
}

export default connect(state=>{return {...state}},mapDispatch)(withRouter(Home))
