import {useState, useReducer} from 'react';
import {View, SafeAreaView, FlatList,Text, StyleSheet} from 'react-native'
import { COLORS } from '../constants/theme';
import {SavedLocationWeatherData} from '../constants/WeatherData';
import SavedLocation from '../components/SavedLocation';
import FiveDayCard from '../components/FiveDayCard';
import { Dropdown } from 'react-native-element-dropdown';
import {API_KEY} from "@env"
import axios from 'axios';
import {getFiveDayForecastFromLocation} from '../WeatherApiRequests/weatherApiRequests'

const Home = () => {
  const [savedLocationList, setSavedLocationList] = useState(SavedLocationWeatherData);
  const [fiveDayForecastArray, setFiveDataForecastArray] = useState([]);
  const [value, setValue] = useState(null);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const deleteButtonOnClick = (id) => {
    for (let index = 0; index < savedLocationList.length; index++) {
      if (savedLocationList[index].id == id) {
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
  const locationList = [
    { label: 'New York City, NY, USA', value: '0', city:'New York', stateCode:'NY', countryCode:'US'},
    { label: 'Atlanta, Georgia, USA', value: '1', city:'Atlanta', stateCode:'GA', countryCode:'US'},
    { label: 'London, United Kingdom', value: '2', city:'London', stateCode:'N/A', countryCode:'GB'},
    { label: 'Mountain View, Calfornia, USA', value: '3', city:'Mountain View', stateCode:'CA', countryCode:'US'},
    { label: 'Bangalore, India', value: '4', city:'Bangalore', stateCode:'', countryCode:'IN'},

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
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  let location = locationList[item.value];
                  let city = location.city;
                  let stateCode = location.stateCode;
                  let countryCode = location.countryCode;
                  getFiveDayForecastFromLocation(city={city}, stateCode={stateCode}, countryCode={countryCode}, locationChange={locationChange})
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
      <Text> FiveDayForecastArray Length {fiveDayForecastArray.length}</Text>
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
