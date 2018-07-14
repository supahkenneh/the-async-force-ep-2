'use strict'
const requestButton = document.getElementById("requestResourceButton");
const input = document.getElementById('resourceId');
const selector = document.getElementById('resourceType');
const contentContainer = document.getElementById('contentContainer');

const contentDiv = document.createElement('div');
contentDiv.id = 'bio';
contentContainer.appendChild(contentDiv);

const requestedName = document.createElement('h2');
requestedName.id = 'name';
contentDiv.appendChild(requestedName);

const requestedAttribute = document.createElement('p');
requestedAttribute.id = 'gender-terrain-manufactuerer';
contentDiv.appendChild(requestedAttribute);

const requestedMisc = document.createElement('p');
requestedMisc.id = 'species-population-starshipclass';
contentDiv.appendChild(requestedMisc);

const requestedFilmList = document.createElement('ul');
requestedFilmList.id = 'appearances';
contentDiv.appendChild(requestedFilmList);

requestButton.addEventListener('click', function(){
  
  if (selector.value === 'people'){
    const getPersonInfo = new XMLHttpRequest();
    getPersonInfo.open('GET', "https://swapi.co/api/people/" + input.value +'/');
    getPersonInfo.send();
    
    getPersonInfo.addEventListener('load', function(){
      const parsedPerson = JSON.parse(this.responseText);
      
      const getSpecies = new XMLHttpRequest();
      getSpecies.open('GET', parsedPerson.species[0]);
      getSpecies.send();
      getSpecies.addEventListener('load', function(){
        const parsedSpecies = JSON.parse(this.responseText);
        
        requestedName.innerHTML = 'Name: ' + parsedPerson.name;
        requestedAttribute.innerHTML = 'Gender: ' + parsedPerson.gender;
        requestedMisc.innerHTML = 'Species: ' + parsedSpecies.name;
        requestedFilmList.innerHTML = '';
      })
    });

  } else if (selector.value === 'planets'){
    const getPlanetInfo = new XMLHttpRequest();
    getPlanetInfo.open('GET', "https://swapi.co/api/planets/" + input.value + '/');
    getPlanetInfo.send();

    getPlanetInfo.addEventListener('load', function() {
      const parsedPlanet = JSON.parse(this.responseText);

      
      for (let i = 0; i < parsedPlanet.films.length; i++){
        const getFilmAppearances = new XMLHttpRequest();
        getFilmAppearances.open('GET', parsedPlanet.films[i]);
        getFilmAppearances.send();
        
        getFilmAppearances.addEventListener('load', function(){
          const parsedFilms = JSON.parse(this.responseText);
          
          const createList = document.createElement('li');
          requestedFilmList.appendChild(createList);
          createList.innerHTML = parsedFilms.title;
          
          requestedName.innerHTML = 'Name: ' + parsedPlanet.name;
          requestedAttribute.innerHTML = 'Terrain: ' + parsedPlanet.terrain;
          requestedMisc.innerHTML = 'Population: ' + parsedPlanet.population;
        })
      }
      requestedFilmList.innerHTML = '';
    })

  } else if (selector.value === 'starships'){
    const getStarshipInfo = new XMLHttpRequest();
    getStarshipInfo.open('GET', 'https://swapi.co/api/starships/' + input.value + '/');
    getStarshipInfo.send();

    getStarshipInfo.addEventListener('load', function(){
      const parsedStarship = JSON.parse(this.responseText);
      
      for (let i = 0 ; i < parsedStarship.films.length; i++){
        const getFilmAppearances = new XMLHttpRequest();
        getFilmAppearances.open('GET', parsedStarship.films[i])
        getFilmAppearances.send();

        getFilmAppearances.addEventListener('load', function(){
          const parsedFilms = JSON.parse(this.responseText);
          
          const createList = document.createElement('li');
          requestedFilmList.appendChild(createList);
          createList.innerHTML = parsedFilms.title;
          
          requestedName.innerHTML = 'Name: ' + parsedStarship.name;
          requestedAttribute.innerHTML = 'Manufacturer: ' + parsedStarship.manufacturer;
          requestedMisc.innerHTML = 'Starship Class: ' + parsedStarship.starship_class;
        })

        }
        requestedFilmList.innerHTML = '';
    })
  }
});