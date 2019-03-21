import React, { Component } from 'react';

class Register extends Component {

formSave = (event)=>{
    event.preventDefault();
    fetch('https://protected-garden-44691.herokuapp.com/register',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email:this.email_reg.value, 
            password:this.pass_reg.value
       })

    }).then(response=>response.json())
    .then(res=>this.props.resetId(res[0].id))
  }

render(){  
  return(
     <div className="container">
     <h3>Register Form</h3>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" required ref={(input) => this.email_reg = input} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" required ref={(input) => this.pass_reg = input} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-group">
            <button type="submit" onClick = {this.formSave} className="btn btn-primary">Submit</button>
             &nbsp;
            <button type="submit" onClick = {this.props.formToggle} className="btn btn-primary">Back to login</button>        
          </div>
        </form>
      </div>
  )
}
	
}

export default Register;