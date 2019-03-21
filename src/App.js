import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Register from './Components/register';
import Notes from './Components/Notes';
import NotesHeader from './Components/NotesHeader';
import {dummy} from './test';

import * as actionTypes from './actions';
class App extends Component {
  constructor(){
    super();
      this.state={
      login:0,
      register:0,
      authenticated:0,
      //data:dummy,
      data:"",
      status:"",
      email:"",
      password:"",
      id:0
    }
  } 
 
  resetNotes=(note)=>{
    console.log('reset')
   this.setState({data:note})
  }

  resetId=(id)=>{
    console.log('reset')
   this.setState({id:id,authenticated:1,data:""})
  }


  formValidate = (event)=>{
   // console.log(this.email.value,this.password.value)
      fetch('https://protected-garden-44691.herokuapp.com/signin',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email:this.email.value, 
            password:this.password.value
          })
        })
      .then(response =>{

        if(response.status!=200){
          this.setState({status:<div class="alert alert-danger"  role="alert">
            Please enter valid credentails..
          </div>})
        }else{
           this.setState({status:""});
           this.setState({authenticated:1})
           response.json()
           .then(resp=>{
              this.setState({id:resp.id})
              fetch('https://protected-garden-44691.herokuapp.com/getNotes/'+this.state.id,{
                method:'get',
                headers:{'Content-Type':'application/json'}
              })
             .then(response=>response.json())
             .then(notes=>this.setState({data:notes}))
            })
           //console.log(response);
           //this.setState({id:response.id})
           
        }
      } )
      .then(response=>console.log(response));



    event.preventDefault();
    console.log('Login');
  }
  formToggle = (event)=>{
    event.preventDefault();    
      this.setState({register:!this.state.register});    
  }


  render() {
    if(this.state.authenticated){
     return(
      <div>
        <Notes resetNotes={this.resetNotes} user_id={this.state.id} data={this.state.data}/>
      </div>
    )
    }else{
      if(this.state.register){
        return(<Register resetId={this.resetId} formToggle={this.formToggle} formSave={this.formSave}/>)
      }else{
        return (
        <div className="container">          
          <h3>Login Form</h3>
          {this.state.status}
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email"  ref={(input) => this.email = input}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password"   ref={(input) => this.password = input} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group">
            <button type="submit" onClick = {this.formValidate} className="btn btn-primary">Login</button>
            &nbsp;
            <button type="submit" onClick = {this.formToggle} className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      );
      }
    }
      
    
  }
}


export default App;
