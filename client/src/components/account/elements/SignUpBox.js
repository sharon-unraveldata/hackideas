import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './../SignIn.scss';
import { useHistory, Link } from "react-router-dom";
const { REACT_APP_API_URL }  = process.env;


function SignUpBox() {

  let history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isValidUser, setIsValidUser] = useState(true);
  const [employeeId, setEmployeeId] = useState()
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = data => {
   if(!isLoading) {
      setLoading(true)
      axios({
        url:`${REACT_APP_API_URL}/employees`,
        method:'POST',
        data
      }).then(res=>{
        if(res.data.id && res.data.name) {
          setEmployeeId(res.data.id)
          setIsValidUser(true)
        } else {
            setIsValidUser(false)
        }
      }).catch(()=>{
        setIsValidUser(false)
      }).finally((res)=>{
        setLoading(false)
      })
   }
  }

	return (
	 <div className="card signin-box">
      <form onSubmit={ handleSubmit(onSubmit) } >
        <div className="card-header">
         New Employee
         {
           !isValidUser && <span className="text-danger float-end">Invalid user</span>
         }
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input type="text" 
              className={`form-control ${errors.name && 'is-invalid'}`}  
              placeholder="Employee Name" 
              {...register('name', { required: true })}
            />
            { errors.name && <span className="text-danger">Employee Name is required</span> }
          </div>
          <div className="mb-3">
           {
             employeeId && <b>Employee Id is { employeeId }</b>
           }
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
            <Link to="/" className="pe-2">SignIn?</Link>
            <button type="submit" className="btn btn-success"> {isLoading?'Saving...': 'Save' } </button>
        </div>
      </form>
	 </div>
	)
}

export default SignUpBox;