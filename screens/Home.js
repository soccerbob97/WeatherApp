import {useState, useReducer} from 'react';
import {View, SafeAreaView, FlatList,Text} from 'react-native'
import { COLORS } from '../constants/theme';
import {SavedLocationWeatherData} from '../constants/WeatherData';
import SavedLocation from '../components/SavedLocation';

const Home = () => {
  const [savedLocationList, setSavedLocationList] = useState(SavedLocationWeatherData);
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
            <View style={{height:300, backgroundColor: COLORS.white}}/>
          </View>
          
        </View> 
      </View>
      <Text> Array Length {savedLocationList.length} </Text>
    </SafeAreaView>
  )
}

export default Home;