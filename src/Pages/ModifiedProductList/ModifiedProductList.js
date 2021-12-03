import React, { useEffect, useState } from 'react';

const ModifiedProductList = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        fetch('https://rafi-server.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])
    
    // const modifiedProduct = []
    const pds = products.filter(pd => {
        return pd.company === "beximco"  || pd.company ==="aci" || pd.company === "ziska" || pd.company === "opsonin" || pd.company === "incepta" || pd.company === "skf" || pd.company === "drug"|| pd.company === "unihealth" || pd.company === "aristo" || pd.company === "pacifiq" || pd.company === "acme" || pd.company === "ibnsina" || pd.company === "sun" || pd.company === "whitehorse" || pd.company === "orion" || pd.company === "jmi" || pd.company === "general" || pd.company === "becon" || pd.company === "others" || pd.company === "whitehorse"
    })
    console.log(pds)
    
    const totalProduct = pds.filter(pd => pd.status !== "complete")
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