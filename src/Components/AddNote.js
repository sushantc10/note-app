import React, { Component } from 'react';

class AddNote extends Component {

  saveNote = ()=>{
    console.log(this.props);
    fetch('https://protected-garden-44691.herokuapp.com/saveNotes/'+this.props.user_id,{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            title:this.title.value, 
            description:this.description.value
          })
        })
        .then(response=>response.json())
        .then(resp=>this.props.resetNotes(resp))
        .then(this.projectForm.reset())
  }
  render(){
    return(
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add new note</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form ref={(input)=>this.projectForm = input}>
            <div class="modal-body">

              <div className="form-group">
                <label for="title">Title</label>
                <input type="title" ref={(input) => this.title = input} className="form-control" id="titleinput" aria-describedby="titleHelp" required placeholder="Enter Title"/>
              </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Description</label>
                 <textarea type="description" ref={(input) => this.description = input} className="form-control" id="descriptioninput" required placeholder="Enter Description"></textarea>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="close" data-dismiss="modal" onClick={this.saveNote} class="btn btn-primary">Save changes</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      )
  }
}

export default AddNote;



