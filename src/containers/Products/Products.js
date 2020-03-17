import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export class Products extends Component {
    render() {
        return (
            <div className="row">
                <p>I am Products</p>
            </div>
        )
    }
}
const mapStatetoProps = state =>{
    return{

    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Products);
