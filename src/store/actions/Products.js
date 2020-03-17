import axios from 'axios';
import * as actionTypes from './ActionTypes';

const fetchProductsStart = () => {
    return{
        type: actionTypes.FETCH_PRODUCTS_STRT
    }
}

const fetchProductsSuccess = (products) =>{
    return{
        type:actionTypes.FETCH_PRODUCTS_SUSS,
        products: products
    }
}

const fetchProductsFailed = (error) =>{
    return{
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error:error
    }
}

const fetchProducts =() =>{
    return dispatch=>{
        dispatch(fetchProductsStart());
        let url='http://localhost:8000/products';
        axios.get(url)
        .then(response=>{
            console.log(response.data);
            dispatch(fetchProductsSuccess(response.data));
        })
        .catch(error=>{
            dispatch(fetchProductsFailed(error))
        })
    }
}

export{
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailed,
    fetchProducts
};