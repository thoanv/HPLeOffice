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
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 2,
                }}
                onPress={() => console.log("Sign Up")}
            >

                <Text style={{marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4}}>Đăng nhập</Text>
            </TouchableOpacity>
        )
    }
    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={images.logo_hpl}
                    resizeMode="contain"
                    style={{
                        width: "60%",
                    }}
                />
            </View>
        )
    }
    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full name */}
                <View style={{
                    marginTop: SIZES.padding * 3
                }}>
                    <Text style={styles.title}>Tên đăng nhập</Text>
                    <TextInput 
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Vui lòng nhập ..."
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        onChangeText={(val) => textInputChange(val)}
                    />
                </View>

                {/* Password */}
                <View style={{
                    marginTop: SIZES.padding * 2
                }}>
                    <Text style={styles.title}>Mật khẩu</Text>
                    <TextInput 
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Vui lòng nhập ..."
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
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
            </View>
        )
    }
    
    function renderButton() {
        return (
            <View style={{margin: SIZES.padding * 3, marginTop: SIZES.padding * 4}}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: '#F5852B',
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {loginHandle( data )}}
                >
                    <Text style={{color: COLORS.white, ...FONTS.h4}}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
                flex: 1,
            }}
        >
           <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{
                flex: 1,
            }}
           >

               <ScrollView>
                   {renderHeader()}
                   {renderLogo()}
                   {renderForm()}
                   {renderButton()}
               </ScrollView>
           </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.lightGreen,
        ...FONTS.body3
    }
})

export default SignIn;