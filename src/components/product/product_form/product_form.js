import React, { useState, useRef, useEffect, useContext } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, Redirect, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth_context";
import "./product_form.css";

export default function ProductForm({ edit }) {
  const { prodId } = useParams();

  const auth = useContext(AuthContext);

  const prodsURL = "myprods";

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState(null);

  const [isloading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("edit ", edit);

    if (edit) {
      const prodList = JSON.parse(localStorage.getItem(prodsURL));


      console.log('prodlist',prodList);

      console.log('prodID',prodId);
      console.log(prodList[0].id);

      const prod = prodList.find(item => item.id == prodId);

      if(prod){
      setTitle(prod.title);
      setDes(prod.des);
      setPrice(prod.price);
      setLoc(prod.loc);
      setCat(prod.cat);
      setFile(prod.file);
      }
      else
      {
        console.log('Product not found');
      }
    }

  }, [edit]);

  function submit(e) {
    e.preventDefault();

    setLoading(true);

    submitForm();

    setTimeout(() => {
      setLoading(false);
      setDone(true);

      setTimeout(() => {
        setDone(false);

        navigate("/showProd");
      }, 1000);
    }, 1000);
  }

  function submitForm() {


    let prodList = JSON.parse(localStorage.getItem(prodsURL));

    if (prodList == null) {
      prodList = [];
    }

    let newProdItem = {
      id: edit ? prodId : String(prodList.length),
      title,
      des,
      price,
      loc,
      cat,
      file,
      creator: auth.username,
    };

    console.log(newProdItem);

    if (edit) {
      prodList = prodList.filter((item) => item.id !== prodId);
    }

    prodList.push(newProdItem);

    localStorage.setItem(prodsURL, JSON.stringify(prodList));
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-group">
        <label className="text-white">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => {
            setTitle((prev) => e.target.value);
          }}
          type="text"
        />
        <br />
        <label className="text-white"> Description </label>
        <input
          className="form-control"
          type="text"
          value={des}
          onChange={(e) => {
            setDes((prev) => e.target.value);
          }}
        />
        <br />
        <label className="text-white"> Price </label>
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <label className="text-white"> Category </label>
        <select
          className="form-control"
          name="Category"
          id="Category"
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
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
          value={loc}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
        />
        <br />
        <label className="text-white">Upload image</label>
        <input
          className="gap-l"
          type="file"
          onChange={(e) => {
            setFile(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {file ? <img src={file} /> : <></>}
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

          {isloading ? (
            <Spinner className="mx-5 " animation="border" variant="danger" />
          ) : (
            <></>
          )}

          {done ? (
            <Alert className="mx-5 px-3 py-3" variant="success">
              Product added successfully
            </Alert>
          ) : (
            <></>
          )}
        </section>
      </div>
    </form>
  );
}
