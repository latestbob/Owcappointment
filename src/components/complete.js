import React from 'react';
import background from './heroo.png';
import summaryimage from './mainlogo.png';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState} from 'react';
import { useLocation, useNavigate , Link} from 'react-router-dom';
import moment from 'moment';
import { Navigate } from 'react-router-dom';

function Complete() {
    const [phone, setValue] = useState()

    let location = useLocation();
    const navigate = useNavigate();
   

    const [date,setDate]=useState("");
    const [time,setTime ]=useState("");
    const [type ,  setType]=useState("");

    
    

   

    React.useEffect(()=>{
       
       if(location.state != null){
        setDate(location.state.date);
        setTime(location.state.time);
        setType(location.state.type);
      
       }
        
        
        
    },[])

    


    return (  
            
            <div className='container'>
        <div className=' mt-4 hero'>

            <div className='col-md-10 m-auto hero herobg card py-5 px-5' style={{
                background: `url(${background})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"auto",
                backgroundPosition:" right center"

            }}>

            <h2 className='heroheading'>Booking Complete </h2>
            <p className='heropara'>Your have sucessfully booked an appointment.</p>

            </div>

            <br/>

            <br/>

       
        
    </div>

            <div className='row'>
    <div className='col-md-5 m-auto rounded py-3 px-3 '>

            <div className='text-center'><img src={summaryimage} className='summaryimage2' alt="myimage"/></div>

    </div>


            <div className='col-md-7 py-2'>
            <div className='alert alert-success mt-4'>
                    <h4>Booking Summary</h4>

                    <p>You have sucessfully scheduled an appointment on OWC, with a <b>{type}</b> on <b>{date} by <b>{time}</b></b>
                    
                    <br/>

                    Details of your recent appointment has been sent you <b>email</b>
                    </p>

                    


            </div>
            <br/>

            <a href='' className='download2 btn py-2 rounded'>Download Acknowledgement Slip</a> <Link to="/" className='download btn py-2 rounded'>Book Another Appointment</Link>
            </div>

            </div>

 


           

            
    
         
</div>
       
    );
}

export default Complete;