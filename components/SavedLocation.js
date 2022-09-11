import { View, Text, Image, TouchableOpacity, StyleSheet  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";


import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants/theme";

const SavedLocation = ({data,deleteButtonOnClick}) => {
  const navigation = useNavigation();
  //console.log("data weather " + data.weather[0].description);
  const imageUrl =  data.imageUrl;
  const degrees = data.degrees;
  const location = data.location;
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: "100%", height: 100,flexDirection:'row',flex:1}}>
        

        <Image  style={{width: '30%', height: '100%'}}  source={{uri: imageUrl}} />
        <Text style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
            marginTop:40,
            flex:1,
            
          }}> {degrees} </Text>
        <Text style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
            marginTop:40,
            flex:2,
            

          }} > {location} </Text>


        
        <TouchableOpacity style={{flex:1}}
             onPress={() => {deleteButtonOnClick(data.id)}} >
              <Image style={{width: '59%', height: '39%',position: 'absolute', top: 0, right: 0
              }}
              source={require("../assets/images/DeleteButton.png")} />
          </TouchableOpacity>
    
    
          

        
                
      </View>
    </View>
  );
};





export default SavedLocation;
