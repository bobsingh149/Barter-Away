import React, { useState, useRef, useEffect, useContext } from "react";
import { Badge, Container } from "react-bootstrap";
import { AuthContext } from "../../../context/auth_context";
import Title from "../../../shared/title";
import ProductCard from "./product_card";

import "./show_product.css";
export default function ShowProduct({ showAll }) {
  const auth = useContext(AuthContext);

  const prodsURL = "myprods";
  let idx = 0;

  let [prods, setProds] = useState([]);

  useEffect(() => {
    console.log("Fetching the Products");

    let prod_list = JSON.parse(localStorage.getItem(prodsURL));

    if (showAll) {
      setProds(prod_list);
    } else {
      const myProdList = prod_list.filter((prod) => {
        return prod.creator === auth.username;
      });

      setProds(myProdList);
    }
  }, [showAll]);

  return (
    <Container>
      <Title title={showAll ? "Browse Nearby Products" : "My Products"} />
      <br />
      <div className="grid">
        {prods.length === 0 ? (
          <h5 className="text-muted">You don't have any products yet</h5>
        ) : (
          prods.map(function (item) {
            return (
              <ProductCard key={item.id} {...{ ...item, showAll, setProds }} />
            );
          })
        )}
      </div>
    </Container>
  );
}
