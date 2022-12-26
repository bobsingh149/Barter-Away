import React, { useState, useRef, useEffect, useContext } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { Link, Redirect, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth_context";
import { requestHeaders } from "../../../global_data";
import { productApiRoute } from "../../../routes";
import useHttp from "../../../shared/hooks/useHttp";
import "./product_form.css";

export default function ProductForm({ edit }) {
  const auth = useContext(AuthContext);

  


  const initState = {

    title: '',
    des: '',
    price: 30,
    loc: '',
    cat: 'Electronic',
    img: '',
    creator: auth.uid,
  };

  const [loading, error, done, sendRequest] = useHttp();
  const { prodId } = useParams();

  const prodsURL = "myprods";

  const [state, setState] = useState(initState);

  const navigate = useNavigate();

  useEffect(() => {
    
    if(!edit)
      return;

    const getProd = async ()=>{

      try{
      const data = await sendRequest(`${productApiRoute}/${prodId}`,'GET',requestHeaders,null);

      const loadedProd = data.product;
      let prod={...initState};

      for(let key in prod)
        prod[key]=loadedProd[key];
        

      setState(prod);

      
      }
      catch(err){}
    };
    
    
    getProd();



  }, [edit]);

  function submit(e) {
    e.preventDefault();

    submitForm();
  }

  async function submitForm() {
    let newProdItem = { ...state };

   
    newProdItem.img = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60';


   

    if (edit) {

        try
        {
         const res= await sendRequest(`${productApiRoute}/${prodId}`,'PATCH',requestHeaders,newProdItem);
          console.log('$$$$$$$$$$$$$$$$$$$$',res);
        }

        catch(err){}
    }
     else {
      try {
        await sendRequest(
          `${productApiRoute}/add`,
          "POST",
          requestHeaders,
          newProdItem
        );

        setTimeout(() => {
          navigate('/showMyProd');
        }, 1000);
     

      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    
    <form className="form" onSubmit={submit}>
      <div className="form-group">
        <label className="text-white">Title</label>
        <input
          className="form-control"
          value={state.title}
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.title = e.target.value;
              return curstate;
            });
          }}
          type="text"
        />
        <br />
        <label className="text-white"> Description </label>
        <input
          className="form-control"
          type="text"
          value={state.des}
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.des = e.target.value;
              return curstate;
            });
          }}
        />
        <br />
        <label className="text-white"> Price </label>
        <input
          className="form-control"
          type="number"
          value={state.price}
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.price = e.target.value;
              return curstate;
            });
          }}
        />
        <br />
        <label className="text-white"> Category </label>
        <select
          className="form-control"
          name="Category"
          id="Category"
          value={state.cat}
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.cat = e.target.value;
              return curstate;
            });
          }}
        >
          <option className="dropdown-item" value="Electronic">
            {" "}
            Electronic{" "}
          </option>
          <option className="dropdown-item" value="Books">
            {" "}
            Books{" "}
          </option>
          <option className="dropdown-item" value="Other">
            {" "}
            Other{" "}
          </option>
        </select>
        <br />
        <label className="text-white">Location</label>
        <input
          className="form-control"
          type="text"
          value={state.loc}
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.loc = e.target.value;
              return curstate;
            });
          }}
        />
        <br />
        <label className="text-white">Upload image</label>
        <input
          className="gap-l"
          type="file"
          onChange={(e) => {
            setState((prevState) => {
              const curstate = { ...prevState };
              curstate.img = URL.createObjectURL(e.target.files[0]);
              return curstate;
            });
          }}
        />
        {state.img ? <img src={state.img} /> : <></>}
        <br /> <br />
        <section className="center">
          <button
            className="btn btn-primary px-3 py-1"
            type="submit"
            onClick={submit}
          >
            {" "}
            <span className="text-white">Submit</span>{" "}
          </button>

          {loading ? (
            <Spinner className="mx-5 " animation="border" variant="success" />
          ) : (
            <></>
          )}

          {error.length>0 ? (
            <Alert className="mx-5 px-3 py-3" variant="danger">
              {error}
            </Alert>
          ) : (
            <></>
          )}

          {done ? (
            <Alert className="mx-5 px-3 py-3" variant="success">
             {edit ?'Product loaded successfully'  :'Product added successfully' }
            </Alert>
          ) : (
            <></>
          )}
        </section>
      </div>
    </form>
    
  );
}
