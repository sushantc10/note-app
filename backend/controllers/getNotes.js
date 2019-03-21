const handleNotesGet = (req,res,postgres)=>{
	const { id } = req.params;
	let found = false;
	postgres.select('*').from('notes').where("user_id","=",id)
		.then(notes =>{
			if(notes.length)
				res.send(notes);
			else
				res.send({notfound:1});
		})
		.catch(err => res.status(400).json('error getting data'));
}

module.exports = {
	handleNotesGet:handleNotesGet
}