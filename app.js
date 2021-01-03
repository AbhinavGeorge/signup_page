const express = require("express")

const bodyParser = require('body-parser')

const app = express()

const https = require("https")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false}))

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
	const email = req.body.email
	const fname = req.body.firstName
	const lname = req.body.lastName
	const data ={
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_feilds: {
					FNAME: fname,
					LNAME: lname
				}
			}
		]
	}
	const jsonData = JSON.stringify(data)
	const url = "https://us7.api.mailchimp.com/3.0/lists/43e7a9e70d"
	const options = {
		method: "POST",
		auth: "abhinav:95f5aab500f8fd75e7cd88e2965e1929-us7"
	}
	const request = https.request(url, options, function(response){
		if(response.statusCode == 200){
			res.sendFile(__dirname + "/success.html")
		}else{
			res.sendFile(__dirname + "/failure.html")
		}
		response.on("data", function(data){
			console.log(JSON.parse(data))
		})
	})
	request.write(jsonData)
	request.end()
})

app.listen(process.env.PORT || 3000, function(){
	console.log("listening in port 3000")
})

//api key
//95f5aab500f8fd75e7cd88e2965e1929-us7
//
//app id
//43e7a9e70d
