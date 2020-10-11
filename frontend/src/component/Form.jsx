import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function Form({socket}) {
    const [title,settitle] = useState('')
    const [sdate,setsdate] = useState('')
    const [edate,setedate] = useState('')
    const [etime,setetime] = useState('')
    const [stime,setstime] = useState('')
    
    
    const handleSubmit = e =>{
        e.preventDefault()
        let Data = {
            Subject: title,
            StartTime: new Date(
                sdate.slice(0,4),parseInt(sdate.slice(5,7))-1,
                sdate.slice(8,10),parseInt(stime.slice(0,2)),
                parseInt(stime.slice(4,6)),0),
                
            EndTime: new Date(
                edate.slice(0,4),parseInt(edate.slice(5,7))-1,
                edate.slice(8,10),parseInt(etime.slice(0,2)),
                parseInt(etime.slice(4,6)),0),
            IsAllDay: false
        }
        let token = localStorage.getItem('token')
        socket.emit('addevent',{Data,token})
    }


    return (
        <form onSubmit={handleSubmit} method="post" 
            className='col-10 col-md-6 ml-auto mb-5 mr-auto p-3 shadow rounded'>
                <div className='row col-12 m-auto pb-2'>
                    <div className='col-4'><h5>Title</h5></div>
                    <div className='col-8'>
                        <input type='text' 
                        value={title}
                        onChange={e=>settitle(e.target.value)} 
                        name="date" className='form-control' required={true} />
                    </div>
                </div>
                <div className='row col-12 m-auto pb-2'>
                    <div className='col-4'><h5>Start date</h5></div>
                    <div className='col-8'>
                        <input type='date' 
                        value={sdate}
                        onChange={e=>setsdate(e.target.value)} 
                        name="date" className='form-control' required={true} />
                    </div>
                </div>
                <div className='row col-12 m-auto pb-2'>
                    <div className='col-4'><h5>Start time</h5></div>
                    <div className='col-8'>
                        <input type='time'
                        value={stime} 
                        onChange={e=>setstime(e.target.value)} 
                        name="date" className='form-control' required={true} />
                    </div>
                </div>
                <div className='row col-12 m-auto pb-2'>
                    <div className='col-4'><h5>End date</h5></div>
                    <div className='col-8'>
                        <input type='date'
                        value={edate} 
                        onChange={e=>setedate(e.target.value)} 
                        name="date" className='form-control' required={true} />
                    </div>
                </div>
                <div className='row col-12 m-auto pb-2'>
                    <div className='col-4'><h5>End time</h5></div>
                    <div className='col-8'>
                        <input type='time'
                        value={etime} 
                        onChange={e=>setetime(e.target.value)} 
                        name="date" className='form-control' required={true} />
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Create</button>
            </form>
    )
}



export default connect(state=>{return {...state}})(Form)
