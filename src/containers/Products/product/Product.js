import React from 'react'
import './Product.css';
import {Card} from 'react-bootstrap';
import  prodImg from '../../../assests/images/prodImg.jpg' 
const Product = (props) => {
   
    return (    
            <Card>
                <Card.Img variant="top" src={prodImg} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                    <strong>₹​{props.price}</strong>
                    {/* <div class="cardButton btn-success"><a href="#">add</a></div> */}
                  
                </Card.Body>
                <div className="cardButton">
                    <button className="btn-success">Buy Now</button>
                </div>
          </Card>
    );
}

export default Product
