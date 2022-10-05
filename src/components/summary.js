import React from 'react';
import background from './heroo.png';
import summaryimage from './mainlogo.png';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Summary() {
    const [phone, setValue] = useState()

    let location = useLocation();
    const navigate = useNavigate();
   

    const [date,setDate]=useState("");
    const [time,setTime ]=useState("");
    const [type ,  setType]=useState("");

    const [title , setTitle] = useState("");
    const [user_firstname, setUserFirstname] = useState("");
    const [user_lastname , setUserLastname] = useState("");
    const [email , setEmail] = useState("");
    const [gender , setGender] = useState("");
    const [dob , setDob] = useState("");
    

   

    React.useEffect(()=>{
       
       if(location.state != null){
        setDate(moment(location.state.date).format('YYYY-MM-DD'));
        setTime(location.state.time);
        setType(location.state.type);
      
       }
        
        
        
    },[])


    function onSubmit(e){
        e.preventDefault()
        
        axios.post(`https://admin.asknello.com/api/owc/appointment`,{
                        
            //request body here to complete appointment process
        date : moment(date).format('dddd, MMMM DD, YYYY'),
        time : time,
        
        caretype : type,
            title:title,
            user_firstname:user_firstname,
            user_lastname:user_lastname,
            email:email,
            gender:gender,
            dob:dob,
            phone:phone
          
        

            }).then(response => {
                console.log(response)
                // hideLoader();
                if(response.data.status == "success"){
                    toast.success('Appointment Booked Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });

                        navigate('/complete',{state:{type:type, date:moment(date).format('dddd, MMMM DD, YYYY'), time: moment(time, 'h:mm a').format('h:mm a'), email: email, ref:response.data.data.ref}});
          
                     
                   
                }

     
            }).catch(error => {
                toast.error('An error occured, try again later', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })

        
    }
    


    return (  
            <>
            {location.state == null ? <Navigate to="/" /> : <div className='container'>
        <div className=' mt-4 hero'>

            <div className='col-md-10 m-auto hero herobg card py-5 px-5' style={{
                background: `url(${background})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"auto",
                backgroundPosition:" right center"

            }}>

            <h2 className='heroheading'>Book an Appointment </h2>
            <p className='heropara'>Kindly fillup the form to complete the booking process.</p>

            </div>
        
    </div>

            

           

            
            <div className='row mt-5 py-4'>
                <div className='col-md-5'>
                <h4 className='summaryheading'>Appointment Summary </h4>

<p className='summarypara'>Specialist Type : {type}</p>
<p className='summarypara'>Date : {moment(date).format('dddd, MMMM DD, YYYY')}</p>
<p className='summarypara'>Time : {time} (WAT) </p>
<p className='summarypara'> Duration : 30 mins</p>

                   
<div className='text-left'>

<img src={summaryimage} className='summaryimage' alt="myimage"/>
</div>
                </div>

                <div className='formdiv col-md-7'>
                    
                <form onSubmit={onSubmit}>

                <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
               <select onChange={function(e){
                   setTitle(e.target.value);
               }} className='form-control'required>
                   <option value="">select preferred title</option>
                     <option value="Mr">Mr</option>
                     <option value="Mrs">Mrs</option>
                     <option value="Miss">Miss</option>
                     <option value="Dr">Dr</option>
                     <option value="Prof">Prof</option>
                     <option value="Hon">Hon</option>
               </select>
                </div>
            </div>


            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Firstname</label>
                <div class="col-sm-10">
                <input onChange={function(e){
                    setUserFirstname(e.target.value)
                }} className='firstname' type="text"  class="form-control"required />
                </div>
            </div>

          

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Lastname</label>
                <div class="col-sm-10">
                <input onChange={function(e){
                    setUserLastname(e.target.value)
                }} className='lastname' type="text"  class="form-control"required />
                </div>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input onChange={function(e){
                    setEmail(e.target.value)
                }} className='email' type="email"  class="form-control"required />
                </div>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Date of Birth</label>
                <div class="col-sm-10">
                <input onChange={function(e){
                    setDob(e.target.value)
                }} className='dob' type="date"max="<?= date('Y-m-d'); ?>" class="form-control"required />
                </div>
            </div>



            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Phone</label>
                <div class="col-sm-10">
                <PhoneInput className='form-control'
                placeholder="Enter phone number"
                value={phone}
                defaultCountry="NG"
                onChange={setValue} required/>

                </div>
            </div>

            <div class="form-group row">
                <label for="" class="col-sm-2 col-form-label">Gender</label>
                <div class="col-sm-10">
                         <div class="form-check form-check-inline">
                
                <input onChange={function(e){
                    setGender(e.target.value)
                }} class="form-check-input " type="radio" name="gender" id="inlineRadio1" value="Male" required/>
                <label class="form-check-label" for="inlineRadio1">Male</label>
                </div>
                <div class="form-check form-check-inline">
                <input onChange={function(e){
                    setGender(e.target.value)
                }}  class="form-check-input " type="radio" name="gender" id="inlineRadio2" value="Female" required/>
                <label class="form-check-label" for="inlineRadio2">Female</label>
                </div>
                </div>
            </div>

            <br/>
            
            <div className='text-center'>
        <button type="submit" className='btn py-2'style={{
            background:"#D07750",
            color:"white",
            borderRadius:"30px",
            width:"40%",
            fontSize:"18px",
            margin:"auto",
            fontWeight:"600"
            
        }}>Comfirm Booking</button>
        </div>

           
            
            </form>

                </div>

            </div>

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
    </div>}
         
</>
       
    );
}

export default Summary;