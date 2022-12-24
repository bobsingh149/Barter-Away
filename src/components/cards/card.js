import React from 'react'

import './card.css'

function Card({title,decription,price})
{

    return( 
        <div className="card box" >
 
        <img src="https://images.unsplash.com/photo-1665466142333-e5c3369c4530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60" className="card-img-top imgbox" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {decription}
          </p>
          <a href="/" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      
      
          
    );
}

export default Card;

