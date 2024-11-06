const mongoose = require("mongoose");
const connectionString = process.env.DATABASE;
mongoose
	.connect(connectionString).then((res) => {
		console.log("Mongo DB Connected Successfully");
	})
	.catch((err) => {
		console.log("Connection Failed");
		console.log(err);
	});
