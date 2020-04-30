// change innerText of button 
// fetch get with a filter that only selects good dogs 
//display dogs on div 
// turning button off will display div 
const allDogsUrl = "http://localhost:3000/pups/"
let div = document.getElementById("dog-bar")
window.addEventListener("DOMContentLoaded", function(){
    fetch(allDogsUrl)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
document.addEventListener("click", function(e){
    if(e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
    }
    else if(e.target.id === "good-dog-filter"){
        if(e.target.innerText === "Filter good dogs: ON"){
        e.target.innerText = "Filter good dogs: OFF"
        fetch(allDogsUrl)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
        }
    }// ends if
    else if(e.target.className === "span"){
    let dogId = e.target.dataset.id
    fetch(`${allDogsUrl}/${dogId}`)
    .then(resp => resp.json())
    .then(dog => listDog(dog))
    }//ends if
    else if(e.target.className === "button"){
        let data 
        if(e.target.innerText === "Good Dog!"){
            data = {isGoodDog: false}
            e.target.innerText = "Bad Dog!"
        }
        else{
        data = {isGoodDog: true}
        e.target.innerText ="Good Dog!"
    }
        let dogId = e.target.dataset.id
        fetch(`${allDogsUrl}/${dogId}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }) // ends fetch
    } //ends else if
})// ends document event listener
}) // ends DOM
function renderDogs(dogs){
    let div = document.getElementById("dog-bar")
    dogs.forEach(dog => {
        let span = document.createElement("span")
        span.setAttribute("data-id", dog.id)
        span.className = "span"
        span.innerText = dog.name
        div.append(span)
    })
}//render dogs 
function listDog(dog){
    let div = document.getElementById("dog-info")
    div.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    `
    let button = document.createElement("button")
    button.dataset.id = dog.id
    button.className = "button"
    if(dog.isGoodDog){
        button.innerText = "Good Dog!"
}
    else{button.innerText = "Bad Dog!"}
    div.append(button)
    }//ends list dogs function