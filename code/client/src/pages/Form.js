import React from 'react'
import "../styles/Form.css"; 
import { useForm } from 'react-hook-form'; 

const Form = () => {
  const { register, handleSubmit, errors} = useForm();
  
  const onSubmit = data => { 
    console.log(data); 
  }
  return (
    <form className='fields' onSubmit={handleSubmit(onSubmit)}>
        
    </form>
  )
}

export default Form