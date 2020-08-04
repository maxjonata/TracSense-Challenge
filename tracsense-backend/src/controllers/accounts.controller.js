const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
	async createAccount(request, response) {
		const { name, username, password} = request.body;
		const id = generateUniqueId();

		await connection('accounts')
		.insert({
			id,
			username,
			password,
			name
		})

		return response.json({message: `registration done! ${id}`});
	},

	async getAuthentication(request, response){
		const { username, password } = request.body;

		const client = await connection('accounts')
							.where('username', username)
							.where('password', password)
							.select('name')
							.first();

		const client_name = (client.name)?client.name:null;

		if(!client_name){
			return response.status(400).json({error:'No Account found with these credentials'});
		}

		var token = jwt.sign({ client_name }, process.env.SECRET);
		return response.json({token:token, auth: true, client_name: client_name});
	},

	testAuthentication(request, response, next) {
		var token = request.headers['x-access-token'];
		if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
		
		jwt.verify(token, process.env.SECRET, function(err, decoded) {
			if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
			request.client_name = decoded.client_name[0].name;
			next();
		});
	}
}