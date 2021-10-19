
var jokeProgramming = document.querySelector("#jokeProgramming");
var jokeMisc = document.querySelector("#jokeMisc");
var jokeDark = document.querySelector("#jokeDark");
var jokePun = document.querySelector("#jokePun");
var jokeSpooky = document.querySelector("#jokeSpooky");
var jokeChristmas = document.querySelector("#jokeChristmas");
var jokeAny = document.querySelector("#jokeAny");
var jokeCustom = document.querySelector("#jokeCustom");

var newsAny = document.querySelector("#newsAny");
var newsCustom = document.querySelector("#newsCustom");
var newsGeneral = document.querySelector("#newsGeneral");
var newsBusiness = document.querySelector("#newsBusiness");
var newsEntertainment = document.querySelector("#newsEntertainment");
var newsHealth = document.querySelector("#newsHealth");
var newsScience = document.querySelector("#newsScience");
var newsSports = document.querySelector("#newsSports");
var newsTechnology = document.querySelector("#newsTechnology");

var globalProfiles = JSON.parse(localStorage.getItem('profiles')) || {}

var saveBtn = document.querySelector("#save")

saveBtn.addEventListener('click',function(event) {
    event.preventDefault();
    getInfo();
});

newsAny.addEventListener('click',function(){
    newsAny = true
    newsCustom = false
    newsGeneral.disabled = true;
    newsBusiness.disabled = true;
    newsEntertainment.disabled = true;
    newsHealth.disabled = true;
    newsScience.disabled = true;
    newsSports.disabled = true;
    newsTechnology.disabled = true;

})

newsCustom.addEventListener('click',function(){
    newsAny = false
    newsCustom = true
    newsGeneral.disabled = false;
    newsBusiness.disabled = false;
    newsEntertainment.disabled = false;
    newsHealth.disabled = false;
    newsScience.disabled = false;
    newsSports.disabled = false;
    newsTechnology.disabled = false;

})

jokeAny.addEventListener('click',function(){
    jokeAny = true
    jokeCustom = false
    jokeProgramming.disabled = true;
    jokeMisc.disabled = true;
    jokePun.disabled = true;
    jokeSpooky.disabled = true;
    jokeChristmas.disabled = true;
    jokeDark.disabled = true;

})

jokeCustom.addEventListener('click',function(){
    jokeAny = false
    jokeCustom = true
    jokeProgramming.disabled = false;
    jokeMisc.disabled = false;
    jokePun.disabled = false;
    jokeSpooky.disabled = false;
    jokeChristmas.disabled = false;
    jokeDark.disabled = false;

})



var getInfo = function (){
    var userName = document.querySelector("#name").value;
    var userCountry = document.querySelector("#country").value;

        //NEWS CATEGORY
        var newsAny = "any"
        var newsAnyCategory = "any"
        var newsSelectedCategories = [newsAny];

        if(document.getElementById("newsCustom").checked)
        {      
            var newsAny = "";
            newsSelectedCategories = [];
            if(document.getElementById("newsGeneral").checked)
            {
                newsSelectedCategories.push("General");
            }
            if(document.getElementById("newsBusiness").checked)
            {
                newsSelectedCategories.push("Business");
            }
            if(document.getElementById("newsEntertainment").checked)
            {
                newsSelectedCategories.push("Entertainment");
            }
            if(document.getElementById("newsHealth").checked)
            {
                newsSelectedCategories.push("Health");
            }
            if(document.getElementById("newsScience").checked)
            {
                newsSelectedCategories.push("Science");
            }
            if(document.getElementById("newsSports").checked)
            {
                newsSelectedCategories.push("Sports");
            }
            if(document.getElementById("newsTechnology").checked)
            {
                newsSelectedCategories.push("Technology");
            }
    
            if(newsSelectedCategories.length == 0)
            {
                newsSelectedCategories.push(newsAnyCategory);
            }
        }
        
        //#Joke SECTION categories
        var anyCategoryName = "any"
        var selectedCategories = [anyCategoryName];

        if(document.getElementById("jokeCustom").checked)
        {      
            var anyCategoryName = "";
            selectedCategories = [];
            if(document.getElementById("jokeProgramming").checked)
            {
                selectedCategories.push("Programming");
            }
            if(document.getElementById("jokeMisc").checked)
            {
                selectedCategories.push("Miscellaneous");
            }
            if(document.getElementById("jokeDark").checked)
            {
                selectedCategories.push("Dark");
            }
            if(document.getElementById("jokePun").checked)
            {
                selectedCategories.push("Pun");
            }
            if(document.getElementById("jokeSpooky").checked)
            {
                selectedCategories.push("Spooky");
            }
            if(document.getElementById("jokeChristmas").checked)
            {
                selectedCategories.push("Christmas");
            }
    
            if(selectedCategories.length == 0)
            {
                selectedCategories.push(anyCategoryName);
            }
        }
    

        var user1 = { 
            'name' : userName,
            'country' : userCountry,
            'joke' : selectedCategories.toString(),
            'news' : newsSelectedCategories.toString()
        }
            globalProfiles[userName] = user1
    
            localStorage.setItem(`profiles`, JSON.stringify(globalProfiles));
    
            profilesEl.innerHTML = "";
            render()
    
}



var profilesEl = document.getElementById("profilesContainer")


var render = function(){


    for (userName in globalProfiles){
        console.log(globalProfiles[userName].name)

        var newButton = document.createElement('button')
        newButton.classList = 'uk-button uk-button-secondary uk-border-rounded uk-box-shadow-small uk-margin-auto-vertical'
        newButton.setAttribute('type','button')
    
        var newA = document.createElement('a')
        newA.setAttribute('href', 'index2.html')
    
        var newSpan = document.createElement('span')
        newSpan.textContent = userName
    
        newButton.appendChild(newSpan)
        newA.appendChild(newButton)
        profilesEl.appendChild(newA)

    }
    console.log(globalProfiles)
}


render()
