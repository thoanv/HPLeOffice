import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { updateNumberNotify } from "../screens/redux/actions/updateNumberNotifyAction";
import { GET_DATA } from '../screens/ultils/api';
const Tab = createBottomTabNavigator()

const Tabs = () => {
    const dispatch = useDispatch();
    const number  = useSelector((state) => state.numberNotify)
    useEffect(() => {
        let url = `/count-notification.php`;
        GET_DATA(`${url}`)
        .then(res => {
            if (res['success'] == 1) {
                dispatch(updateNumberNotify(res['countNotify']))
            }
        })
     
    });
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
                            {number.number > 0 && (
                                <View style={{width: 20, height: 20, backgroundColor: COLORS.red, position: 'absolute', top: -5, right: 8, borderRadius: 10, justifyContent: "center",alignItems: "center",}}>
                                    <Text style={{color: COLORS.white, fontSize: 12, textAlign: 'center'}}>{number.number}</Text>
                                </View>
                            )}
                            
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