import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './buyer.css'




class Buyerlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    async buyersLogin() {
        let { username, password } = this.state;
        let res = await axios.post('/buyers/login', { username, password });
        this.setState({ username: '', password: '' });
        if (res.data.loggedIn){
            console.log (this.props.history)
            this.props.history.push('/buyersListings');
        }
        else {
            alert('Invalid Username/Password')
        }
    }

    handleUsername(text) {
        this.setState({ username: text })
    }

    handlePassword(value) {
        this.setState({ password: value });
    }

    render() {
        return (
            <div className='buyer'>

                <p>Username: <input onChange={(e) => this.handleUsername(e.target.value)} placeholder='Username' tpye='text'></input></p>
                <p>Password: <input onChange={(e) => this.handlePassword(e.target.value)} placeholder='Password' type='Password'></input></p>


                <button className='buyerLogin' onClick={() => this.buyersLogin()}>Login</button>
                <div className='signupGuest'>
                    <Link to='/buyersignup'><button className='buyerSignup'>Buyer Signup</button></Link>


                    <Link to='/guest'><button className='guest'>Continue as Guest </button></Link>
                </div>
                {/* <button  onClick={<Link to='/favts'/>}>Continue as Guest</button> */}
            </div>
        )
    }
}

export default Buyerlogin;