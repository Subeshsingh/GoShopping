import React from 'react'
import './Product.css';

const Product = (props) => {
    console.log(props.name);
    console.log(props.price);
    console.log(props.description);
    return (    
            <div className="column">
                <div className="card">
                    <h3>{props.name}</h3>
                    <p>{props.price}</p>
                    <p>{props.description}</p>
                </div>
           </div>
    );
}

export default Product
