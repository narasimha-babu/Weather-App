//jshint esversion:6

const express = require('express');
const https = require('https');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

    
app.get("/", function(req, res){
     res.sendFile(__dirname + "/index.html");
    

    // res.send("Server is Up and Running.")
})





app.post("/", function(req, res){
    const apiKey = "b5f9e69e59d01e204c8c760c408bee84"
    const query = req.body.CityName;
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+ apiKey +"&units="+units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(d){
            const weatherData = JSON.parse(d);
            const dat = JSON.stringify(weatherData);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            res.write("<p>Weather Description is "+des +"</p>")
            res.write("<h1>The Temperature in"+ query+ " is " + temp +  "</h1>");
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon+"@2x.png"
            res.write("<img src=" +imgUrl + ">")

            res.send();
            

        })
    })
})









app.listen(port, function(){
    console.log("server started in port 3000");
})