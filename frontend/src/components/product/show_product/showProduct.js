import React, { useState, useRef, useEffect, useContext, useReducer } from "react";
import { Alert, Badge, Button, Container, FormSelect, Spinner } from "react-bootstrap";
import { AuthContext } from "../../../context/auth_context";
import { requestHeaders } from "../../../global_data";
import { productApiRoute, userApiRoute } from "../../../routes";
import useHttp from "../../../shared/hooks/useHttp";
import Title from "../../../shared/title";
import ProductCard from "./product_card";

import "./show_product.css";

const FILTER_OPTIONS = {
  default: "No Filter",
  loc: "Location",
  cat: "Category",
  price: "Best Fit",
};

const initFilters={

  loc:null,
  cat:null,
  price:null,

};

function reducer(state,action)
{

  let newState={...state};

    for(let key in action)
        newState[key]=action[key];


      return newState;
}


export default function ShowProduct({ showAll }) {
  const auth = useContext(AuthContext);

  const prodsURL = "myprods";
  let idx = 0;

  const [loading, error, done, sendRequest] = useHttp();

  const [filters,dispatch] = useReducer(reducer,initFilters);

  const [price,setPrice] = useState(30);

    

  let [prods, setProds] = useState([]);

async function filterProducts(e)
{
  try{

    const filterData={};

    for (const [key,val] of Object.entries(filters))
        {
          if(val)
            filterData[key]=val;
        }

    const res= await sendRequest(`${productApiRoute}/query`,'POST',requestHeaders,filterData); 

    const filterProds = res.product;
    
    setProds(filterProds);
  }

  catch(err){}
}

async function bestFit(e)
{
  try
  {
   const res = await sendRequest(`${productApiRoute}/bestfit?price=${price}`,'GET',requestHeaders); 

   const bestFitProd  = [res.product];

   setProds(bestFitProd);
  }
  catch(err){}
}

  useEffect(() => {
    const getProds = async () => {
   

      let prod_list = [];

      if (showAll) {
        try {
          const data = await sendRequest(
            `${productApiRoute}/all`,
            "GET",
            requestHeaders,
            null
          );
          prod_list = data.product;
        } catch (err) {
          console.warn(err);
        }
      } else {
        try {
          const data = await sendRequest(
            `${userApiRoute}/${auth.uid}`,
            "GET",
            requestHeaders,
            null
          );
          prod_list = data.product;
        } catch (err) {}
      }

      setProds(prod_list);
    };

    getProds();
  }, [showAll, sendRequest]);

  return (
    <React.Fragment>
      <Title title={showAll ? "Browse Nearby Products" : "My Products"} />

      <br/>

      <Container className="row filter">

      <select className="col mx-2" value={filters.cat} onChange={(e)=>{

        dispatch({cat:e.target.value});
      }}>

      <option className="dropdown-item w-5" value="">
            {" "}
            Choose Category{" "}
          </option>
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




      <select className="col mx-2" value={filters.loc} onChange={(e)=>{

dispatch({loc:e.target.value});
}}>

<option className="dropdown-item" value="">
    {" "}
    Choose Location{" "}
  </option>
<option className="dropdown-item" value="USA">
    {" "}
   USA{" "}
  </option>
  <option className="dropdown-item" value="UK">
    {" "}
    UK{" "}
  </option>
  <option className="dropdown-item" value="Finland">
    {" "}
    Finland{" "}
  </option>

</select>

<div className="col mx-2">
  <div className="row">

  <label className="col label-off" for="price">Price</label>
  <input id="price" className="col mx-1" value={filters.price} type="number" onChange={(e)=>{dispatch({price:e.target.value})}}/>
  
  </div>
  </div>

  <Button className="col mx-3" onClick={filterProducts}>Filter</Button>


  <div className="price-input">
  <label>Best Fit Price</label>
  <input value={price} type="number"  onChange={(e)=>{
    setPrice(e.target.value);
  }}></input>

  <Button variant="secondary" className="mx-1 btn-off" onClick={bestFit} >Find Best Fit</Button>
  </div>
      </Container>

      <br />
    

      {loading && <Spinner variant="info" />}

      {error.length > 0 && <Alert variant="danger">{error}</Alert>}

      <div className="grid">
        {prods.length === 0 && !loading ? (
          <h5 className="text-muted">No products yet</h5>
        ) : (
          prods.map(function (item) {
            return (
              <ProductCard key={item.id} {...{ ...item, showAll, setProds }} />
            );
          })
        )}
      </div>
      </React.Fragment>
  );
}
