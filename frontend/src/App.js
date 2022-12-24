
import React, { useCallback, useState } from "react";
import User from "./components/user/user";
import Task from "./components/task/task";
import Card from "./components/cards/card";
import Navbar from "./shared/compoents/navbar";


import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProductForm from "./components/product/product_form/product_form";
import ShowProduct from "./components/product/show_product/showProduct";
import ProductCard from "./components/product/show_product/product_card";
import { AuthContext } from "./context/auth_context";
import './App.css'
import Auth from "./components/auth/auth";

import { userDataCache } from "./global_data";
import { info } from "./context/auth_context";
import { editProdRoute } from "./routes";

const data = ['tea', 'coffee', 'water']

function App() {

  let title = "Bobby";

  const [isLogin, setIsLogin] = useState(info ?true :false);
  const [username, setUsername] = useState(info ?info.username :null);
  const [uid,setUid] = useState(info? info.uid :null);



  const login = useCallback((userInfo) => {

    console.log('Logging in');
    setIsLogin(true);
    setUsername(userInfo.username);
    localStorage.setItem(userDataCache,JSON.stringify(userInfo));
   
  },[]);

  const logout = useCallback(  () => {

    console.log('Logging out');
    setIsLogin(false);
    setUsername(null);
    localStorage.removeItem(userDataCache);

  },[]);
  

  let myRoutes=null;

  if(isLogin)
  {
      myRoutes= <Routes>

      <Route path="/" exact element={<Auth />} />


      <Route path="/auth" exact element={<Auth />} />


      <Route path="/prodForm" exact element={<ProductForm edit={false} />} />

      



      <Route path="/showProd" exact element={<ShowProduct showAll={true} />} />

      <Route path="/showMyProd" exact element={<ShowProduct showAll={false} />} />

      
      <Route path={editProdRoute} element={<ProductForm edit={true} />} />

      <Route path="/:id/task" exact element={<Task />} />

    

      <Route path="*" element={<Navigate to="/showProd"/>}/>

    </Routes>
  }
  else
  {
    myRoutes= <Routes>

    <Route path="/" exact element={<Auth />} />


    <Route path="/auth" exact element={<Auth />} />

    <Route path="/showProd" exact element={<ShowProduct showAll={true} />}/>

    <Route path="/:id/task" exact element={<Task />} />


    <Route path="*" element={<Navigate to="/" replace/>}/>

  </Routes>
  }

  return (

    <AuthContext.Provider value={{isLogin: isLogin, login: login, logout: logout, username: username }}>
     
       
        <Router>
        <Navbar />
        <hr/>

          {myRoutes}
         

        </Router>


      


    </AuthContext.Provider>






  );
}

export default App;
