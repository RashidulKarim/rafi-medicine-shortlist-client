import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';

const InputForm = ({productsCollection, setProductsCollection}) => {
    const[warning, setWarning] = useState('')
    const  methods  = useForm();
    const {handleSubmit, register, reset, setValue, formState: { errors }} = methods;
    const time = new Date();
    const status = "pending";

    
    const generateID = ()=> {
    return Math.random().toString(36).slice(2)
     }
 
    const onSubmit = data => {
        console.log(data)
        
        const product = {
            rId: generateID(),
            name: data.name,
            company:data.company.value,
            quantity: data.quantity,
            time: time,
            status: status
        }
        productsCollection.push(product)
        const isExist = localStorage.getItem('products')
        const existProduct = JSON.parse(isExist)
        if(isExist){
            existProduct.push(product)
            localStorage.setItem('products', JSON.stringify(existProduct))
            
        }else{
            const products = [];
            products.push(product)
            localStorage.setItem('products', JSON.stringify(products))
        }
        reset()
        setValue("company",'' )
        
    // const productInfo = {
    //       name: data.name,
    //       quantity: data.quantity, 
    //       company: data.company.value,
    //       status: status,
    //       time: time
    //   }
    //   axios.post('https://rafi-medicine-server.onrender.com/addProduct',{
    //       productInfo
    //   })
    //   .then(res =>{          
    //       if(res.data.insertedId){
    //           alert("Product added Successfully")
    //       }
    //   }).catch(err => {
    //       alert("Something wrong. please contact with Rashidul Karim")
    //   }
    //   )
    //   reset()
    //   setValue("company",'' );
  };
const handleSubmitToDB = (e) =>{

    // const productInfo = {
    //           name: data.name,
    //           quantity: data.quantity, 
    //           company: data.company.value,
    //           status: status,
    //           time: time
    //       }   
    e.target.setAttribute('disabled', true)
    setWarning('Please Wait')
        axios.post('https://rafi-medicine-server.onrender.com/addProducts',{
              productsCollection
          })
          .then(res =>{                        
              if(res.data.insertedIds){
                  alert("Products added Successfully")
                  setProductsCollection([])
                  localStorage.removeItem('products')
                  e.target.setAttribute('disabled', false)
                  setWarning('')
              }
          }).catch(err => {
              alert("Something wrong. please contact with Rashidul Karim")
              e.target.setAttribute('disabled', false)
              setWarning('')
          }
          )
}


const options = [
      {value:'', label:'Please select a company'},
      {value:'square', label:'Square'},
      {value:'beximco', label:'Beximco'},
      {value:'radiant', label:'Radiant'},
      {value:'nuvista', label:'nuvista'},
      {value:'aci', label:'Aci'},
      {value:'healthcare', label:'Healthcare'},
      {value:'reneta', label:'Reneta'},
      {value:'ziska', label:'Ziska'},
      {value:'opsonin', label:'Opsonin'},
      {value:'incepta', label:'Incepta'},
      {value:'skf', label:'Skf'},
      {value:'drug', label:'Drug'},
      {value:'unihealth', label:'Uni Health'},
      {value:'foreign', label:'Foreign'},
      {value:'aristo', label:'Aristo'},
      {value:'pacifiq', label:'Pacifiq'},
      {value:'popular', label:'Popular'},
      {value:'acme', label:'Acme'},
      {value:'ibnsina', label:'Ibn Sina'},
      {value:'sun', label:'Sun'},
      {value:'sanofi', label:'Sanofi'},
      {value:'injection', label:'Injection'},
      {value:'surgical', label:'Surgical'},
      {value:'diaper', label:'Diaper & etc'},
      {value:'whitehorse', label:'White Horse'},
      {value:'eyedrops', label:'Eye Drops'},
      {value:'orion', label:'Orion'},
      {value:'foodsupliment', label:'food sup, cream, shampoo'},
      {value:'jmi', label:'Jmi'},
      {value:'general', label:'General'},
      {value:'becon', label:'Becon'},
      {value:'others', label:'All Others'},
      {value:'emergency', label:'Emergency'},
  ]

  const deleteProduct = (id) =>{
    const confirm = window.confirm("Do you want to delete?")
    if(confirm === true){
     const remainingProduct = productsCollection.filter(pd => pd.rId !== id)
     setProductsCollection(remainingProduct)
     localStorage.setItem('products', JSON.stringify(remainingProduct))
    }}
    return (
        <div>
            <h2 style={{textAlign:'center'}}>Add Product</h2>
             <div className='input-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-input' placeholder='Product Name' {...register("name", { required: true})} />
                    {errors.name?.type === 'required' && "Product name is required"}
                    <Controller
                                control={methods.control}
                                rules={{ required: true }}
                                defaultValue=''
                                name="company"
                                render={({
                                    field: { onChange, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                })=> (
                                    
                                    <Select
                                        placeholder='Please select a company'
                                        inputRef={ref}
                                        className='select'
                                        options={options}
                                        value={options.find(c => c.value === value)}
                                        onChange={onChange}
                                    />
                                )}
                    />
                    {errors.company?.type === 'required' && "Company is required"}
                    <input defaultValue={1} className='form-input' type="number" placeholder="Quantity" {...register("quantity", { required: true})} />
                    {errors.quantity?.type === 'required' && "Quantity is required"}
                    
                    <input className='form-submit' type="submit" value='Add to list' />
                </form>
             </div>
             <ul style={{textAlign:'center', listStyle:'none'}}>
           {
                productsCollection.length>0 &&productsCollection.map((pd, i) => <p key={i}><span style={{width:'10px', display:'inline-block'}}>{i+1}.</span><span style={{width:'170px', display:'inline-block'}}>{pd.name}</span><span style={{width:'90px', display:'inline-block'}}>{pd.company}</span><span style={{width:'20px', display:'inline-block'}}>{pd.quantity}</span><button onClick={()=>deleteProduct(pd.rId)}>X</button></p>)
            }
            {
                productsCollection.length>0 && <>
                <input className='button' onClick={handleSubmitToDB}  type="submit" />
                <p style={{textAlign:'center', color:'red'}}>{warning? warning: ''}</p>
                </>
            }
           </ul>
        </div>
    );
};

export default InputForm;