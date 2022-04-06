import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet,
    SafeAreaView
} from 'react-native';

import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../components/context';
const SignIn = ( { navigation } ) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [data, setData] = React.useState({
        username: '',
        password: '',
    });
    const textInputChange = (val) => {
        setData({
            ...data,
            username: val,
        });
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }
    const  { signIn }  = React.useContext(AuthContext);
    const loginHandle = (data) => {
        signIn(data)
    }

    function renderHeader() {
        return (
           <View style={{flex: 1, height: 50, backgroundColor: COLORS.white}}>

           </View>
        )
    }
    
    function renderForm() {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding * 4
                }}
            >
                {/* Full name */}
                <View style={{
                    marginTop: SIZES.padding * 6
                }}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: SIZES.largeTitle}}>
                        <Text style={{...FONTS.h1, color: COLORS.white, paddingBottom: SIZES.base}}>Hải Phát Land eOffice</Text>
                        <Text style={{...FONTS.body2, color: COLORS.white}}>Đăng nhập</Text>
                    
                        <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 10,

                                elevation: 10,
                                backgroundColor: COLORS.white, 
                                padding: 3, 
                                borderRadius: 8, 
                                marginTop: SIZES.padding*3}}>
                            <Image 
                                source={images.logo_app}
                                style={{
                                    width: 100,
                                    height:100
                                }}
                            />
                        </View>

                    </View>
                    <View>
                        <Image 
                            source={icons.user}
                            style={{
                                width: 18,
                                height: 18,
                                tintColor: COLORS.white,
                                position: 'absolute',
                                bottom: 22
                            }}
                        />
                        <TextInput 
                            style={{
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3,
                                textAlign: 'center'
                            }}
                            placeholder="Tên đăng nhập"
                            placeholderTextColor={COLORS.border}
                            selectionColor={COLORS.white}
                            onChangeText={(val) => textInputChange(val)}
                        />
                    </View>
                    
                </View>

                {/* Password */}
                <View style={{
                    marginTop: SIZES.padding * 2
                }}>
                        <Image 
                            source={icons.padlock}
                            style={{
                                width: 18,
                                height: 18,
                                tintColor: COLORS.white,
                                position: 'absolute',
                                bottom: 12
                            }}
                        />
                    <TextInput 
                        style={{
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3,
                            textAlign: 'center'
                        }}
                        placeholder="Mật khẩu"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            height: 30,
                            width: 30,
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image 
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{margin: SIZES.padding * 3, marginTop: SIZES.padding * 6}}>
                    <TouchableOpacity
                            style={{
                            height: 50,
                            borderRadius: SIZES.base,
                            alignItems: 'center',
                            justifyContent: 'center',
                            
                        }}
                        onPress={() => {loginHandle( data )}}
                    >
                        <LinearGradient colors={['#F1F1F1', '#fff8f5', '#F7F7F7']} style={{borderRadius: 40,}}>
                            <Text style={styles.buttonText,{paddingVertical: 12, paddingHorizontal: 60, color: '#FF9417', ...FONTS.body3}}>
                                Đăng nhập
                            </Text>
                            </LinearGradient>   
                    </TouchableOpacity>
                    
                </View>
               
            </View>
        )
    }
    


    return (
        <SafeAreaView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                flexDirection: 'column',
            }}
        >
            <LinearGradient
                start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1.5}}
                colors={['#FF9417', '#FEDC10']}
                style={{
                    flex: 10,
                }}
            >
                {renderForm()}
                {/* {renderButton()} */}
                <View style={{flex: 1, alignItems: 'center',  justifyContent: 'flex-end', marginBottom: SIZES.base}}>
                    <Text style={{color: COLORS.white, marginBottom: 5, fontWeight: 'bold'}}></Text>
                    <Text style={{color: COLORS.white}}>Copyright © 2022 Hai Phat Land - All Rights Reserved</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    title: {
        color: COLORS.lightGreen,
        ...FONTS.body3
    }
})

export default SignIn;