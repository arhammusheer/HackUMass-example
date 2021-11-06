const axios = require('axios');
axios.get("http://localhost:3000/users").then(response=>{
	console.log(response.data)
})