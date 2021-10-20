var categories = localStorage.getItem("selectedCategories");
//console.log(categories);

// Time on main Page
var currentDate = moment().format('ddd Do MMM, h:mm: a');
$("#time").text(currentDate);
// console.log(currentDate);

// This is the time slot for the greeting
var myDate = new Date();
var hrs = myDate.getHours();
var greet;
if (hrs < 12)
    greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening';
document.getElementById('daymaker').innerHTML =
    greet;

// Api fetch for i.p location for auto weather - 10k calls perhour
// Get access to the OpenWeather API
var APIkey = "5607e4212a787842dbe27c8181889e83";
// $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=metric&appid=5607e4212a787842dbe27c8181889e83"

$.getJSON("http://ipwhois.app/json/?", function (response) {
    //console.log(JSON.stringify(response.city));   
    //console.log(JSON.stringify(response, null, 2));
    var currentCity = (response.city);
    //console.log(currentCity); 


    // takes ip address location and passes variable into weather search
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=metric&appid=" + APIkey;

    // Make AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (responseData) {
        // console.log(JSON.stringify(responseData.main.temp));
        // console.log(JSON.stringify(responseData, null, 2));
        // console.log(JSON.stringify(responseData.weather));
        var weatherCity = $("#weather");
        weatherCity.text(currentCity + " " + responseData.main.temp);
        weatherCity.append("&deg;C");
        weatherCity.append("<img src='https://openweathermap.org/img/w/" + responseData.weather[0].icon + ".png' alt='" + responseData.weather[0].main + "' />");
   
        // Link to 5 Day forecast
        var a = document.createElement('a');
        var linkText = document.createTextNode("5 Day");
        // console.log(linkText)
        a.appendChild(linkText);
        a.href = "https://caz1502.github.io/Weather-Dashboard/";
        weatherCity.append(a);    
    })
});

// Api Jokes
const jokeText = document.getElementById("joke")
const jokeBtn = document.getElementById("jokeBtn")

generateJokes();
//when you click in the button it will bring a new joke
jokeBtn.addEventListener("click",  generateJokes);

    async function generateJokes() {
    //base URL
    var urlJoke = "https://v2.jokeapi.dev/joke/" + categories;
    //console.log(urlJoke);

    const res = await fetch(urlJoke)
    const data = await res.json();
    //console.log(data);
    if (data.joke == undefined){
        joke = `${data.setup} <br /> ${data.delivery}`
    } else {
        joke = data.joke
    }
    jokeText.innerHTML = joke;

// Api News
//Fetch for news for several catagories from free mediastack subscription limited to 500 api calls
let API_KEY = "";
//http://api.mediastack.com/v1/news?countries=us,in&access_key="+API_KEY+"&categories=
let newsAPI = "http://api.mediastack.com/v1/news?countries=us,in&access_key=8ad5429edbf1d365091033d41df2c7f0"+API_KEY+"&categories=";
let dummyImage = "dummy-image.jpg";

//The first element of the selector is returned
let app = document.querySelector(".app");
let screen = {
	main:app.querySelector(".main-screen"),
	news:app.querySelector(".news-screen")
};

let catagories = ["General","Business","Technology","Entertainment","Health","Science","Sports"];
//console.log(categories);

for(let i=0;i<catagories.length;i++){
	let div = document.createElement("div");
	div.innerText = catagories[i];
	div.addEventListener("click",function(){
		screen.main.querySelector(".catagories .active").classList.remove("active");
		div.classList.add("active");
		fetchCatagoryNews(catagories[i]);
	});
	if(i == 0){
		div.classList.add("active");
		fetchCatagoryNews(catagories[i]);
	}
	screen.main.querySelector(".catagories").appendChild(div);
}

async function fetchCatagoryNews(catagory){
	screen.main.querySelector(".news-list").innerHTML = "";
	try {
		let res = await fetch(newsAPI + catagory.toLowerCase());
		let data = await res.json();
		let news = data.data;

		for(let i=0;i<news.length;i++){
			let div = document.createElement("div");
			div.classList.add("item");
			div.addEventListener("click",function(){
				showFullNews(news[i]);
			});
			div.innerHTML = `
				<div class="thumbnail">
					<img src="${news[i].image || dummyImage}">
				</div>
				<div class="details">
					<h2>${news[i].title}</h2>
					<p>${news[i].description}</p>
				</div>
			`;
			screen.main.querySelector(".news-list").appendChild(div);
		}
	} catch(msg){}
}

function showFullNews(news){
	screen.main.classList.add("hidden");
	screen.news.classList.remove("hidden");

	screen.news.querySelector(".header .title").innerText = news.title;
	screen.news.querySelector(".header .back-btn").addEventListener("click",function(){
		screen.news.classList.add("hidden");		
		screen.main.classList.remove("hidden");
	});
	let newsFrame = screen.news.querySelector("#news-frame");
	newsFrame.src = news.url;
	newsFrame.onload = function(){
	 	try {
      newsFrame.contentWindow.name
    } catch (e) {
     	window.open(news.url, '_blank').focus();
			screen.news.querySelector(".header .back-btn").click(); 
    }
	};
};
    
}
