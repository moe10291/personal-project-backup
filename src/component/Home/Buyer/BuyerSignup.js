import React, { Component } from 'react';
import axios from 'axios';

class BuyerSignup extends Component{
    constructor(){
        super();
        this.state={
            first_name:'',
            last_name: '',
            email:'',
            username:'',
            password:'',
            phone:'',

        }
    }

    async buyerSignup(){
        let{first_name, last_name, email, username, password, phone}= this.state
        let res= await axios.post('/buyers/signup', {first_name, last_name, email, username, password, phone});
        this.setState({first_name:"", last_name:"", email:"", username:"", password:""})
         (res.data)
        if(!res.data.loggedIn){
            this.props.history.push('/')
        }
    }

    handleFirstName(text){
        this.setState({first_name:text})
    }
    handleLastName(text){
        this.setState({last_name:text})
    }
    handleEmail(text){
        this.setState({email:text})
    }
    handlePassword(text){
        this.setState({password:text})
    }

    handleUsername(text){
        this.setState({username:text})
    }
    handlePhone(value){
        this.setState({phone:value})
    }

    render(){
        return(
            <div>
                <h1>BUYER Sign up</h1>
                <p>First Name: <input onChange={(e)=>this.handleFirstName(e.target.value)} placeholder='First Name'></input></p>
                <p>Last Name: <input onChange={(e)=>this.handleLastName(e.target.value)} placeholder='Last Name'></input></p>
                <p>Email: <input onChange={(e)=>this.handleEmail(e.target.value)} placeholder='email@email.com'></input></p>
                <p>Username: <input onChange={(e)=>this.handleUsername(e.target.value)} placeholder='Username'></input></p>
                <p>Password: <input onChange={(e)=>this.handlePassword(e.target.value)} placeholder='Password' type="password"></input></p>
                <p>Phone: <input onChange={(e)=>this.handlePhone(e.target.value)} placeholder='Phone/Cell' type="Value"></input></p>

                <button onClick={()=>this.buyerSignup()}>Submit</button>
               
            </div>
        )
    }
}

export default BuyerSignup;