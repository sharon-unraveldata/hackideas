import React from 'react';
import SignInBox from './elements/SignInBox';
import './SignIn.scss';

function SignIn() {
	return (
		 <div className="signin-container d-flex align-items-center justify-content-center bg-gray-100">
           <SignInBox/>
		 </div>
	)
}

export default SignIn;