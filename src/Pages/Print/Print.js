import React, { useEffect, useState } from 'react';

const Print = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        fetch('https://rafi-medicine-server.onrender.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])
    
    return (
        <div style={{textAlign:'center', marginTop: '15px'}}>
            <h3>Rafi Medicine Center</h3>
            <div className='flex1'>
            {
                products.map(pd => <div className='item' key={pd._id}><span className={pd.status === 'complete' && 'line-through'}>{pd.name}---{pd.quantity}   </span></div>)
            }
            </div>
           
        </div>
    );
};

export default Print;