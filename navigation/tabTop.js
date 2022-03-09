import React , { useState, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar } from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();
import AllSign from '../screens/ListSigns/AllSign';
import PendingSign from '../screens/ListSigns/PendingSign';
import ApprovedSign from '../screens/ListSigns/ApprovedSign';
import DoNotSign from '../screens/ListSigns/DoNotSign';
import { COLORS, icons, FONTS, SIZES } from '../constants';
import { GET_DATA } from '../screens/ultils/api';
import {
    PlaceholderContainer,
    Placeholder,
  } from 'react-native-loading-placeholder';
  import LinearGradient from 'react-native-linear-gradient';
  const Gradient = () => {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{x: 1.0, y: 0.0}}
        end={{x: 0.0, y: 0.0}}
        style={{
          flex: 1,
          width: 120,
        }}
      />
    );
};
const TabTops = ({navigation}) => {
 const [user, setUser] = useState({});
 const [isLoadingData, setIsLoadingData] = useState(false)
 useEffect(() => {
    setIsLoadingData(true)
     let url = `/user-info.php`;
     GET_DATA(`${url}`).then(res => {
         if(res['success'] == 1){
             setUser(res['user'])
             setIsLoadingData(false)
         }
      }).catch((error)=>{
         console.log("Api call error");
         alert(error.message);
      });
 }, [])

    return (
        <SafeAreaView style={styles.container}>
        <View
            style={{
                flexDirection: 'row',
                marginVertical: SIZES.padding ,
                marginHorizontal: SIZES.padding,
            }}
        >
            {isLoadingData ? (
                <>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <PlaceholderContainer
                                style={styles.placeholderContainer}
                                animatedComponent={<Gradient />}
                                duration={1000}
                                delay={1000}
                            >
                                <Placeholder style={[styles.placeholder, {width: 40, height: 40, borderRadius: 40 }]} />
                                <View style={{marginTop: SIZES.base}}>
                                    <Placeholder style={[styles.placeholder, {width: '100%', height: 10 }]} />
                                    <Placeholder style={[styles.placeholder, {width: '70%', height: 10 }]} />
                                </View>
                            </PlaceholderContainer>
                        </View>
                    </View>
                </>
            ):(
                <>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={{flexDirection: 'row'}}>
                            <Avatar.Image size={40} source={{uri: user.PATH}} />
                            <View style={{marginLeft: SIZES.padding}}>
                                <Text style={{...FONTS.h6}}>{user.FULLNAME}</Text>
                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.WORK_POSITION ? user.WORK_POSITION : 'Nhân viên'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                </>
            )}
            
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    style={{
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                <View>
                    <Image
                        source={icons.search}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                </View>
                </TouchableOpacity>
            </View>
        </View>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#FFF",
                tabBarInactiveTintColor: "#555",
                tabBarLabelStyle: {
                    fontSize: 11  ,
                    textTransform: "none",
                    marginTop: 0
                },
                tabBarIndicatorStyle: {
                    borderBottomColor: 'transparent',
                //   borderBottomWidth: 2,
                backgroundColor: COLORS.primary,
                height: 35,
                borderRadius: SIZES.base,
            
                },
                tabBarStyle: { backgroundColor: COLORS.white, marginHorizontal: SIZES.base, borderRadius: SIZES.base, margin: 1 },
                tabBarItemStyle: { height: 35, justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'center',},
                })}
            >
            <Tab.Screen name="Tất cả" component={AllSign} />
            <Tab.Screen name="Chờ duyệt" component={PendingSign} />
            <Tab.Screen name="Đã duyệt" component={ApprovedSign} />
            <Tab.Screen name="K.duyệt" component={DoNotSign} />
        </Tab.Navigator>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    placeholderContainer: {
        flexDirection: 'row',
        borderRadius: SIZES.base,
      },
      placeholder: {
        height: 8,
        marginTop: 6,
        marginLeft: 10,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5
      },
    })
export default TabTops;