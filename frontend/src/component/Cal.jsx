
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import Form from './Form'
import { connect } from 'react-redux'
class Cal extends React.Component {
    constructor() {
        super();
        this.state = {
            title:'',
            stime:'',
            etime:'',
            sdate:'',
            edate:'',
            scheduleData:[]
        }
        
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.events.length!==this.props.events.length){
            this.setState({...this.state,scheduleData:this.props.events})
        }
    }
    
    render() {
        return (<div>
            <Form   />
            <p className='text-center'>
                Don't create/update/delete events from Calendar
            </p>
            <ScheduleComponent 
            currentView="Month"
            className='col-6 m-auto'
            ref={t => this.scheduleObj = t} 
            width='100%' 
            height='550px' 
            eventSettings={{ dataSource: this.state.scheduleData }}>
                <ViewsDirective>
                    <ViewDirective option='Day'/>
                    <ViewDirective option='Month'/>
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month]}/>
            </ScheduleComponent>
        </div>);
    }
};


export default connect(state=>{return {...state}})(Cal)