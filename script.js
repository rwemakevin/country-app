
let flagsContainer = document.getElementById('flags-container')
const selectContinent = document.getElementById('select')
let continent = "";

function resetDOM() {
  console.log("Yay!")
  flagsContainer.textContent = "";
}

function updateDOM() {
  continent = selectContinent.value;
  let apiUrlByContinent = "";
  if (continent === "all") {
    apiUrlByContinent = 'https://restcountries.com/v3.1/all'
  } else {
    apiUrlByContinent = `https://restcountries.com/v3.1/region/${continent}`
  }

  fetch(apiUrlByContinent)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {


      for (const country of data) {
        let countryDiv = document.createElement('div');
        countryDiv.className = 'country';
        let card = document.createElement('div');
        card.className = 'card';
        let img = document.createElement('img')
        img.setAttribute('src', country.flags.png)
        let h3 = document.createElement('h3');
        h3.textContent = country.name.common;
        let p1 = document.createElement('p');
        p1.textContent = `Population: ${country.population}`;
        let p2 = document.createElement('p');
        p2.textContent = `Continent: ${country.continents}`;
        let p3 = document.createElement('p');
        p3.textContent = `Capital: ${country.capital}`;
        card.appendChild(img)
        card.appendChild(h3)
        card.appendChild(p1)
        card.appendChild(p2)
        card.appendChild(p3)
        countryDiv.appendChild(card)
        flagsContainer.appendChild(countryDiv)

      }


    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  console.log(continent)
}


selectContinent.addEventListener('change', function () {
  resetDOM();
  updateDOM();
})

// Replace with the actual API endpoint URL
const apiUrl = 'https://restcountries.com/v3.1/all'

/* 
 By All : 'https://restcountries.com/v3.1/all'
 By continent: 'https://restcountries.com/v3.1/region/africa'

*/


// Make a GET request to the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Handle the data from the API
    // let randomIndex = Math.floor(Math.random() * ((data.length-1) - 0 + 1)) + 0;
    // let randomCountry = data[randomIndex];
    // console.log(randomCountry);
    // img.setAttribute('src', randomCountry.flags.png)
    // h3.innerText = randomCountry.name.common;
    // p1.innerText = `Population: ${randomCountry.population}`;
    // p2.innerText = `Region: ${randomCountry.continents[0]}`;
    // p3.innerText = `Capital: ${randomCountry.capital[0]}`;

    for (const country of data) {
      let countryDiv = document.createElement('div');
      countryDiv.className = 'country';
      let card = document.createElement('div');
      card.className = 'card';
      let img = document.createElement('img')
      img.setAttribute('src', country.flags.png)
      let h3 = document.createElement('h3');
      h3.textContent = country.name.common;
      let p1 = document.createElement('p');
      p1.textContent = `Population: ${country.population}`;
      let p2 = document.createElement('p');
      p2.textContent = `Continent: ${country.continents}`;
      let p3 = document.createElement('p');
      p3.textContent = `Capital: ${country.capital}`;
      card.appendChild(img)
      card.appendChild(h3)
      card.appendChild(p1)
      card.appendChild(p2)
      card.appendChild(p3)
      countryDiv.appendChild(card)
      flagsContainer.appendChild(countryDiv)

    }


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
