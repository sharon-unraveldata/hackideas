import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './../SignIn.scss';
import { useHistory ,Link } from "react-router-dom";
const { REACT_APP_API_URL }  = process.env;


function SignInBox() {

  let history = useHistory();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isValidUser, setIsValidUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit = data => {
    if(!isLoading) {
      setLoading(true)
      axios({
        url:`${REACT_APP_API_URL}/employees/${data.employeeId}`,
        method:'GET'
      }).then(res=>{
        if(res.data.id && res.data.name) {
          setIsValidUser(true)
          localStorage.setItem('user', res.data.name);
          history.push('/home');
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
         Sign In
         {
           !isValidUser && <span className="text-danger float-end">Invalid user</span>
         }
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input type="text" 
              className={`form-control ${errors.employeeId && 'is-invalid'}`}  
              placeholder="Employee Id" 
              {...register('employeeId', { required: true })}
            />
            { errors.employeeId && <span className="text-danger">Employee Id is required</span> }
          </div>
          
        </div>
        <div className="card-footer d-flex justify-content-end">
            <Link to="/signup" className="pe-2">No Id Register Here?</Link>
            <button type="submit" className="btn btn-success">{ isLoading ? 'Sign In...' : 'Sign In'} </button>
        </div>
      </form>
	 </div>
	)
}

export default SignInBox;