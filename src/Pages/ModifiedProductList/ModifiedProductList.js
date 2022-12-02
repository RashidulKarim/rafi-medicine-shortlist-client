import React, { useEffect, useState } from 'react';

const ModifiedProductList = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        fetch('https://rafi-medicine-server.onrender.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])
    
  
    
    const totalProduct = products.filter(pd => pd.status !== "complete")
    console.log(totalProduct)
    return (
        <div style={{textAlign:'center', marginTop: '15px'}}>
            <h3>Rafi Medicine Center</h3>
            <p style={{textAlign:'center'}}>Total Products: {totalProduct.length}</p>
            <div className='flex1'>
            {
                totalProduct.map(pd => <div style={{border:'1px solid gray', borderRadius:'5px', marginBottom:'10px', padding:'10px 5px'}} className='item' key={pd._id}><span>{pd.name}---{pd.quantity}   </span></div>)
            }
            </div>
           
        </div>
    );
};

export default ModifiedProductList;