const handleSignin = (postgres,bcrypt)=>(req,res)=>{

	const {email, password } = req.body;
	if(!email || !password ){
		return res.status(400).json('Incorrect form submission... ');
	}
	postgres.select('email','hash').from('users')
		.where('email','=',email)
		.then(data => {			
			const isValid = bcrypt.compareSync(password,data[0].hash);
			//console.log(isValid);
			if(isValid){
				return postgres.select('id').from('users')
						.where('email','=',email)
						.then(user => {
							if(user.length)
								res.send(user[0]);
							else
								res.status(400).json('user not found');
						})
						.catch(err => res.status(400).json('Unable to get user...'))
			}else
				res.status(400).json('Wrong credentials');
		})
		.catch(err => res.status(400).json(err))
}

module.exports ={
	handleSignin:handleSignin
}