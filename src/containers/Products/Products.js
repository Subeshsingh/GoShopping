import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';
import Product from './product/Product';
import './Products.css';

export class Products extends Component {
    
    componentDidMount(){
        this.props.onFetchProducts();
    }
      
    render() {
      //  console.log(this.props.products);
        let products=null;
        if(this.props.loading){
            products=<Spinner/>;
        }
        if(this.props.error){
            products=<p>{this.props.error}</p>
        }
        products= this.props.products.map(product => ( 
                  <Product
                    key={product.id}
                    name={product.productname}
                    description={product.productdesc}
                    price={product.productprice}/>
                ));
        // console.log(this.props.products[0]);
        return (
            <div className="row">
                {products}
            </div>
        );
    }
}
const mapStatetoProps = state =>{
    return{
        products: state.prod.products,
        loading: (state.prod.loading===true),
        error: state.prod.error,
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        onFetchProducts: ()=>dispatch(actions.fetchProducts())
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Products);
