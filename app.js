const express = require("express");
const https = require ("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");






});

app.post("/",function(req,res){

console.log();


const query= req.body.cityname;
const appid="4ababb415925896a750a05d50ae21455";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+appid+"&units="+ units ;

  https.get(url,function (response){
    console.log(response.statusCode);


    response.on("data",function(data){

      const weatherData= JSON.parse(data);

      const temp =weatherData.main.temp
      const weatherDescription= weatherData.weather[0].description
      const icon = weatherData.weather[0].icon

      const imageUrl =" http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      res.write("<h1>The Current temperature at " + query+ " is " + temp + "  degree Celsius </h1>");
      res.write(" <p>Current status is " +  weatherDescription+ "</p>");
      res.write("<img src="+ imageUrl + ">");
      res.send();

      console.log(weatherData);
    });
  });


  console.log("Post request received");
});





app.listen(process.env.PORT||3000,function(req,res){
console.log("Server 3000 is active");
 });
