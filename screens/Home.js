import {useState, useReducer, useEffect} from 'react';
import {View, SafeAreaView, FlatList,Text, StyleSheet,TouchableOpacity} from 'react-native'
import {SavedLocationWeatherData} from '../constants/WeatherData';
import SavedLocation from '../components/SavedLocation';
import FiveDayCard from '../components/FiveDayCard';
import { Dropdown } from 'react-native-element-dropdown';
import {getFiveDayForecastFromLocation, getCurrentWeatherFromLocation} from '../WeatherApiRequests/weatherApiRequests'
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { createSavedLocation, deleteSavedLocation } from '../src/graphql/mutations';
import { listSavedLocations } from '../src/graphql/queries';

const Home = () => {
  const [currentSelectedLocation, setCurrentSelectedLocation] = useState({city:'', stateCode:'', countryCode:''});
  const [savedLocationList, setSavedLocationList] = useState([]);
  const [fiveDayForecastArray, setFiveDataForecastArray] = useState([]);
  const [value, setValue] = useState(null);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    deletePreviousLocationsFromDatabase();
}, [])

  const deleteButtonOnClick = (id) => {
    for (let index = 0; index < savedLocationList.length; index++) {
      if (savedLocationList[index].id == id) {
        deleteSavedLocationToDatabase(id=savedLocationList[index].id)
        savedLocationList.splice(index, 1);
        setSavedLocationList(savedLocationList);
        forceUpdate();
        break;
      }
    }
  }
  var locationChange = (fiveDayForecastArr) => {
    setFiveDataForecastArray(fiveDayForecastArr)
    forceUpdate();
  };

  var setSavedLocationListHelperFunction = (savedLocationArray) => {
    setSavedLocationList(savedLocationArray);
    forceUpdate();
  }


  const deleteSavedLocationToDatabase = async (id) => {
    try {
      const response = await API.graphql(graphqlOperation(deleteSavedLocation, {
        input: {
          id:id
        }
      }
      )
    )
    } catch (e) {
      console.log("error in delete " + JSON.stringify(e))
    }
    
  }

  
  const deletePreviousLocationsFromDatabase = async () => {
    try {
      setSavedLocationList([])
      forceUpdate()
      const locations = await API.graphql({query:listSavedLocations})
      const items = locations.data.listSavedLocations.items;
      for (let x = 0; x < items.length; x++) {
        let id = items[x].id
        deleteSavedLocationToDatabase(id=id)
      }
    } catch (e) {
      console.log("error in previous locations" + e);
    }
  }


  // This is me attempting to try to get saved locations and then displaying them. 
  //There was a major issue when sending a function as props I could not figure out myself.
  /*

  const showInitialSavedLocationsWeather = (initialLocations) => {
    console.log("initial location length " + initialLocations.length);
    //for (let index = 0; index < initialLocations.length; index++) {
      let city = initialLocations[0].city
      let stateCode = initialLocations[0].stateCode
      let countryCode = initialLocations[0].countryCode
      let id = initialLocations[0].id;
      console.log("city " + city)
      console.log("funciton " + JSON.stringify(setSavedLocationListHelperFunction))
      getCurrentWeatherFromLocation(city=city, stateCode=stateCode, countryCode=countryCode, id=id, currentSavedLocationArray=savedLocationList, 
        setSavedLocationListHelperFunction={setSavedLocationListHelperFunction});
    //}
        city = initialLocations[1].city
        stateCode = initialLocations[1].stateCode
        countryCode = initialLocations[1].countryCode
        id = initialLocations[1].id;
      console.log("city " + city)
      console.log("saved list " + savedLocationList)
      getCurrentWeatherFromLocation(city=city, stateCode=stateCode, countryCode=countryCode, id=id, currentSavedLocationArray=savedLocationList, 
        setSavedLocationListHelperFunction={setSavedLocationListHelperFunction});
  }
  */

  let addSavedLocation = () => {
    let city = currentSelectedLocation.city
    let stateCode = currentSelectedLocation.stateCode
    let countryCode = currentSelectedLocation.countryCode
    let location = currentSelectedLocation.city + ", " + currentSelectedLocation.countryCode
    let isNewLocation = true; 
    for (let index = 0; index < savedLocationList.length; index++) {
      if (savedLocationList[index].location == location) {
        isNewLocation = false;
        break;
      }
    }
    if (city != "" && stateCode != "" && countryCode != "" && savedLocationList.length < 3 && isNewLocation) {
      addSavedLocationToDatabase(city=city, stateCode=stateCode, countryCode=countryCode);
    } else if (city == "" && stateCode == "" && countryCode == "") {
      alert("Select a Location!")
    } else if (savedLocationList.length >= 3) {
      alert("You have too many saved locations!")
    } else if(!isNewLocation) {
      alert("Already have this location")
    }
  };

  const addSavedLocationToDatabase = async (city, stateCode, countryCode) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(graphqlOperation(createSavedLocation, {
        input: {
          city: city,
          stateCode: stateCode,
          countryCode: countryCode,
          userId: user.attributes.sub,
          userName: user.username
        }
      }
      )
    )
    //console.log("response " + JSON.stringify(response));
    let id = response.data.createSavedLocation.id;
    getCurrentWeatherFromLocation(city=city, stateCode=stateCode, countryCode=countryCode, id=id, currentSavedLocationArray=savedLocationList, 
      setSavedLocationListHelperFunction={setSavedLocationListHelperFunction});
    } catch (e) {
      console.log("error " + e)
    }
  }

  const locationList = [
    { label: 'New York City, NY, USA', value: '0', city:'New York', stateCode:'NY', countryCode:'US'},
    { label: 'Atlanta, Georgia, USA', value: '1', city:'Atlanta', stateCode:'GA', countryCode:'US'},
    { label: 'London, United Kingdom', value: '2', city:'London', stateCode:'N/A', countryCode:'GB'},
    { label: 'Mountain View, Calfornia, USA', value: '3', city:'Mountain View', stateCode:'CA', countryCode:'US'},
    { label: 'Shanghai, China', value: '5', city:'Shanghai', stateCode:'N/A', countryCode:'CN'},
    { label: 'Miami, Florida, USA', value: '6', city:'Miami', stateCode:'FL', countryCode:'US'},
    { label: 'Bangalore, India', value: '4', city:'Bangalore', stateCode:'N/A', countryCode:'IN'},

  ];
  return (
    <SafeAreaView style={{ flex:1 }}> 
      <View style={{flex: 1}}>
        <View style={{zIndex: 0}}>
          <FlatList
            data={savedLocationList}
            renderItem={({item}) =>  <SavedLocation data={item} deleteButtonOnClick={deleteButtonOnClick}/>}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <View style={{position: "absolute", top:0, bottom:0,right:0,left:0,zIndex:-1}}>
            <View style={{height:400, backgroundColor: COLORS.primary}}/> 
            <View style={{height:300, backgroundColor: COLORS.white}}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={locationList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Location"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  let location = locationList[item.value];
                  let city = location.city;
                  let stateCode = location.stateCode;
                  let countryCode = location.countryCode;
                  setCurrentSelectedLocation({city:city, stateCode:stateCode, countryCode:countryCode})
                  getFiveDayForecastFromLocation(city=city, stateCode=stateCode, countryCode=countryCode, locationChange={locationChange})
                }}
              />  
            <FlatList
              horizontal={true}
              data={fiveDayForecastArray}
              renderItem={({item}) =>  <FiveDayCard data={item} />}
              keyExtractor={(item) => item.listID}
              showsVerticalScrollIndicator={false}
            />
          
            </View>
          </View>
        </View> 
      </View>

      <View style={{flexDirection:'row'}}> 
      <View style={{
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
            marginTop:10,
            width: 90, 
            height: 30
            }
          }> 
          <TouchableOpacity style={{flex:1}}
             onPress={() => {
              addSavedLocation()
              }} >
              <Text style={{color: COLORS.white,}}> Add Location </Text>
          </TouchableOpacity>
    
      </View>

      <View style={{
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark,
            marginTop:10,
            width: 90, 
            height: 30
            }
          }> 
          <TouchableOpacity style={{flex:1}}
             onPress={() => {
              Auth.signOut();
              }} >
              <Text style={{color: COLORS.white,}}> Sign out </Text>
          </TouchableOpacity>
    
      </View>
      </View>

      

    </SafeAreaView>
    
  )
}

export default Home;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
