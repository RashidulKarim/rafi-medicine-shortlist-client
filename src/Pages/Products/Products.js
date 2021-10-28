import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Table from '../Home/Table/Table';



const Products = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])


    const deleteProduct = (id) =>{
        const confirm = window.confirm("Do you want to delete?")
        if(confirm === true){
         fetch(`http://localhost:5000/product/${id}`,{
           method: "DELETE"
         })
         .then(res => res.json())
         .then(data => {
           if(data.deletedCount>0){
             alert('Successfully deleted')
             const rest = products.filter(pd => pd._id !== id)
             setProducts(rest)
           }else{
             alert("Something wrong, please try again later")
           }})
        }}
        
    const updateStatus = (id) =>{
        const confirm = window.confirm("Do you want to update the status?")
        if(confirm === true){
         fetch(`http://localhost:5000/product/${id}`,{
           method: "PUT"
         })
         .then(res => res.json())
         .then(data => {             
           if(data.modifiedCount>0){
             alert('Successfully Updated')
             const rest = products.filter(pd => pd._id !== id)
             const match = products.filter(pd => pd._id === id)
             const pd = match[0]
             pd['status'] = "complete";
             console.log(pd);
             setProducts([...rest, pd])
           }else{
             alert("Something wrong, please try again later")
           }})
        }}        
     const pd = products?.map(product =>{
         return{
             col1: product.name,
             col2: product.company,
             col3: product.quantity,
             col4: (new Date(product.time)).toString().slice(0,25),
             col5: <button className={product.status === "complete"? "done": "pending"}
                    onClick={()=>{updateStatus(product._id)}}
                    >{product.status.toUpperCase()}</button>,
             col6: <button 
             onClick={()=>{deleteProduct(product._id)}}
             className='delete'
             ><i className="fas fa-trash"></i></button>,
         }
     } )
     let data =[]
     if(pd.length){
         data = (pd)
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
    const handleChange = (e) =>{
        fetch(`http://localhost:5000/products/${e.value}`)
        .then(res => res.json())
        .then(data => setProducts(data))
    }
    
      return (
        <div className='center-align'>
            <h2 style={{textAlign:'center'}}>All Products</h2>
            <Select
            onChange={handleChange}
             className='select' 
             options={options}
             />
           <Table data ={data}></Table>
        </div>
      )
   }



export default Products;