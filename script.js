'use strict';

// const apiKey = 'd367d2b32c6effdcff8407f35c63c1d7';
const apiKey = '7aa887c381f3021f19462c39c14c98ee';
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&appid=' + apiKey + '&q=';
const iconUrl = 'http://openweathermap.org/img/w/';

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

function computeDayFromDatetime(datetime) {
    // Transformation en millisecondes
    let date = new Date(datetime*1000);
    let jour = date.getDay();
    return days[jour];
}

function render(cityName, weatherToShow) {
    
    
    // Affichage de la ville
    let balise_city = document.getElementById("city-title");
    balise_city.innerHTML = cityName;
    
    
    // Création des blocs pour chaque jour

    for(let i = 0 ; i < 5 ; i++){
        let affichage = document.getElementById("render");

        let carte = document.createElement('div');
        carte.className = "col-sm";
        affichage.appendChild(carte);
        
        let jour = document.createElement('h2');
        jour.innerHTML = weatherToShow[i].date;
        carte.appendChild(jour);
        
        let icon = document.createElement('img');
        icon.src = weatherToShow[i].icon;
        carte.appendChild(icon);

        let temp = document.createElement('p');
        temp.innerHTML = "Température : " + weatherToShow[i].temperature + "°C";
        carte.appendChild(temp);
        
        let cloud = document.createElement('p');
        cloud.innerHTML = "Nuages " + weatherToShow[i].clouding + "%";
        carte.appendChild(cloud);
    }

         
}

function searchWeather(event) {
    // Prévention de la soumission du formulaire
    event.preventDefault();

    // Récupération du champ city renseigné par l'utilisateur
    let city = document.getElementById("city").value;
    console.log(city);

    // Appel avec Ajax (XMLHttpRequest)
    // const req = new XMLHttpRequest();
    // req.onreadystatechange = () => {
    //     if (req.readyState === 4) {
    //       if(req.status === 200){
    //             let json_req = JSON.parse(req.responseText);
    //             console.log(json_req.list[1]);
    //             let temps = json_req.list[1].main.temp;
    //             alert("La température pour " + city + " est de " + temps + "°C");

    //       } else {
    //           console.error('error');
    //         }
    //     }
    // }

    let url = apiUrl + city;

    // req.open('GET',url,'false');
    // req.send();

    // Appel avec fetch ES6
    fetch(apiUrl + city)
    .then(data => data.json())
    .then(json => handleData(json))
    .catch(err => {
        console.error(err)
    });
}

function handleData(json) {
    let count = 0;
    let cityName = json.city.name;
    let weatherToShow = [];
    
    // alert('La température à ' + cityName + ' est de ' + temperature);
    
    for(let i = 0 ; i < json.list.length ; i++){
        let object = {};

        if (i % 8 === 0) {
            //Récupérer les données à afficher

            object.date = computeDayFromDatetime(json.list[i].dt);
            object.temperature = Math.round(json.list[i].main.temp); // température arrondi
            object.icon = "http://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png"; //récupérer l'icon
            object.clouding = json.list[i].clouds.all; //récupérer le % de nuages
    
            weatherToShow[count] = object;
            count++;
        } else {

        }

    }

    console.log(weatherToShow);
    render(cityName, weatherToShow);
}