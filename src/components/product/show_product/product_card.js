import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { prodsURL } from "../../../global_data";
import {editProdRoute} from "../../../routes";

export default function ProductCard({
  id,
  title,
  des,
  cat,
  file,
  loc,
  price,
  showAll,
  setProds,
}) {

  const navigate=useNavigate();

  let short_des = des.length > 60 ? des.substring(0, 60) + "..." : des;

  function deleteProd(e) {
    // window.location.reload();


    setProds((prodList) => {
      const newList= prodList.filter((prod) => {
        return prod.id !== id;
      });

      localStorage.removeItem(prodsURL);

      localStorage.setItem(prodsURL,JSON.stringify(newList));

      return newList;
    });
  }


  function editForm(e)
  {
      navigate(`/editProdForm/${id}`);

      
  }
  function getUrl() {
    return `https://source.unsplash.com/random/100×100/?${loc}`;
  }

  function openProduct() {
    console.log(`click ${title}`);
  }
  return (
    <Card className="card" onClick={openProduct}>
      {!showAll && (
        <Card.Header className="text-muted">
          <header className="header-row">
            <span className="">{loc}</span>
            <span className="">{cat}</span>
          </header>
        </Card.Header>
      )}

      <Card.Img variant="top" className="card-img" src={getUrl()} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted">{`$ ${price}`}</Card.Subtitle>
        <br />
        <Card.Text>{short_des}</Card.Text>
      </Card.Body>

      {showAll && (
        <Card.Header className="text-muted">
          <footer className="footer-row">
            <span className="">{loc}</span>
            <span className="">{cat}</span>
          </footer>
        </Card.Header>
      )}

      {!showAll && (
        <Card.Footer>
          <footer className="row">
            <Button className="btn-info col mx-1" onClick={editForm}>EDIT</Button>

            <Button className="btn-danger col mx-1" onClick={deleteProd}>
              DELETE
            </Button>
          </footer>
        </Card.Footer>
      )}
    </Card>
  );
}
