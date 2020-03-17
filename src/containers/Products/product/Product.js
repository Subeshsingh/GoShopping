import React from 'react'
import './Product.css';
import {connect} from 'react-redux';

const Product = () => {
    return (    
            <div className="column">
                <div className="card">
                    <h3>Card 1</h3>
                    <p>Some text</p>
                    <p>Some text</p>
                </div>
           </div>
    );
}

export default Product
