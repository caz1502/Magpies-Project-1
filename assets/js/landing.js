
var jokeProgramming = document.querySelector("#jokeProgramming");
var jokeMisc = document.querySelector("#jokeMisc");
var jokeDark = document.querySelector("#jokeDark");
var jokePun = document.querySelector("#jokePun");
var jokeSpooky = document.querySelector("#jokeSpooky");
var jokeChristmas = document.querySelector("#jokeChristmas");
var jokeAny = document.querySelector("#jokeAny");
var jokeCustom = document.querySelector("#jokeCustom");

var saveBtn = document.querySelector("#save")

saveBtn.addEventListener('click',function(event) {
    event.preventDefault();
    getInfo();
});

jokeAny.addEventListener('click',function(event){
    jokeAny = true
    jokeCustom = false
    jokeProgramming.disabled = true;
    jokeMisc.disabled = true;
    jokePun.disabled = true;
    jokeSpooky.disabled = true;
    jokeChristmas.disabled = true;
    jokeDark.disabled = true;

})

jokeCustom.addEventListener('click',function(event){
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
    var userLocation = document.querySelector("#location").value;

    localStorage.setItem("name ", userName);
    localStorage.setItem("location", userLocation);

        //#SECTION categories
        var anyCategoryName = "any"
        var selectedCategories = [anyCategoryName];
        if(document.getElementById('jokeCustom').checked){
            console.log("ohhhyeahhh");
        } 

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
    

    /*if (jokeProgramming.checked){
        jokeProgramming = true
    } else {
        jokeProgramming = false
    }

    if (jokeMisc.checked){
        jokeMisc = true
    }  else {
        jokeMisc = false
    }


    if (jokeDark.checked){
        jokeDark = true
    }  else {
        jokeDark = false
    }


    if (jokePun.checked){
        jokePun = true
    }  else {
        jokePun = false
    }


    if (jokeSpooky.checked){
        jokeSpooky = true
    }  else {
        jokeSpooky = false
    }


    if (jokeChristmas.checked){
        jokeChristmas = true
    } else {
        jokeChristmas = false
    } 



    var joke = {

        jokeAny: jokeAny,
        jokeCustom: jokeCustom,
        jokeProgramming: jokeProgramming,
        jokeMisc: jokeMisc,
        jokeDark: jokeDark,
        jokePun: jokePun,
        jokeSpooky: jokeSpooky,
        jokeChristmas: jokeChristmas
        } 
        
    

        createProfile(joke,userName)

}

var profilesEl = document.getElementById("profilesContainer")

var createProfile = function(joke,userName) {
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

    localStorage.setItem("joke", JSON.stringify (joke));

    console.log(joke)
}
*/
    createProfile(selectedCategories,userName)


}
var profilesEl = document.getElementById("profilesContainer")

var createProfile = function(selectedCategories,userName) {
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
    var categories = selectedCategories.join()
    console.log(categories)

    localStorage.setItem("selectedCategories", categories);

}