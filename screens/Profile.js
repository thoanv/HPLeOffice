import React, { useState, useEffect  } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
  } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { GET_DATA } from './ultils/api';
import { AuthContext } from './../components/context';
const Profile = ({navigation}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        console.log(123)
        let url = `/user-info.php`;
        GET_DATA(`${url}`).then(res => {
            if(res['success'] == 1){
                setUser(res['user'])
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }, [])
    const { signOut } = React.useContext(AuthContext);
    function _logout () {
		Alert.alert(
			'Thông báo',
			'Bạn có muốn đăng xuất không',
			[
				{ text: 'Có', onPress: () => { signOut() }},
				{
					text: 'Không',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			],
			{ cancelable: false },
		);
	}
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: user.PATH}}/>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{user.FULLNAME}</Text>
                    <Text style={{marginVertical: SIZES.base}}>@{user.LOGIN}</Text>
                    <Text style={styles.info}>{user.WORK_DEPARTMENT} {user.WORK_POSITION ? ' - '+user.WORK_POSITION : 'Nhân viên'}</Text>
                    
                    <View style={{marginTop: SIZES.padding*5}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { _logout()}}>
                            <Text style={{color: COLORS.white}}>Đăng xuất</Text>  
                        </TouchableOpacity>  
                    </View>
                        
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    header:{
      backgroundColor: COLORS.primary,
      height:150,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:80
    },
    name:{
      fontSize:22,
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      alignItems: 'center',
      padding:30,
    },
    
    info:{
      fontSize:16,
      color: COLORS.black,
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: COLORS.oragin,
    },
  });
  
export default Profile;