import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function AuthLogin() {

  const initialState = {
    email : '',
    password : ''
  }

  const [formData, setFormData] = useState(initialState) ;
  const dispatch = useDispatch();
  const {toast} = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success) {
        toast({
          title : data?.payload?.message
        })
      } else {
      toast({
          title : data?.payload?.message,
          variant : 'destructive' ,
        })
    }
      console.log(data);
    }) 
  }

  console.log(formData)

  return ( 
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p>Don't have an account
        <Link className="font-medium ml-1 text-primary hover:underline" to='/auth/register'>Register</Link>
        </p>
      </div>

      <CommonForm 
      formControls={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />

    </div>
   );
}

export default AuthLogin;