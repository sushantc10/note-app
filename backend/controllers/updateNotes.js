const handleUpdatenotes = (req,res,postgres)=>{
	const {title,description,user_id} = req.body;
	const { id } = req.params;
	let found = false;
	postgres('notes').where("id","=",id).update({title:title,description:description})
	.then(response=>{		
		postgres.select('*').from('notes').where("user_id","=",user_id)
		.then(notes =>{
			if(notes.length)
				res.send(notes);
			else
				res.status(400).json('Notes not found');
		})
	})
	.catch(err => res.status(400).json('error getting data'));
}

module.exports = {
	handleUpdatenotes:handleUpdatenotes
}