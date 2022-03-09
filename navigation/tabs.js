import React from "react";
import {
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabTops from "./tabTop";
import Notification from '../screens/Notification';
import Procedure from '../screens/Procedure';
import { COLORS, icons, FONTS } from '../constants';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={TabTops}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.home}
                                resizeMode="cover"
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>
                                Trang chủ
                            </Text>
                        </View>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Procedure"
                component={Procedure}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.process}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{color: focused ? COLORS.primary : COLORS.black, ...FONTS.body6}}>
                                Quy trình
                            </Text>
                        </View>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.bell}
                                resizeMode="contain"
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>
                                Thông báo
                            </Text>
                        </View>
                    ),
                    headerShown: false
                }}
            />
            
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;