const wrapperOutside = document.querySelector(".wrapperOutside");
const firstBox = document.querySelector(".firstBox");
const secondBox = document.querySelector(".secondBox");
const allChild = document.querySelectorAll(".child");
const input = document.querySelector("input");
const searchBar = document.querySelector(".searchBar");
const searchButton = document.querySelector(".searchIcon");
const active = document.querySelector(".active");

//data fetch for each box
let placeName, data, dataArray, tempArray, key;

searchButton.addEventListener("click", function () {
  input.classList.remove("empty");
  //ask for a key
  key = "b318998db8mshc05ceb3cdc0acbap1118c9jsnc2acfdfdf1b3";

  // console.log(input.value)
  placeName = input.value;
  //image clearing out
  active.classList.remove("cloudy", "rainy", "sunny");
  //fetch function to call on click
  const dataFetchFunc = async function () {
    //initialization
    tempArray = [];
    dataArray = [];
    //api call
    const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${placeName}&contentType=json&unitGroup=metric&shortColumnNames=0`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": `${key}`,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      if (placeName === "") {
        input.classList.add("empty");
        return;
      } else {
        //loader on
        input.classList.add("flip");
        //fetch
        const response = await fetch(url, options);
        const data = await response.json();
        let { locations } = data;

        for (let x of Object.values(locations)) {
          for (let y of Object.values(x)) {
            dataArray.push(y);
          }
        }
        console.log(dataArray);
        //finding country
        let stringAddress = dataArray[3].split(",");
        let stringCountry = stringAddress[stringAddress.length - 1];
        console.log(stringCountry);
        let flagCode = stringCountry.slice(1, 3);
        console.log(flagCode);
        //weather of the capital

        dataArray[1].forEach((x) => {
          for (let y of Object.entries(x)) {
            tempArray.push(y);
          }
        });

        console.log(tempArray);

        let icon, icon2;
        if (
          tempArray[24][1].trim().toLowerCase().includes("overcast") ||
          tempArray[24][1].trim().toLowerCase().includes("partiallycloudy")
        ) {
          icon = "🌦️";
          active.classList.add("cloudy");
        } else if (
          tempArray[24][1].trim().toLowerCase().includes("rainy") ||
          tempArray[24][1].trim().toLowerCase().includes("rain") ||
          tempArray[24][1].trim().toLowerCase().includes("rain,overcast")
        ) {
          icon = "⛈️";
          active.classList.add("rainy");
        } else {
          icon = "☀️";

          active.classList.add("sunny");
        }
        if (
          tempArray[51][1].trim().toLowerCase().includes("overcast") ||
          tempArray[51][1].trim().toLowerCase().includes("partiallycloudy")
        ) {
          icon2 = "🌦️";
          active.classList.add("cloudy");
        } else if (
          tempArray[51][1].trim().toLowerCase().includes("rainy") ||
          tempArray[51][1].trim().toLowerCase().includes("rain") ||
          tempArray[51][1].trim().toLowerCase().includes("rain,overcast")
        ) {
          icon2 = "⛈️";
          active.classList.add("rainy");
        } else {
          icon2 = "☀️";

          active.classList.add("sunny");
        }

        //destructuring
        firstBox.innerHTML = `
         <p class="capital">${dataArray[3]}</br></br>
         <img src="https://flagcdn.com/48x36/${flagCode.toLowerCase()}.png" alt="flag">
            </p>
             <p class="weather">Tempertaure  <ion-icon name="thermometer-outline"></ion-icon></br></br><span>${
               tempArray[13][1]
             }°c</span>
             <p class="Description">Description <ion-icon name="book-outline"></ion-icon></br></br>
           <span> ${tempArray[24][1]}${icon}</span>
           </p>
                <p class="pressure">Pressure 🌡</br></br><span> ${
                  tempArray[21][1]
                } mb</span>
           </p>
            <p class="wind">Wind Speed <i class='fas fa-wind'></i> </br></br>
            <span> ${tempArray[16][1]} km/hr</span>

         </p>
      `;
        secondBox.innerHTML = `
       <p class="weather">Tomorrow's Tempertaure </br></br><span>${tempArray[40][1]}°c</span>
        <p class="Description">Description <ion-icon name="book-outline"></ion-icon></br></br>
         <span>${tempArray[51][1]} ${icon2}</span>
           </p>
      `;
        //loader off
        input.classList.remove("flip");
      }
    } catch (error) {
      console.error(error);
    }
  };
  dataFetchFunc();
  input.value = "";
});
//on click
const selfCallFunc = function () {
  allChild.forEach((x) => x.classList.remove("active"));
};

allChild.forEach((x) => {
  x.addEventListener("click", function (e) {
    selfCallFunc();
    console.log("element:", x);
    e.target.classList.add("active");
  });
});
