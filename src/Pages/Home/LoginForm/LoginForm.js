import React from 'react';
import { useForm } from "react-hook-form";

const LoginForm = ({setLoginUser}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const name = "Rafi@admin"
    const password = "rafi@21"
    const onSubmit = data => {
        
        const inputName = data.userId;
        const inputPassword = data.password;
        // setLoginUser(data)
        if(name === inputName && password===inputPassword){
            setLoginUser(data)
            alert("Login SuccessFully")
        }else{
            alert('UserId or Password is invalid')
        }
        
    };

    return (
       <div>
           <h2 style={{textAlign:'center'}}>Please Login</h2>
            <div className='input-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='form-input' placeholder='Your UserId' {...register("userId", { required: true})} />
                {errors.userId?.type === 'required' && "UserId is required"}
                <input placeholder='Your Password' className='form-input' type="password" {...register("password", { required: true})} />
                {errors.password?.type === 'required' && "Password is required"}
                <input className='form-submit' type="submit" />
            </form>
        </div>
       </div>
    );
};

export default LoginForm;