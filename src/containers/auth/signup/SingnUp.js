import React, { Component } from 'react';
import {connect} from 'react-redux';

import Input from '../../../components/UI/input/Input';
import './SignUp.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/spinner/Spinner';


export class SignUp extends Component {
    state={
        auth:{
            email:{
                elementType: 'input',
                label:'Email :',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter email'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true,
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                label:'Password :',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter Password',
                },
                value:'',
                validation:{
                    required: true,
                    minLegth: 8,
                },
                valid:false,
                touched:false
            },
            cnfpassword:{
                elementType: 'input',
                label:'Confirm Password :',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter Password again',
                },
                value:'',
                validation:{
                    required: true,
                    confirmpassword: true
                },
                valid:false,
                touched:false
            }
        },
        isValid:false,
    };
//Methods for validating the each input and entire form

    checkValidity = (value,rules) => {
        let isValid= true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid= value.trim() !=='' && isValid;
        }

        if ( rules.minLength ) {
            isValid = (value.length >= rules.minLength) && isValid
        }

        if ( rules.maxLength ) {
            isValid = (value.length <= rules.maxLength) && isValid
        }

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid;
        }
        if(rules.confirmpassword){
            isValid = ( value === this.state.auth.password.value) && isValid;
        }

        return isValid;
    };



    inputChangeHandler = (event,eleName) => {
            const updatedAuth={
                ...this.state.auth,
                [eleName]:{
                    ...this.state.auth[eleName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.auth[eleName].validation),
                    touched: true,
                }
            }
            this.setState({auth: updatedAuth});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        //console.log("Submit");
        this.props.onSignup( this.state.auth.email.value, this.state.auth.password.value , this.state.auth.cnfpassword.value);
    }

    render() {
        const formElementArray=[];
        for(let ele in this.state.auth){
            formElementArray.push({
                id:ele,
                config: this.state.auth[ele]
            });
        }

        let form= formElementArray.map( formElem =>(
            <Input 
                key={formElem.id}
                elementType={formElem.config.elementType}
                label={formElem.config.label}
                elementConfig ={formElem.config.elementConfig}
                invalid={!formElem.config.valid}
                shouldValidate={formElem.config.validation}
                value={formElem.config.value} 
                changed={(event)=> this.inputChangeHandler(event, formElem.id)}/>
        ));
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage=null;

        if(this.props.error){
            errorMessage=<p>{this.props.error}</p>
        }
        return (
            <div className="Auth">
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    <p><strong>Please enter the Details</strong></p>
                    {form}
                    <button className="button">SignUp</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: ( email, password,cnfpassword) => dispatch( actions.signup( email, password,cnfpassword) ),
    };
};


export default connect (mapStateToProps,mapDispatchToProps)(SignUp);
