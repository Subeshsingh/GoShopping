import * as actionTypes from '../actions/ActionTypes';

const initState ={
    products:[],
    loading: false,
    error: null
}

const fetchProductsStart = (state,action) =>{
    return{
        ...state,
        loading: true
    }
}
const fetchProductsSuccess = (state,action) =>{
    return{
        ...state,
        products:action.products,
        loading: false
    }
}
const fetchProductsFailed = (state,action) =>{
    return{
        ...state,
        error: action.error
    }
}

const reducer = ( state=initState, action ) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_STRT: return fetchProductsStart(state,action);
        case actionTypes.FETCH_PRODUCTS_SUSS: return fetchProductsSuccess(state,action);
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFailed(state,action);
        default:
            return state;
    }
}

export default reducer;