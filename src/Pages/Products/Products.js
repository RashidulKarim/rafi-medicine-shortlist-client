import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import Table from '../Home/Table/Table';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(JSON.parse(localStorage.getItem("selectProduct")) || []);
  const [quantity, setQuantity] = useState(0)
  const [authorize, setAuthorize] = useState(false)
  const [action, setAction] = useState('delete')

  useEffect(() => {
    fetch('https://rafi-medicine-server.onrender.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }, [])


  const handleManyDelete = () => {
    const confirm = window.confirm(`Do you want to ${action}?`)
    if (confirm === true) {
      if (action === 'delete') {
        fetch(`https://rafi-medicine-server.onrender.com/product`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(selectedProduct)
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              alert('Successfully deleted')
              localStorage.removeItem("selectProduct")
              setSelectedProduct([])
              window.location.reload()
            } else {
              alert("Something wrong, please try again later")
            }
          })
      } else if (action === 'update') {
        const list = selectedProduct.map(product => {
          return {
            _id: product._id,
            status: product.status === 'complete' ? 'pending' : 'complete'
          }
        })
        fetch('https://rafi-medicine-server.onrender.com/update', {
          method: "PUT",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(list)
        })
          .then(res => res.json())
          .then(data => {
            if (data.nModified > 0) {
              alert('Successfully Updated')
              localStorage.removeItem("selectProduct")
              setSelectedProduct([])
              window.location.reload()
            } else {
              alert("Something wrong, please try again later")
            }
          })
      }
    }
  }





  const deleteProduct = (id) => {
    const confirm = window.confirm("Do you want to delete?")
    if (confirm === true) {
      fetch(`https://rafi-medicine-server.onrender.com/product/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            alert('Successfully deleted')
            const rest = products.filter(pd => pd._id !== id)
            setProducts(rest)
          } else {
            alert("Something wrong, please try again later")
          }
        })
    }
  }



  const updateStatus = (id) => {
    const matchPd = products.find(pd => pd._id === id)
    const currentStatus = matchPd.status
    let status = ''
    if (currentStatus === "pending") {
      status = "complete"
    }
    if (currentStatus === "complete") {
      status = "pending"
    }
    const confirm = window.confirm("Do you want to update the status?")
    if (confirm === true) {
      fetch(`https://rafi-medicine-server.onrender.com/product/${id}?status=${status}`, {
        method: "PUT"
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount > 0) {
            alert('Successfully Updated')
            const rest = products.filter(pd => pd._id !== id)
            const match = products.filter(pd => pd._id === id)
            const pd = match[0]
            if (pd.status === "complete") {
              pd['status'] = "pending";
            }
            if (pd.status === "pending") {
              pd['status'] = "complete";
            }
            setProducts([...rest, pd])
          } else {
            alert("Something wrong, please try again later")
          }
        })
    }
  }


  const updateQuantity = (id) => {
    if (quantity > 0) {
      const confirm = window.confirm("Do you want to update the status?")
      if (confirm === true) {
        fetch(`https://rafi-medicine-server.onrender.com/productQuantity/${id}?quantity=${quantity}`, {
          method: "PUT"
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              alert('Successfully Updated')
            } else {
              alert("Something wrong, please try again later")
            }
          })
      }
    }
  }



  const handleSelect = (e, pd) => {
    const lsProduct = JSON.parse(localStorage.getItem("selectProduct"))
    if (lsProduct) {
      if (e.target.checked === true) {
        lsProduct.push(pd)
        localStorage.setItem("selectProduct", JSON.stringify(lsProduct))
        setSelectedProduct(lsProduct)
      }
      else if (e.target.checked === false) {
        const rest = lsProduct.filter(product => product._id !== pd._id)
        localStorage.setItem("selectProduct", JSON.stringify(rest))
        setSelectedProduct(rest)
      }
    }
    else {
      const products = [];
      products.push(pd)
      localStorage.setItem("selectProduct", JSON.stringify(products))
      setSelectedProduct(products)
    }
  }

  // const selectedMap = selectedProduct.map(pd => {
  //   return pd._id
  // })

  // const mapProduct = products.map(pd => {
  //   const foundProduct = selectedProduct.find(product => product._id === pd._id)
  //   if(foundProduct){
  //     pd.checked = true
  //   }
  //   return pd
  // })

  const pd = products?.map(product => {

    return {
      col1: <input type="checkbox" name="" onClick={(e) => handleSelect(e, product)} />,
      col2: product.name,
      col3: product.company,
      col4: <div><button >{product.quantity}</button><input onChange={(e) => setQuantity(e.target.value)} id='status' style={{ width: '50px' }} type='number' /><button onClick={() => { updateQuantity(product._id) }}>Update</button></div>,
      col5: (new Date(product.time)).toString().slice(0, 25),
      col6: <button className={product.status === "complete" ? "done" : "pending"}
        onClick={() => { updateStatus(product._id) }}
      >{product?.status?.toUpperCase()}</button>,
      col7: <button
        onClick={() => { deleteProduct(product._id) }}
        className='delete'
      ><i className="fas fa-trash"></i></button>,
    }
  })
  let data = []
  if (pd.length) {
    data = (pd)
  }

  const options = [
    { value: '', label: 'Please select a company' },
    { value: 'square', label: 'Square' },
    { value: 'beximco', label: 'Beximco' },
    { value: 'radiant', label: 'Radiant' },
    { value: 'nuvista', label: 'nuvista' },
    { value: 'aci', label: 'Aci' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'reneta', label: 'Reneta' },
    { value: 'ziska', label: 'Ziska' },
    { value: 'opsonin', label: 'Opsonin' },
    { value: 'incepta', label: 'Incepta' },
    { value: 'skf', label: 'Skf' },
    { value: 'drug', label: 'Drug' },
    { value: 'unihealth', label: 'Uni Health' },
    { value: 'foreign', label: 'Foreign' },
    { value: 'aristo', label: 'Aristo' },
    { value: 'pacifiq', label: 'Pacifiq' },
    { value: 'popular', label: 'Popular' },
    { value: 'acme', label: 'Acme' },
    { value: 'ibnsina', label: 'Ibn Sina' },
    { value: 'sun', label: 'Sun' },
    { value: 'sanofi', label: 'Sanofi' },
    { value: 'injection', label: 'Injection' },
    { value: 'surgical', label: 'Surgical' },
    { value: 'diaper', label: 'Diaper & etc' },
    { value: 'whitehorse', label: 'White Horse' },
    { value: 'eyedrops', label: 'Eye Drops' },
    { value: 'orion', label: 'Orion' },
    { value: 'foodsupliment', label: 'food sup, cream, shampoo' },
    { value: 'jmi', label: 'Jmi' },
    { value: 'general', label: 'General' },
    { value: 'becon', label: 'Becon' },
    { value: 'others', label: 'All Others' },
    { value: 'emergency', label: 'Emergency' },
  ]
  const handleChange = (e) => {
    fetch(`https://rafi-medicine-server.onrender.com/products/${e.value}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data["userName"] === "rafi@123" && data["password"] === "rafi@321") {
      setAuthorize(true)
    }
  }

  return (
    <div className='overflow'>
      <h2 style={{ textAlign: 'center' }}>All Products</h2>
      <p style={{ textAlign: 'center' }}>Number of added product: {products.length}</p>
      <div className='flex'>
        <Select
          onChange={handleChange}
          className='select'
          options={options}
        />
      </div>
      <p style={{ textAlign: 'center' }}>number of selected Item : {selectedProduct.length}</p>
      <div className='flex'>
        <Select
          className='select'
          options={[
            { value: 'delete', label: 'Delete' },
            { value: 'update', label: 'Update' },
          ]}
          onChange={(e) => {
            setAction(e.value)
          }}
        />
      </div>
      <div className='selected-dev' style={{ overflowY: 'auto'}}>
        <ul className='selected'>
          {
            selectedProduct?.length > 0 && selectedProduct.map((product, i) => <li key={i}>{product.name}</li>)
          }
        </ul>
        {selectedProduct?.length > 0 &&
          <div className='btn-dev'><button className='button' onClick={handleManyDelete}>{action} all</button></div>}
      </div>
      <div className='flex start'>
        {
          authorize === false ? <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("userName")} placeholder="User Name" />
              <input type="password" {...register("password")} placeholder="Password" />
              <input type="submit" />
            </form>
          </div> : <Table data={data}></Table>
        }
      </div>


    </div>
  )
}



export default Products;