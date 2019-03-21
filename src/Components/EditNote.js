import React, { Component } from 'react';

class EditNote extends Component {

  constructor(props){
    super(props);
    //console.log(props)

    this.state={
      user_id:props.userid,
      noteDesc:props.noteDesc,
      noteTitle:props.noteTitle,
      noteId:props.noteId
    }
  
  }
  updateNote = ()=>{
    console.log("save note");
    fetch('https://protected-garden-44691.herokuapp.com/updateNotes/'+this.state.noteId,{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            title:this.title.value, 
            description:this.description.value,
            user_id:this.props.user_id
          })
        }).then(response=>response.json())
        .then(note=>this.props.resetNotes(note))
  }
  handleOnChange(event) {
    console.log(event.target.value)
    this.setState({
      noteTitle: event.target.value
    })
  }
  handleOnChange1(event) {
    console.log(event.target.value)
    this.setState({
      noteDesc: event.target.value
    })
  }


  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({ user_id:nextProps.userid,
      noteDesc:nextProps.noteDesc,
      noteTitle:nextProps.noteTitle,
      noteId:nextProps.noteId})
  }
  render(){
    return(
      <div class="modal fade" ref={(input)=>this.modalForm = input} id="exampleModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalEdit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form ref={(input)=>this.projectForm = input}>
            <div class="modal-body">

              <div className="form-group">
                <label for="title">Title</label>
                <input type="title" onChange={(event)=>this.handleOnChange(event)} ref={(input) => this.title = input} value={this.state.noteTitle} className="form-control" id="titleinput" aria-describedby="titleHelp" required placeholder="Enter Title"/>
              </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Description</label>
                 <input type="text" onChange={(event) => this.handleOnChange1(event)} type="description" value={this.state.noteDesc} ref={(input) => this.description = input} className="form-control" id="descriptioninput" required placeholder="Enter Description"/>
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="close" data-dismiss="modal" onClick={this.updateNote} class="btn btn-primary">Save changes</button>
            </div>
            </form>
          </div>
        </div>
      </div>
      )
  }
}

export default EditNote;



