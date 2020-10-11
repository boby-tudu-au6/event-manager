import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { setEvents } from '../redux/action/action'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'

function AdminDashboard({socket,setEvents,events,history}) {

    const [con,setCon] = useState('')
    const [value,setValue] = useState('')

    useEffect(()=>{
        let token = localStorage.getItem('token')
        let admin = localStorage.getItem('admin')
        if(admin!=='true')history.push('/')
        if(socket!==null){
            socket.emit('getallevent',{token})

            socket.on('getallevent',data=>{
                if(data.status==='ok'){
                    setEvents(data.events)
                }
            })

            socket.on("update",data=>{
                if(data.status==='ok'){
                    socket.emit('getallevent',{token})
                }
            })

            socket.on("delete",data=>{
                if(data.status==='ok'){
                    socket.emit("getallevent",{token})
                }
            })
        }

        
    },[socket])

    const handleSubmit = (_id,Subject) =>{
        setCon('')
        socket.emit('update',{_id,Subject})
    }
    const handleDelete = id =>{
        socket.emit('delete',{id})
    }

    return (
        <div>
            <h3 className='text-center'>Admin Dashboard</h3>
            <h6 className='text-center'>Available Events</h6>
            <hr className='col-6 m-auto bg-dark'/>
            <div className='col-11 col-md-9 m-auto'>
            <div 
            className='row col-10 col-md-9 mr-auto ml-auto'>
                <div className='col-12 col-md-2'>
                    <h6>Owner name</h6>
                </div>
                <div className='col-12 col-md-4'>
                    <h6>Title</h6>
                </div>
                <div className='col-12 col-md-4'>
                    <h6>Duration</h6>
                </div>
                <div className='col-12 col-md-2 row m-auto p-0'>
                <div className='col-6 p-0 text-center'>
                        <p className='p-0 text-left'>Edit</p>
                    </div>
                    <div className='col-6 p-0 text-center'>
                        <p>Delete</p>
                    </div>
                </div>
            </div>
            {
                events!==undefined && events.length!==0?
                events.map(item=>(
                    <div key={item._id} 
                    className='row col-10 col-md-9 mr-auto ml-auto mt-4 shadow rounded pt-2'>
                <div className='col-12 col-md-2'><h5>{item.owner.name}</h5></div>
                
                    <div className='col-12 col-md-4 p-0'>
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
        </div>
    )
}
const mapDispatch = dispatch =>{
    return {
        setEvents:payload=>dispatch(setEvents(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(AdminDashboard)
