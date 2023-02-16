const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

const port =3000;

app.use(bodyParser.urlencoded({ extended : true }));

app.get("/", function(req, res){
	
	res.sendFile(__dirname + "/index.html")
	
});

		

app.post("/", function(req,res){
	const ask = req.body.cityName

	const apiKey = "check my openmap profile🤪";

	const unit = "metric";

	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ask + "&appid=" + apiKey + "&units=" + unit + "#";

	https.get(url, function(response){
			console.log(response.statusCode);
	
			response.on("data", function(data) {
	
			const weatherData = JSON.parse(data)
	
			const temp = weatherData.main.temp
	
			const des = weatherData.weather[0].description
	
			const icon = weatherData.weather[0].icon
	
			const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
	
			res.set("Content-Type", "text/html");
	
			res.write("The weather description in Lagos is " + des + ".");
	
			res.write("<h1>The temperature in " + ask + " is " + temp + " degree celcius.</h1>");
	
			res.write("<img src=" + imgURL + ">")
	
			res.send()

	});

});

})



app.listen(port, function(){
	console.log("We are running on port 3000")
});
