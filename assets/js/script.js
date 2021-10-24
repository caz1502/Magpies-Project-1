var user = JSON.parse(localStorage.getItem("user"));

var categories = user.joke;

// Time on main Page
var currentDate = moment().format('ddd Do MMM, h:mm a');
$("#time").text(currentDate);

// This is the time slot for the greeting
var myDate = new Date();
var hrs = myDate.getHours();
var greet;
if (hrs < 12)
    greet = 'Good Morning, ' + user.name;
else if (hrs >= 12 && hrs <= 17)
    greet = 'Good Afternoon, ' + user.name;
else if (hrs >= 17 && hrs <= 24)
    greet = 'Good Evening, ' + user.name;
document.getElementById('daymaker').innerHTML =
    greet;

// Api fetch for i.p location for auto weather - 10k calls perhour
// Get access to the OpenWeather API
var APIkey = "5607e4212a787842dbe27c8181889e83";

$.getJSON("https://ipwhois.app/json/?", function (response) {
    var currentCity = (response.city);

    // takes ip address location and passes variable into weather search
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=metric&appid=" + APIkey;

    // Make AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (responseData) {
        var weatherCity = $("#weather");
        weatherCity.text(currentCity + " " + responseData.main.temp);
        weatherCity.append("&deg;C");
        weatherCity.append("<img src='https://openweathermap.org/img/w/" + responseData.weather[0].icon + ".png' alt='" + responseData.weather[0].main + "' />");
   
        // Link to 5 Day forecast
        var a = document.createElement('a');
        var linkText = document.createTextNode("5 Day");

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

var jokeSpan = document.getElementById("joke-span")
jokeSpan.setAttribute("uk-tooltip","title: Showing Categories: " + categories + "; delay: 400")


    async function generateJokes() {
    //base URL
    var urlJoke = "https://v2.jokeapi.dev/joke/" + categories + "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    const res = await fetch(urlJoke)
    const data = await res.json();

    if (data.joke == undefined){
        joke = `${data.setup} <br /> ${data.delivery}`
    } else {
        joke = data.joke
    }
    jokeText.innerHTML = joke;

 
    
}

// NEWS

var newsEl = document.getElementById("news-container");

var newCategories = user.news;
var newsCountry = user.country;

var getNews = function () {
    var newsApi = "https://api.mediastack.com/v1/news?access_key=b4ee083bda9fbe5c973c1deba481b67f&countries="+newsCountry+ "&categories=" + newCategories + "&limit=9"
    console.log(newsApi)
    var newsSpan = document.getElementById("news-span")
    newsSpan.setAttribute("uk-tooltip","title: Showing Categories: " + newCategories + "; delay: 400")

    fetch(newsApi)
      .then(function (response) {
        if (response.ok) {
   
          response.json().then(function (data) {

            console.log(data)
            for (var i=0; i < data.data.length; i++){
                var cardDiv = document.createElement('div')
                cardDiv.setAttribute("class","uk-card uk-card-default uk-card-body uk-text-left uk-text-small news-card")
                var cardTitle = document.createElement('h3')
                cardTitle.setAttribute("class","uk-card-title uk-text-primary uk-text-bold  uk-text-left")
                cardTitle.textContent = data.data[i].title
                var cardUrl = document.createElement('a')
                cardUrl.setAttribute("href",data.data[i].url)
                cardUrl.setAttribute("target","_blank")
                cardUrl.appendChild(cardTitle)
                cardDiv.appendChild(cardUrl)
                var cardImg = document.createElement('img')
                cardImgUrl = data.data[i].image
                    if (cardImgUrl === null){
                        cardImg.setAttribute("style:","display:none")
                    }else{
                    cardImg.setAttribute("src",cardImgUrl)
                    cardUrl.appendChild(cardImg)
                    }
                var cardP = document.createElement('p')
                cardP.textContent = data.data[i].description
                cardDiv.appendChild(cardP)
                newsEl.appendChild(cardDiv)

            }
            var moreNews = document.createElement('a')
            moreNews.innerHTML = "More news"
            moreNews.setAttribute("class","uk-button uk-button-default uk-text-primary uk-text-bold")
            newsEl.appendChild(moreNews)


          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
  };

  getNews();