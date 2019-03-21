const handleDeletenotes = (req,res,postgres)=>{
	const {title,description,user_id} = req.body;
	const { id } = req.params;
	let found = false;
	postgres('notes').where("id","=",id).del()
		.then(notes =>{
				postgres.select('*').from('notes').where("user_id","=",user_id)
				.then(notes =>{
					if(notes.length)
						res.send(notes);
					else
						res.send({notfound:1});
				})

		})
		.catch(err => res.status(400).json('Unable to delete'+err));
}

module.exports = {
	handleDeletenotes:handleDeletenotes
}