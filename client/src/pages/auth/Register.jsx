import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

function AuthRegister() {

  const initialState = {
    userName : '' ,
    email : '',
    password : ''
  }

  const [formData, setFormData] = useState(initialState) ;

  function onSubmit() {

  }

  return ( 
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
        <p>Already have and account?
        <Link className="font-medium ml-1 text-primary hover:underline" to='/auth/login'>Login</Link>
        </p>
      </div>

      <CommonForm 
      formControls={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />

    </div>
   );
}

export default AuthRegister;