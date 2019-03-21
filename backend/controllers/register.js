const handleRegister = (req,res,postgres,bcrypt)=>{
	const {email,password} = req.body;
	if(!email || !password){
		return res.status(400).json('Incorrect form submission... ');
	}

	const hash = bcrypt.hashSync(password);
	postgres.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('users')
		.returning('id')
		.then(response =>{return trx('users')				
				.select('*')
				.whereIn('id',[response])
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
	handleRegister: handleRegister
}