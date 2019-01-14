import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css'

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            first_name:"",
            last_name:"",
            email:"",
            username:"",
            password:"",
            phone:"",
            lisc:""
        }
    }

    async signup(){
        let {username, password, last_name, first_name, phone, email, lisc}= this.state
        let res= await axios.post('/auth/signup', {first_name, last_name, email, username, password, phone, lisc})
        this.setState({username:"", password:"", first_name:"", last_name:"", email:"", lisc:"", phone:""})
        if(res.data.loggedIn){
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
    handlePhone(text){
        this.setState({phone:text})
    }
    handleUsername(text){
        this.setState({username:text})
    }
    handleLisc(text){
        this.setState({lisc: text})
    }
        
    render(){
        return(
            <div className='box1'>
                <div className='form'>
                <h1>SIGN UP </h1> 
                <p>First Name: <input onChange={(e)=>this.handleFirstName(e.target.value)} placeholder='First Name'></input></p>
                <p>Last Name: <input onChange={(e)=>this.handleLastName(e.target.value)} placeholder='Last Name'></input></p>
                <p>Email: <input onChange={(e)=>this.handleEmail(e.target.value)} placeholder='email@email.com'></input></p>
                <p>Username: <input onChange={(e)=>this.handleUsername(e.target.value)} placeholder='Username'></input></p>
                <p>Password: <input onChange={(e)=>this.handlePassword(e.target.value)} placeholder='Password' type="password"></input></p>
                <p>Phone/Cell: <input onChange={(e)=>this.handlePhone(e.target.value)} placeholder='(000) 000-0000'></input></p>
                <p>License Number: <input onChange={(e)=>this.handleLisc(e.target.value)} placeholder='Real Estate Lisc#'></input></p>

                <button className='submit' onClick={()=> this.signup()}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Signup;