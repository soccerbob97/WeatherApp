import axios from 'axios';
import {API_KEY} from "@env"
const geoEncodingResponseLimit = 1;

const getFiveDayForecastFromLocation = (city, stateCode, countryCode, {locationChange}) => {
  let latitudeLongitudeUrl = "";
    if (stateCode.stateCode != 'N/A') {
      latitudeLongitudeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" 
      + `${city.city},${stateCode.stateCode},${countryCode.countryCode}&limit=${geoEncodingResponseLimit}&appid=${API_KEY}`;
    } else {
      latitudeLongitudeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" 
      + `${city.city},${countryCode.countryCode}&limit=${geoEncodingResponseLimit}&appid=${API_KEY}`;
    }
    
    axios
      .get(latitudeLongitudeUrl)
      .then(function (response) {
        const fiveDayForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=imperial&appid=${API_KEY}`;
        return axios
        .get(fiveDayForecastUrl)
        .then(function (response) {
          let responseData = JSON.stringify(response.data)
          let fiveDayForecastArray = []
          let firstWeatherData = response.data.list[0];
          firstWeatherData["listID"] = 0;
          fiveDayForecastArray.push(firstWeatherData);
          let targetWeatherDate = new Date()
          
          targetWeatherDate = createDateFromString(response.data.list[0].dt_txt);
          targetWeatherDate.setDate(targetWeatherDate.getDate() + 1);
          for (let index = 0; index < response.data.list.length; index++) {
            let weatherDate = createDateFromString(response.data.list[index].dt_txt)
            if (weatherDate.getTime() === targetWeatherDate.getTime()) {
              targetWeatherDate.setDate(targetWeatherDate.getDate() + 1);
              let weatherDayInfo = response.data.list[index]
              weatherDayInfo["listID"] = fiveDayForecastArray.length
              fiveDayForecastArray.push(response.data.list[index])
            }
            if (fiveDayForecastArray.length == 5) {
              break;
            }
          }
          locationChange(fiveDayForecastArray)
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
          console.log("error message in lang and long " + error.message);
        })
        .finally(function () {
          // always executed
         //console.log("Finally is called");
        });
      })
      .catch(function (error) {
        // handle error
        alert("error in location method " + error.message);
        console.log("error message " + error.message);
      })
      .finally(function () {
        // always executed
       //console.log("Finally is called");
      });
      console.log("\n")
   
  };

const getFiveDayForecastFromLongtitudeAndLatitude = (latitude, longtitude) => {
  const fiveDayForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}`;
  axios
  .get(fiveDayForecastUrl)
  .then(function (response) {
    let responseData = JSON.stringify(response.data)
    //console.log("response date " + responseData)
    
    let firstWeatherData = response.data.list[0];
    fiveDayForecastArray.push(firstWeatherData);

    let targetWeatherDate = new Date()
    //console.log("response date first " + response.data.list[0].dt_txt)
    targetWeatherDate = createDateFromString(response.data.list[0].dt_txt);
   // console.log("first date original " + targetWeatherDate)
    
    //console.log("first date from method " + createDateFromString(response.data.list[0].dt_txt));
    targetWeatherDate.setDate(targetWeatherDate.getDate() + 1);
    //console.log("target date ", targetWeatherDate)
    //console.log("\n")

    for (let index = 0; index < response.data.list.length; index++) {
      let weatherDate = createDateFromString(response.data.list[index].dt_txt)
      //console.log("iterate weather date " + weatherDate);
      //console.log("target date " + targetWeatherDate);
      if (weatherDate.getTime() === targetWeatherDate.getTime()) {
       // console.log("equal ")
        targetWeatherDate.setDate(targetWeatherDate.getDate() + 1);
        fiveDayForecastArray.push(response.data.list[index])
      }
      if (fiveDayForecastArray.length == 5) {
        break;
      }
    }
    return fiveDayForecastArray
  })
  .catch(function (error) {
    // handle error
    alert(error.message);
    console.log("error message in lang and long " + error.message);
  })
  .finally(function () {
    // always executed
   console.log("Finally is called");
  });
  
}

const createDateFromString = (dateStr) => {
  let year = parseInt(dateStr.substring(0, 4));
  let month = parseInt(dateStr.substring(5, 7));
  let day = parseInt(dateStr.substring(8, 10));
  let hour = parseInt(dateStr.substring(11, 13));
  let minute = parseInt(dateStr.substring(14, 16));
  let seconds = parseInt(dateStr.substring(17, 19));
  let date = new Date(year, month - 1, day, hour, minute, seconds)
  return date
}
export {getFiveDayForecastFromLocation};