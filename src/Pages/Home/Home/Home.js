import React, { useState } from 'react';
import InputForm from '../InputForm/InputForm';
import LoginForm from '../LoginForm/LoginForm';
const Home = () => {
  const [loginUser, setLoginUser] = useState({})
  const [productsCollection, setProductsCollection] = useState(JSON.parse(localStorage.getItem('products')) || [])    
    
    return (
        <div>
            {
                loginUser.userId ? <InputForm productsCollection={productsCollection} setProductsCollection={setProductsCollection}></InputForm> : <LoginForm setLoginUser={setLoginUser}></LoginForm>
            }
        </div>
    );
};

export default Home;




//  {/* <Select placeholder='please select a company' options={options} /> */}
//                     {/* <select {...register("company")}>
//                     <option disabled selected value>Please Select a Company Name </option>
//                         <option value="square">Square</option>
//                         <option value="beximco">Beximco</option>
//                         <option value="radiant">Radiant</option>
//                         <option value="nuvista">nuvista</option>
//                         <option value="aci">aci</option>
//                         <option value="healthcare">Healthcare</option>
//                         <option value="reneta">Reneta</option>
//                         <option value="ziska">Ziska</option>
//                         <option value="opsonin">Opsonin</option>
//                         <option value="incepta">Incepta</option>
//                         <option value="skf">Sk+f</option>
//                         <option value="drug">Drug</option>
//                         <option value="unihealth">Uni Health</option>
//                         <option value="foreign">Foreign</option>
//                         <option value="aristo">Aristo</option>
//                         <option value="pacifiq">Pacifiq</option>
//                         <option value="popular">Popular</option>
//                         <option value="ibnsina">Ibn Sina</option>
//                         <option value="sun">sun</option>
//                         <option value="sanofi">sanofi</option>
//                         <option value="injection">Injection</option>
//                         <option value="surgical">Surgical</option>
//                         <option value="diaper">Diaper & etc</option>
//                         <option value="whitehorse">White Horse</option>
//                         <option value="eyedrops">Eye Drops</option>
//                         <option value="orion">Orion</option>
//                         <option value="foodsupliment">food sup, cream, shampoo</option>
//                         <option value="jmi">Jmi</option>
//                         <option value="general">general</option>
//                         <option value="becon">Becon</option>
//                         <option value="others">All Others</option> */}

//         {/* <Controller as={Input} name="HelloWorld" control={control} defaultValue="" />
//       <Controller as={InputField} name="AntdInput" control={control} defaultValue="" /> */}
//       {/* </select> */}