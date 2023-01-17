import React, { useEffect } from 'react';
import background from './heroo.png';

import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState} from 'react';
import { useForm , Controller } from "react-hook-form";
import { ErrorMsg } from './error';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function Home() {
    const date = new Date()
    const [type, setType] = useState('');

    //const datenumber = [24 , 12, 5, 4, 8];

   const [datenumber , setDateNumber] = useState([]);

    React.useEffect(() => {

        axios.get(`https://admin.asknello.com/api/getdatearray?specialization=${type}`).then(response => {
               
                //hideLoader();
                console.log(response)

                setDateNumber(response.data);
            

              

                console.log(datenumber[0]['dates']);
              

     
            }).catch(error => {
                console.log(error)
            })

    
      
    


    }, [type]);

    

   const setClass = (date) => {
        const dateobj =
          datenumber.find((x) => {
            return (
              date.getDate() === parseInt(x['dates'])
            );
          });
        return !  dateobj ;}
        
    
    const navigate = useNavigate();
    const [times, setTimes] = React.useState([
    

        
        { value: '09:00:00', label: '9:00 am', match: false },
        { value: '09:30:00', label: '9:30 am', match: false  },
        { value: '10:00:00', label: '10:00 am', match: false  },
        { value: '10:30:00', label: '10:30 am', match: false  },
        { value: '11:00:00', label: '11:00 am' , match: false },
        { value: '11:30:00', label: '11:30 am', match: false  },
        { value: '12:00:00', label: '12:00 pm', match: false },
        { value: '12:30:00', label: '12:30 pm', match: false  },
        
        { value: '14:00:00', label: '2:00 pm', match: false  },
        { value: '14:30:00', label: '2:30 pm', match: false  },
        { value: '15:00:00', label: '3:00 pm', match: false  },
        { value: '15:30:00', label: '3:30 pm', match: false  },
        { value: '16:00:00', label: '4:00 pm', match: false  },
        { value: '16:30:00', label: '4:30 pm', match: false  },
        { value: '17:00:00', label: '5:00 pm', match: false  },
        
       
        // { value: '18:00:00', label: '6:00 pm' },
        // { value: '19:00:00', label: '7:00 pm' },
        // { value: '20:00:00', label: '8:00 pm' },
    ]);
    //const {  control } = useForm();
    const { register, handleSubmit, setValue, getValues, watch, control, formState: { errors } } = useForm();
    

    

    const selectedDate = watch('date');
    const selectedTime = watch('time');
    const [showBtn, setShowBtn] = useState(false);



    const onSubmit = (values) => {
        // console.log(values)
        
       
        navigate('/summary',{state:{type:type, date:moment(selectedDate).format('dddd, MMMM DD, YYYY'), time: moment(selectedTime, 'h:mm a').format('h:mm a')}});
           

    }


    React.useEffect(() => {

       

        console.log(moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('dddd, MMMM DD, YYYY'))
        console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    
        if(selectedDate && type){
            axios.get(`https://admin.asknello.com/api/checktime?date=${moment(selectedDate).format('dddd, MMMM DD, YYYY')}&caretype=${type}`).then(response => {
               
                //hideLoader();
                console.log(response)
                if(response.data.status=="notbooked"){
                   
                    
                   console.log('Available times');

                    if(moment(selectedDate).format('dddd, MMMM DD, YYYY') !=  moment().format('dddd, MMMM DD, YYYY')){
                        setTimes([

                          
                            { value: '09:00:00', label: '9:00 am', match: false },
                            { value: '09:30:00', label: '9:30 am', match: false  },
                            { value: '10:00:00', label: '10:00 am', match: false  },
                            { value: '10:30:00', label: '10:30 am', match: false  },
                            { value: '11:00:00', label: '11:00 am' , match: false },
                            { value: '11:30:00', label: '11:30 am', match: false  },
                            { value: '12:00:00', label: '12:00 pm', match: false },
                            { value: '12:30:00', label: '12:30 pm', match: false  },
                            
                            { value: '14:00:00', label: '2:00 pm', match: false  },
                            { value: '14:30:00', label: '2:30 pm', match: false  },
                            { value: '15:00:00', label: '3:00 pm', match: false  },
                            { value: '15:30:00', label: '3:30 pm', match: false  },
                            { value: '16:00:00', label: '4:00 pm', match: false  },
                            { value: '16:30:00', label: '4:30 pm', match: false  },
                            { value: '17:00:00', label: '5:00 pm', match: false  },
                           
                           ])
                    }

                    else{

                        let newtime = [];


                        let passed = times.filter(time => {
                            return +moment().add(30, 'minutes').format('x') > +moment(time.value, 'h:mm a').format('x');
                          });

                          let present = times.filter(time => {
                            return +moment().add(30, 'minutes').format('x') < +moment(time.value, 'h:mm a').format('x');
                          });

                          //console.log(passed);
                          passed.map(function(row, index){
                            newtime.push({value: row.value, label: row.label, match: true});
                          })

                          present.map(function(row, index){
                            newtime.push({value: row.value, label: row.label, match: false});
                          })
                          

                          setTimes(newtime);

                      
                    }

                   
                }




                

                // else if(response.data == 'false'){
                //     setShowBtn(true)
                //     console.log('correct')
                // }

                else{
                    let booked = response.data.time;
                    //console.log(moment(selectedTime, ["h:mm A"]).format("HH:mm") + ":00")

                    if(moment(selectedDate).format('dddd, MMMM DD, YYYY') !=  moment().format('dddd, MMMM DD, YYYY')){
                         let obj3 = []

                        times.map(function(a) {
                        let match = booked.filter(b => a.label === b.time);
                        if (match.length) {
                        obj3.push({value: a.value, label: a.label, match: true});
                        } else {
                        obj3.push({value: a.value, label: a.label, match: false});
                        }
                        })

                        console.log(obj3);

                        setTimes(obj3);

                    }

                    else{
                        let obj3 = []

                        times.map(function(a) {
                        let match = booked.filter(b => a.label === b.time || +moment().add(30, 'minutes').format('x') > +moment(a.value, 'h:mm a').format('x'));
                        if (match.length) {
                        obj3.push({value: a.value, label: a.label, match: true});
                        } else {
                        obj3.push({value: a.value, label: a.label, match: false});
                        }
                        })

                        console.log(obj3);

                        setTimes(obj3);

                    //    let newtime = [];


                    //     let passed = times.filter(time => {
                    //         return +moment().add(30, 'minutes').format('x') > +moment(time.value, 'h:mm a').format('x');
                    //       });

                    //       let present = times.filter(time => {
                    //         return +moment().add(30, 'minutes').format('x') < +moment(time.value, 'h:mm a').format('x');
                    //       });

                    //       //console.log(passed);
                    //       passed.map(function(row, index){
                    //         newtime.push({value: row.value, label: row.label, match: true});
                    //       })

                    //       present.map(function(row, index){
                    //         newtime.push({value: row.value, label: row.label, match: false});
                    //       })

                        

                    //     setTimes(newtime);
                    }

                   
                }

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
    


    }, [selectedDate, type]);


    React.useEffect(() => {
        var pickedate = moment(selectedDate).format('dddd, MMMM DD, YYYY')
        var todaydated = moment().format('dddd, MMMM DD, YYYY')
        // console.log(moment(selectedDate).format('dddd, MMMM DD, YYYY'));
        // console.log(moment().format('dddd, MMMM DD, YYYY'))

        console.log('date selected is' + pickedate);
        console.log('today date is ' + todaydated)



        //console.log(moment(selectedTime, 'h:mm a').format('h:mm a'))

        //
        //console.log(moment().format('h:mm a'))
        console.log(moment().format('HH:mm:ss a'))
        var valuedate = moment().format('HH:mm:ss a');
        var mytimeselected = moment(selectedTime, 'h:mm a').format('HH:mm:ss a')
        console.log(mytimeselected);


console.log(moment(selectedTime, 'h:mm a').format())

var c = +moment().add(30, 'minutes').format('x');
var d = moment(selectedTime, 'h:mm a').format();

var e = +moment(selectedTime, 'h:mm a').format('x')
var f = e / 60000

var g = (e - c) / 60000

console.log(e)
console.log(f)
console.log(g)
    

if(pickedate == todaydated){
    console.log(moment().format('HH:mm:ss a'))
var valuedate = moment().format('HH:mm:ss a');
var mytimeselected = moment(selectedTime, 'h:mm a').format('HH:mm:ss a')
console.log(mytimeselected);


console.log(moment(selectedTime, 'h:mm a').format())

var c = +moment().add(30, 'minutes').format('x');
var d = moment(selectedTime, 'h:mm a').format();

var e = +moment(selectedTime, 'h:mm a').format('x')
var f = e / 60000

var g = (e - c) / 60000

 console.log('check this out ' + +moment().add(30, 'minutes').format('x'))
 console.log('check this out two' + +moment("10:00:00", 'h:mm a').format('x'))
// console.log(f)10:00:00
console.log(parseInt(g))

/// check if g is greater than 0

if(g >= 1){
    //setShowBtn(true)
    console.log('available')
    if(selectedDate && selectedTime && type){
        console.log(type)
        axios.get(`https://admin.asknello.com/api/checkappointment?date=${moment(selectedDate).format('dddd, MMMM DD, YYYY')}&time=${moment(selectedTime, 'h:mm a').format('h:mm a')}&caretype=${type}`).then(response => {
               
                //hideLoader();
                console.log(response)
                if(response.data.status=="booked"){
                   
                    
                    setShowBtn(false);
                   console.log('Already Booked')
                   toast.error(`${response.data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                }

                // else if(response.data == 'false'){
                //     setShowBtn(true)
                //     console.log('correct')
                // }

                else{
                    console.log('Not boooked')
                    setShowBtn(true);
                    toast.success(`${response.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
}
else{
    setShowBtn(false)
    // return NotificationManager.error("Select at least 30 mins after the current time");

    if(selectedDate && selectedTime && type){
        console.log(type)
        toast.error('Select at least 30 mins after the current time', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
}


}
else {
    //setShowBtn(true)
    console.log('available')

    if(selectedDate && selectedTime && type){
        console.log(type)
        axios.get(`https://admin.asknello.com/api/checkappointment?date=${moment(selectedDate).format('dddd, MMMM DD, YYYY')}&time=${moment(selectedTime, 'h:mm a').format('h:mm a')}&caretype=${type}`).then(response => {
               
                //hideLoader();
                console.log(response.data.status)

                if(response.data.status=="booked"){
                   
                    
                    setShowBtn(false);
                   console.log('Already Booked')
                   toast.error(`${response.data.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                }

                // else if(response.data == 'false'){
                //     setShowBtn(true)
                //     console.log('correct')
                // }

                else{
                    console.log('Not boooked')
                    setShowBtn(true);
                    toast.success(`${response.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }

                
              

     
            }).catch(error => {
                console.log(error)
            })


    }
}





    }, [selectedDate, selectedTime, type]);


    
    
    return ( 
        <div className='container'>
        <div className=' mt-4 hero'>

            <div className='col-md-10 m-auto hero herobg card py-5 px-5' style={{
                
                

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


<form id="form-appointment" onSubmit={handleSubmit(onSubmit)}>
        <div className='type row d-flex justify-content-around'>
            <div className='col-md-6 shadow p-3 mb-5 bg-white rounded text-enter'
            
            >

          
                
                <input onChange={function(e){
                    setType(e.target.value);
                    console.log(type)
                }} type="radio" name="type" value="General Practitioner"required/> <span className='typevalue'>General Practitioner</span>
                <br/>
                <span className='small'>30 mins</span>
            </div>

            <div className='col-md-6 shadow p-3 mb-5 bg-white rounded'>
                
                <input onChange={function(e){
                    setType(e.target.value);
                    console.log(type)
                }} type="radio" name="type" value="Gynaecologist" required /> <span className='typevalue'>Gynaecologist</span>
                <br/>
                <span className='small'>30 mins</span>
            </div>

            {/* <div className='col-md-4 shadow p-3 mb-5 bg-white rounded'>
                
                <input onChange={function(e){
                    setType(e.target.value);
                    console.log(type)
                }} type="radio" name="type" value="Aesthetician" required/> <span className='typevalue'>Aesthetician</span>
                <br/>
                <span className='small'>30 mins</span>
            </div> */}

        </div>

       
       
       
        <h4 style={{
            color:"#D07750",
            fontWeight:"bold",
            fontSize:"17px"
        }} className='consultation'>Preferred Date and Time</h4>


        {/* Calender Div */}
        

        <div className='row preferreddate mt-4'>
            <div className='col-md-6 calenderdiv'>

            

           
                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: 'Appointment date is required' }}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                        }) => (
                                            <Calendar 
                                            minDate={new Date()}
                                            maxDate={new Date(date.getFullYear(), date.getMonth() + 1, 0)}
                                            onChange={onChange}
                                            className="appointment-calendar"
                                            next2Label={null}
                                            prev2Label={null}
                                            nextLabel={<i class="fas fa-chevron-right text-secondary"></i>}
                                            prevLabel={<i class="fas fa-chevron-left text-secondary"></i>}

                                          


                                
                                            tileDisabled={({ date }) => setClass(date) }

                                           //tileDisabled={({ date }) => date.getDate() === (datenumber[1] || datenumber[2])}

                                           
                                           
                                            />
                                
                                        )}
                                    />
                                    <ErrorMsg errors={errors} name="date" />

            </div>

            <div className='timediv col-md-6'>

                {
                    
                    selectedDate && type && (
                    <div class="row">
                                            {times && times.map((row, index) => {

                                                return (

                                                    <>
                                                    {row.match == false ? <Controller
                                                    
                                                    
                                                    name="time"
                                                    control={control}
                                                    rules={{ required: 'Appointment time is required' }}
                                                    render={({
                                                        field: { onChange, onBlur, value, name, ref },
                                                    }) => (
                                                    
                                                    
                                                    <div key={index} class="col-4"
                                                    onClick={() => setValue("time", row.value)}>

                                                     

                                                        <div class={`time-picker ${value === row.value && 'active'}`}>{row.label}</div>


                                                    </div>
                                                    
                                                    
                                                    )}
                                                /> : 
                                                <div 
                                                
                                                // onClick={function(){
                                                //     toast.error(`${row.label} has already been book for a/an ${type} on ${moment(selectedDate).format('dddd, MMMM DD, YYYY')}`, {
                                                //         position: "top-right",
                                                //         autoClose: 5000,
                                                //         hideProgressBar: false,
                                                //         closeOnClick: true,
                                                //         pauseOnHover: true,
                                                //         draggable: true,
                                                //         progress: undefined,
                                                //         });
                                                // }} 
                                                
                                                key={index} class="col-4"
                                                >
                                                    <div class="bg-secondary time-picker"style={{
                                                        color:"white",
                                                        border:"none",
                                                    
                                                    }}>{row.label}</div>
                                                </div>
                                            }
                                                    </>
                                               
                                                )
                                            })}
                                            <ErrorMsg errors={errors} name="time" />
                                        </div>

                    )
                                        // kkk

                                        

                                       
                }


            

                                        
            

                          {selectedDate && selectedTime && (<div className='alert alert-info'>
                            <p style={{
                                fontSize:"15px",

                            }}>You have selected </p> 
                            <p style={{
                                fontSize:"14px",
                                fontWeight:"bold",
                            }}><span className="text-sky"> {moment(selectedDate).format('dddd, MMMM DD, YYYY')}</span> by
                            <span className="text-sky"> {moment(selectedTime, 'h:mm a').format('h:mm a')}</span></p>
                        </div>)}

            </div>



           

        </div>

        <br/>
        
            <div className='text-center'>
            {showBtn ?  <button  type="submit" className='btn py-2 next'>Next to Continue</button> : <div></div>}
            {/* <button type="submit" className='btn py-2'style={{
                background:"#D07750",
                color:"white",
                borderRadius:"30px",
                width:"40%",
                fontSize:"18px",
                margin:"auto",
                fontWeight:"600"
                
            }}>Next to Continue</button> */}
            </div>

            </form>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
                
<br/>
<br/>
        

        </div>

        
     );
}

export default Home ;
