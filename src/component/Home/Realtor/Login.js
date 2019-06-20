import React, { Component } from "react";
import axios from "axios";
import Nav from "../../../Nav";
import BuyerLogin from '../Buyer/BuyerLogin'
import './Login.css';
// import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""

    };
  }

  async login() {
    let { username, password } = this.state;
    let res = await axios.post("/auth/login", { username, password });
    //  (res);
    this.setState({ username: "", password: "" });
    if (res.data.loggedIn) {
      //  (res.data)
      this.props.history.push("/listing");
    }
    else {
      alert('Please Enter Correct Username/Password')
    }
  }

  handleUsername(text) {
    this.setState({ username: text });
  }

  handlePassword(value) {
    this.setState({ password: value });
  }

  render() {
    return (
      <div className='container'>
        
        <div className='realtor'>

          <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
          
          <h2>REALTOR LOGIN</h2>
          <p>
            Username:{" "}
            <input
              className="username-input"
              onChange={e => this.handleUsername(e.target.value)}
              placeholder="Username"
            />
          </p>
          <p>
             Password:{" "}
            <input
            className="password-input"
              onChange={e => this.handlePassword(e.target.value)}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
          </p>

          <button className='login' onClick={() => this.login()}>Login</button>
          <p>Not Registered ?</p>
          <Nav />
         
          <h2>BUYER LOGIN </h2>
          <BuyerLogin history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default Login;
