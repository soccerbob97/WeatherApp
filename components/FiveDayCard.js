import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet  } from "react-native";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";

const FiveDayCard = (data) => {
//console.log("data" + JSON.stringify(data))
const imageUrl =  `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`;
const degrees = `${data.data.main.temp}°F`;
const date = data.data.dt_txt.substring(0,10)
//console.log("date " + date)
  return (
    <View
    style={{
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.font,
      marginBottom: SIZES.extraLarge,
      margin: SIZES.base,
      ...SHADOWS.dark,
    }}
    >
         <View style={{ width: "100%", height: 100,backgroundColor: COLORS.primary}}>
            <Image  style={{width: '100%', height: '70%', marginTop:20}}  source={{uri: imageUrl}} />
            <Text style={{
                fontSize: SIZES.large,
                fontFamily: FONTS.semiBold,
                color: COLORS.white,
                marginTop:10,
                textAlign: 'center',
            }}> {degrees} </Text>
            <Text style={{
                fontSize: SIZES.large,
                fontFamily: FONTS.semiBold,
                color: COLORS.white,
                marginTop:10
                
            }}> {date} </Text>
         </View>

    </View>
  )
}

export default FiveDayCard