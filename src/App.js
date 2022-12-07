import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    message: "",
  
    errors: {
      username: false,
      email: false,
      password: false,
      accept: false,
    }
  }

  messages = {
    username_incorrect: "Username cannot consist space!",
    email_incorrect: "Email must consist @!",
    password_incorrect: "Password should be at least 8 letters!",
    accept_incorrect: "Terms must be accepted!",
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if(this.state.username.indexOf(" ") ===  -1) {
      username = true
    }

    if(this.state.email.indexOf("@") >  -1) {
      email = true
    }

    if(this.state.password.length >= 8) {
      password = true
    }

    if(this.state.accept) {
      accept = true
    }

    if(username && email && password && accept) {
      correct = true
    }

    return({
      username,
      email,
      password,
      accept,
      correct,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const validation = this.formValidation()
    if(validation.correct) {
      this.setState({
        username: "",
        email: "",
        password: "",
        accept: false,    
        message: "Form was sucessfully sent.",

        errors: {
          username: false,
          email: false,
          password: false,
          accept: false,
      }}) 
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept,
        }
      })
    }
  }

  handleChange = (e) => {

    const name = e.target.name;
    const type = e.target.type;

    if(type === "text" || type === "email" || type === "password") {
      const value = e.target.value;
      this.setState({
      [name]: value
      })
    } else if(type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      })
    }
  }

  componentDidUpdate() {
    if(this.state.message !== "") {
      setTimeout(() => this.setState({
        message: ""
      }), 3000)
    }
  }

  render() {
    return (
      <div className="App" noValidate>
        <div id="rules">
          <h3>Requirements:</h3>
            <ul>
              <li>Username can not consist space.</li>
              <li>Email must consist "@".</li>
              <li>Password should be at least 8 letters.</li>
              <li>Terms must be accepted.</li>
            </ul>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user">Your username: 
          <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange}></input>
          {this.state.errors.username && <span> {this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">Your email: 
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange}></input>
          {this.state.errors.email && <span> {this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="password">Your password: 
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          {this.state.errors.password && <span> {this.messages.password_incorrect}</span>}
          </label>

          <label htmlFor="accept">
          <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} />I agree on terms.
          {this.state.errors.accept && <span> {this.messages.accept_incorrect}</span>}
          </label>

          <button>Submit</button>

        </form>
        {this.state.message && <h3 id="success">{this.state.message}</h3>}
      </div>
    );
  }
}

export default App;
