
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
    
    

      function handleClick(argument) {
        console.log("Clicked with argument:", argument);
        // Your code logic using the argument goes here
        let apiUrlByCountry = `https://restcountries.com/v3.1/name/${argument}?fullText=true`
        fetch(apiUrlByCountry)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then (data => {
          
          let UpdateContainer = document.getElementById('update-container')
          UpdateContainer.textContent = "";
          let container = document.createElement('div');
          container.classList.add("container","mt-50");
          let button = document.createElement('button');
          button.textContent = "Back";
          button.className = "back-button";
          let countryInfo = document.createElement('div');
          countryInfo.classList.add("country-info","mt-50");
          let imgHolder = document.createElement('div')
          imgHolder.className = "img-holder";
          let img = document.createElement('img');
          let imgSrc = data[0].flags.png;
          img.setAttribute('src',imgSrc);
          let countryDescription = document.createElement('div');
          countryDescription.className = "country-description";
          let countryTitle = document.createElement('h1');
          countryTitle.textContent = data[0].name.common;
          let countryDetails = document.createElement('div');
          countryDetails.classList.add('country-details','mt-50');
          let col1 = document.createElement('div');
          col1.className = "col-1";
          let p1 = document.createElement('p');
          p1.textContent = `Native name: ${data[0].name.common}`;
          let p2 = document.createElement('p');
          p2.textContent = `Population: ${data[0].population}`;
          let p3 = document.createElement('p');
          p3.textContent = `Region: ${data[0].region}`;
          let p4 = document.createElement('p');
          if(data[0].subregion){
            p4.textContent = `Sub-Region: ${data[0].subregion}`;
          }else {
            p4.textContent = `Sub-Region: none`;
          }
          
          let p5 = document.createElement('p');
          if (data[0].capital){
            p5.textContent = `Capital: ${data[0].capital}`;
          }else {
            p5.textContent = `Capital: none`;
          }
          
          let col2 = document.createElement('div');
          col2.className = "col-2";
          let p6 = document.createElement('p');
          p6.textContent = `Top level Domain: ${data[0].tld[0]}`;
          let p7 = document.createElement('p');
  
          // get currency Object
          let currencyObj = data[0].currencies;
          
          // get currency Key
          let NationalCurrency = "";
          for ( const keys in currencyObj){
            if(currencyObj.hasOwnProperty(keys)){
              NationalCurrency = currencyObj[keys];
            }
          }

         if(NationalCurrency.name ) {
          p7.textContent = `Currency: ${NationalCurrency.name} `;
         }else {
          p7.textContent = `Currency: none `;
         }
          
          
          let p8 = document.createElement('p');
  
          //get language Object from  API call
          let langObj = data[0].languages;
        
          // Declare variable to hold all langauges during itteration
          let allLanguages = "";
  
          //Itterate the through the langauge Obj
          for (const key in langObj) {
            if (langObj.hasOwnProperty(key)) {
              const value = langObj[key];
              allLanguages += `${value}, `
            }
          }
  
        // remove the last comma from All 
         allLanguages = allLanguages.slice(0, -2);
         p8.textContent = `language: ${allLanguages}`;
          
          
          let borderCountries = document.createElement('div');
          borderCountries.classList.add("border-countries","mt-50");
          let p9 = document.createElement('p');
          p9.textContent = "Border Countries";
          borderCountries.appendChild(p9)
          ;
  
          //get border array
          const borderArr = data[0].borders;
          console.log(borderArr);
          if(borderArr) {
            for( let i = 0; i < borderArr.length; i++){
              const a1 = document.createElement('a');
              a1.textContent = borderArr[i];
              borderCountries.appendChild(a1)
            }
          }else {
            const a1 = document.createElement('a');
            a1.textContent = "no border";
            borderCountries.appendChild(a1)
          }
          
  
          //add p6, p7, p8 to col2
          col2.appendChild(p6)
          col2.appendChild(p7)
          col2.appendChild(p8)
  
          //add p1, p2, p3, p4, p5 to col1
          col1.appendChild(p1)
          col1.appendChild(p2)
          col1.appendChild(p3)
          col1.appendChild(p4)
          col1.appendChild(p5)
  
          //add col1, col2 to countryDetails
          countryDetails.appendChild(col1)
          countryDetails.appendChild(col2)
  
          //add countryTitle to countryDescription
          countryDescription.appendChild(countryTitle);
  
          //add countrydetails to countryDescription
          countryDescription.appendChild(countryDetails);
  
          //add BorderCountries to countryDescription
          countryDescription.appendChild(borderCountries);
  
  
          //add image to imgHolder
          imgHolder.appendChild(img);
  
          //add imgHolder and countryDescription to countryInfo
          countryInfo.appendChild(imgHolder)
          countryInfo.appendChild(countryDescription)
  
          //add button, countryInfo and country Description to container
          container.appendChild(button);
          container.appendChild(countryInfo);
          container.appendChild(countryInfo);
          UpdateContainer.appendChild(container);
  
          //button functionality relaods the page
          button.addEventListener('click',() => {
            location.reload();
          })
  
   })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        })
      }

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
        if(country.capital){
          p3.textContent = `Capital: ${country.capital}`;
        }else {
          p3.textContent = `Capital: none`;
        }
        
        card.appendChild(img)
        card.appendChild(h3)
        card.appendChild(p1)
        card.appendChild(p2)
        card.appendChild(p3)
        countryDiv.appendChild(card)
        flagsContainer.appendChild(countryDiv);
        countryDiv.addEventListener('click',function(){
          handleClick(country.name.common)
        })

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
    
    function handleClick(argument) {
      console.log("Clicked with argument:", argument);
      // Your code logic using the argument goes here
      let apiUrlByCountry = `https://restcountries.com/v3.1/name/${argument}?fullText=true`
      fetch(apiUrlByCountry)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then (data => {
        
        let UpdateContainer = document.getElementById('update-container')
        UpdateContainer.textContent = "";
        let container = document.createElement('div');
        container.classList.add("container","mt-50");
        let button = document.createElement('button');
        button.textContent = "Back";
        button.className = "back-button";
        let countryInfo = document.createElement('div');
        countryInfo.classList.add("country-info","mt-50");
        let imgHolder = document.createElement('div')
        imgHolder.className = "img-holder";
        let img = document.createElement('img');
        let imgSrc = data[0].flags.png;
        img.setAttribute('src',imgSrc);
        let countryDescription = document.createElement('div');
        countryDescription.className = "country-description";
        let countryTitle = document.createElement('h1');
        countryTitle.textContent = data[0].name.common;
        let countryDetails = document.createElement('div');
        countryDetails.classList.add('country-details','mt-50');
        let col1 = document.createElement('div');
        col1.className = "col-1";
        let p1 = document.createElement('p');
        p1.textContent = `Native name: ${data[0].name.common}`;
        let p2 = document.createElement('p');
        p2.textContent = `Population: ${data[0].population}`;
        let p3 = document.createElement('p');
        p3.textContent = `Region: ${data[0].region}`;
        let p4 = document.createElement('p');
        if(data[0].subregion){
          p4.textContent = `Sub-Region: ${data[0].subregion}`;
        }else {
          p4.textContent = `Sub-Region: none`;
        }
        
        let p5 = document.createElement('p');
        if(data[0].capital !== undefined){
          p5.textContent = `Capital: ${data[0].capital}`;
        }else {
          p5.textContent = `Capital: none`;
        }
        
        let col2 = document.createElement('div');
        col2.className = "col-2";
        let p6 = document.createElement('p');
        p6.textContent = `Top level Domain: ${data[0].tld[0]}`;
        let p7 = document.createElement('p');

        // get currency Object
        let currencyObj = data[0].currencies;
        
        // get currency Key
        let NationalCurrency = "";
        for ( const keys in currencyObj){
          if(currencyObj.hasOwnProperty(keys)){
            NationalCurrency = currencyObj[keys];
          }
        }
       
        if(NationalCurrency.name){
          p7.textContent = `Currency: ${NationalCurrency.name} `;
        }else{
          p7.textContent = `Currency: none `;
        }
        
        
        let p8 = document.createElement('p');

        //get language Object from  API call
        let langObj = data[0].languages;
      
        // Declare variable to hold all langauges during itteration
        let allLanguages = "";

        //Itterate the through the langauge Obj
        for (const key in langObj) {
          if (langObj.hasOwnProperty(key)) {
            const value = langObj[key];
            allLanguages += `${value}, `
          }
        }

      // remove the last comma from All 
       allLanguages = allLanguages.slice(0, -2);
       p8.textContent = `language: ${allLanguages}`;
        
        
        let borderCountries = document.createElement('div');
        borderCountries.classList.add("border-countries","mt-50");
        let p9 = document.createElement('p');
        p9.textContent = "Border Countries";
        borderCountries.appendChild(p9)
        ;

        //get border array
        const borderArr = data[0].borders;
        console.log(borderArr);
        if(borderArr) {
          for( let i = 0; i < borderArr.length; i++){
            const a1 = document.createElement('a');
            a1.textContent = borderArr[i];
            borderCountries.appendChild(a1)
          }
        }else {
          const a1 = document.createElement('a');
          a1.textContent = "no border";
          borderCountries.appendChild(a1)
        }
        

        //add p6, p7, p8 to col2
        col2.appendChild(p6)
        col2.appendChild(p7)
        col2.appendChild(p8)

        //add p1, p2, p3, p4, p5 to col1
        col1.appendChild(p1)
        col1.appendChild(p2)
        col1.appendChild(p3)
        col1.appendChild(p4)
        col1.appendChild(p5)

        //add col1, col2 to countryDetails
        countryDetails.appendChild(col1)
        countryDetails.appendChild(col2)

        //add countryTitle to countryDescription
        countryDescription.appendChild(countryTitle);

        //add countrydetails to countryDescription
        countryDescription.appendChild(countryDetails);

        //add BorderCountries to countryDescription
        countryDescription.appendChild(borderCountries);


        //add image to imgHolder
        imgHolder.appendChild(img);

        //add imgHolder and countryDescription to countryInfo
        countryInfo.appendChild(imgHolder)
        countryInfo.appendChild(countryDescription)

        //add button, countryInfo and country Description to container
        container.appendChild(button);
        container.appendChild(countryInfo);
        container.appendChild(countryInfo);
        UpdateContainer.appendChild(container);

        //button functionality relaods the page
        button.addEventListener('click',() => {
          location.reload();
        })

 })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      })
    }


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
      if(country.capital){
        p3.textContent = `Capital: ${country.capital}`;
      }else{
        p3.textContent = `Capital: none`;
      }
      
      card.appendChild(img)
      card.appendChild(h3)
      card.appendChild(p1)
      card.appendChild(p2)
      card.appendChild(p3)
      countryDiv.appendChild(card)
      flagsContainer.appendChild(countryDiv)

      //Add event listener to the countries.
      countryDiv.addEventListener('click',function(){
        handleClick(country.name.common)
      })

    }


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
