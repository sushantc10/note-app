const handleSavenotes = (req,res,postgres,bcrypt)=>{
	const {title,description} = req.body;
	const { id } = req.params;
	let notes;
	if(!title || !description){
		return res.status(400).json('Incorrect form submission... ');
	}
	if(!id){
		return res.status(400).json('Incorrect id. ');
	}

	postgres.transaction(trx => {
		trx.insert({
			user_id:id,
			title:title,
			description:description
		})
		.into('notes')
		.returning('*')
		.then(response =>{return trx('notes')				
				.select('*')
				.whereIn('user_id',[id])
				.then(userdata =>{
					notes=userdata;
					res.json(userdata);
				})})
		.then(trx.commit)
		.catch(trx.rollback)

	})
	
	.catch(err => res.status(400).json('Unable to register...'+err));
		
}

module.exports = {
	handleSavenotes: handleSavenotes
}