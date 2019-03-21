import React, { Component } from 'react';
import AddNote from './AddNote';
import EditNote from './EditNote';

class Notes extends Component {
	constructor(){
		super();
		this.editNote = this.editNote.bind(this);
		this.state={
			noteid:0,
			noteTitle:"",
			noteDesc:"",
			user_id:0
		}
		//this.loadNotes = this.loadNotes.bind(this);
	}

	loadNotes = (key)=>{
		console.log('loadNotes');
		const notesArray = this.props.data[key];
		let notes = [];	
		//console.log();
		if(this.props.data[key] && this.props.data.length>0){
			return (<tr>
				<td>{notesArray.id}</td>
				<td>{notesArray.title}</td>
				<td>{notesArray.description}</td>
				<td><input data-toggle="modal" data-target="#exampleModalEdit"  className="btn btn-success" key={key} type="button" onClick={()=>this.editNote(notesArray.id)} className="btn btn-primary" value="Edit"/>&nbsp;<button onClick={()=>this.delNote(notesArray.id)} className="btn btn-danger">Delete</button></td>
			</tr>);
		}else{
			return (<tr>
						<td colspan="4" align="center">No notes available</td>
					</tr>);
		}			
	}

	editNote = (key)=>{
		//console.log(11);
	  const filterNote = this.props.data;
	  let note = filterNote.filter(function(v,i){
	  	return v.id === key;
	  });
	  console.log(note[0]);
	  this.setState({user_id:note[0].user_id,noteid:note[0].id,noteTitle:note[0].title,noteDesc:note[0].description});
	}
	
	delNote = (key)=>{
		if (window.confirm("Are you sure ?")) {
			fetch('https://protected-garden-44691.herokuapp.com/deleteNotes/'+key,{
				method:'delete',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
				user_id:this.props.user_id
				})
			}).then(response=>response.json())
			.then(note=>this.props.resetNotes(note))
		}		
	}
	render(){
		let noData="";
		//console.log(this.props.data)
		console.log(noData);
		return(
			<div className="container">
			<br/>
			<EditNote resetNotes={this.props.resetNotes} user_id={this.state.user_id} noteDesc={this.state.noteDesc} noteTitle={this.state.noteTitle} noteId = {this.state.noteid}/>
			<button data-toggle="modal" data-target="#exampleModalCenter"  className="btn btn-success">Add Note</button>
			<br/>
			<AddNote resetNotes={this.props.resetNotes} user_id={this.props.user_id}/>
			<table className="table table-condensed">
				<thead>
					<th>Sr No.</th>
					<th>Title</th>
					<th>Description</th>
					<th>Action</th>
				</thead>
				<tbody>
				{
					Object.keys(this.props.data).map(this.loadNotes)
				}
				</tbody>
			</table>
			</div>
			)
	}
}

export default Notes;