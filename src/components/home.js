import React from 'react';
import background from './heroo.png';

import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useForm , Controller } from "react-hook-form";

function Home() {

    const [times] = React.useState([
    
        { value: '09:00:00', label: '9:00 am' },
        { value: '09:30:00', label: '9:30 am' },
        { value: '10:00:00', label: '10:00 am' },
        { value: '10:30:00', label: '10:30 am' },
        { value: '11:00:00', label: '11:00 am' },
        { value: '11:30:00', label: '11:30 am' },
        { value: '12:00:00', label: '12:00 pm' },
        { value: '12:30:00', label: '12:30 pm' },
        { value: '13:00:00', label: '1:00 pm' },
        { value: '13:30:00', label: '1:30 pm' },
        { value: '14:00:00', label: '2:00 pm' },
        { value: '14:30:00', label: '2:30 pm' },
        { value: '15:00:00', label: '3:00 pm' },
        { value: '15:30:00', label: '3:00 pm' },
        { value: '16:00:00', label: '4:00 pm' },
        { value: '16:30:00', label: '4:30 pm' },
        { value: '17:00:00', label: '5:00 pm' },
        { value: '17:30:00', label: '5:30 pm' },
        // { value: '18:00:00', label: '6:00 pm' },
        // { value: '19:00:00', label: '7:00 pm' },
        // { value: '20:00:00', label: '8:00 pm' },
    ]);
    //const {  control } = useForm();
    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm();
    
    return ( 
        <div className='container'>
        <div className=' mt-4 hero'>

            <div className='col-md-10 m-auto hero herobg card py-5 px-5' style={{
                background: `url(${background})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"auto",
                backgroundPosition:" right center"

            }}>

                <h2 className='heroheading'>Book an Appointment </h2>
                <p className='heropara'>Save time spent on coordinating appointments over phone and email with an all-in-one appointment booking system. Booking available online 24 x7</p>

            </div>
            
        </div>

        <br></br>

        <h4 style={{
            color:"#D07750",
            fontWeight:"bold",
            fontSize:"17px"
        }} className='consultation'>Consultation Type</h4>



        <div className='type row d-flex justify-content-around'>
            <div className='col-md-4 shadow p-3 mb-5 bg-white rounded text-enter'>
                
                <input style={{
                    color:"red"
                }} type="radio" name="type" value="General Practitioner"/> <span className='typevalue'>General Practitioner</span>
                <br/>
                <span className='small'>30 mins</span>
            </div>

            <div className='col-md-4 shadow p-3 mb-5 bg-white rounded'>
                
                <input type="radio" name="type" value="Gynaecologist"/> <span className='typevalue'>Gynaecologist</span>
                <br/>
                <span className='small'>30 mins</span>
            </div>

            <div className='col-md-4 shadow p-3 mb-5 bg-white rounded'>
                
                <input type="radio" name="type" value="Aesthetician"/> <span className='typevalue'>Aesthetician</span>
                <br/>
                <span className='small'>30 mins</span>
            </div>

        </div>

       
       
       
        <h4 style={{
            color:"#D07750",
            fontWeight:"bold",
            fontSize:"17px"
        }} className='consultation'>Preferred Date and Time</h4>


        {/* Calender Div */}

        <div className='row preferreddate mt-4'>
            <div className='col-md-6 calenderdiv'>

            <Calendar 
            minDate={new Date()}
            
            className="appointment-calendar"
            next2Label={null}
            prev2Label={null}
            nextLabel={<i class="fas fa-chevron-right text-secondary"></i>}
            prevLabel={<i class="fas fa-chevron-left text-secondary"></i>}

            tileDisabled={({ date }) => date.getDay() === 0}
            />

            </div>

            <div className='timediv col-md-6'>
            <div class="row">
                                            {times && times.map((row, index) => {

                                                return (<Controller
                                                    name="time"
                                                    control={control}
                                                    rules={{ required: 'Appointment time is required' }}
                                                    render={({
                                                        field: { onChange, onBlur, value, name, ref },
                                                    }) => (<div key={index} class="col-4"
                                                    onClick={() => setValue("time", row.value)}>
                                                        <div class={`time-picker ${value === row.value && 'active'}`}>{row.label}</div>
                                                    </div>)}
                                                />)
                                            })}
                                        </div>

                                        
            <div className='alert alert-info'>
                <p style={{
                    fontSize:"15px",

                }}>You have selected </p> 
                <p style={{
                    fontSize:"14px",
                    fontWeight:"bold",
                }}>Friday, October 21, 2022 by 2:00 pm</p>
            </div>

            </div>



           

        </div>

        <br/>
        
            <div className='text-center'>
            <button className='btn py-2'style={{
                background:"#D07750",
                color:"white",
                borderRadius:"30px",
                width:"40%",
                fontSize:"18px",
                margin:"auto",
                fontWeight:"600"
                
            }}>Next to Continue</button>
            </div>
       
<br/>
<br/>
        

        </div>

        
     );
}

export default Home ;
