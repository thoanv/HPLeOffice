import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    Platform
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { SIZES, COLORS, FONTS, icons } from '../constants';
const width_screen  = Dimensions.get('window').width;
const ItemSign = ({item,  navigation, rpa=false}) => {
    
    if(item){
        const path = item.CREATED_BY.PATH ? {uri: item.CREATED_BY.PATH} : icons.user;
        return (
            <View style={styles.container}>
                <View style={[styles.boxItem, styles.shadow]}>
                {/* Hearder */}
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("Detail",{
                            ID_RPA: item.ID_RPA,
                            ID_TASK: item.ID_TASK
                        })}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginRight: SIZES.base, justifyContent: 'center', alignItems: 'center'}}>
                                {item.CREATED_BY && (
                                    <>
                                    <Avatar.Image size={50} style={{backgroundColor: COLORS.border}} source={path} />
                                    <View style={{justifyContent: 'center', alignItems: 'center', width: 100}}>
                                        <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5, }}>{item.CREATED_BY.FULLNAME}</Text>
                                        
                                        <View style={{textAlign: 'justify'}}>
                                            <Text numberOfLines={2} style={{color: COLORS.darkgrayText, ...FONTS.body6, lineHeight: 15, textTransform: 'capitalize'}}>{item.CREATED_BY.WORK_POSITION ? item.CREATED_BY.WORK_POSITION : 'Nhân viên'}</Text>
                                        </View>
                                        <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body6, lineHeight: 15, textTransform: 'capitalize'}}>{item.CREATED_BY.WORK_DEPARTMENT}</Text>
                                    </View>
                                    </>
                                )}
                                {/* {item.DOCUMENT_SIGN && (
                                    <View style={{
                                        width: 27,
                                        height: 27,
                                        backgroundColor: COLORS.border,
                                        position: 'absolute',
                                        top: -7,
                                        left: -7,
                                        borderTopLeftRadius: SIZES.base,
                                        borderBottomRightRadius: SIZES.base
                                        }}>
                                        <Image
                                            source={icons.check}
                                            resizeMode="contain"
                                            style={{
                                                width: 22,
                                                height: 22,
                                                marginLeft: 2,
                                                marginTop: 2,
                                                tintColor: COLORS.primary,
                                            }}
                                        />
                                    </View>
                                )} */}
                                {item.DOCUMENT_SIGN && (
                                    <View style={{
                                        width: 25,
                                        height: 27,
                                        backgroundColor: COLORS.border,
                                        position: 'absolute',
                                        top: -8,
                                        left: -8,
                                        borderTopLeftRadius: SIZES.base,
                                        borderBottomRightRadius: SIZES.base
                                        }}>
                                        <Image
                                            source={icons.more}
                                            resizeMode="contain"
                                            style={{
                                                width: 22,
                                                height: 22,
                                                marginLeft: 2,
                                                marginTop: 2,
                                                tintColor: COLORS.primary,
                                            }}
                                        />
                                    </View>
                                )}
                            </View>
                            <View style={{borderLeftWidth: 1, borderLeftColor: COLORS.border, paddingLeft: SIZES.base, width: width_screen-140}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text numberOfLines={2} style={{color: COLORS.black, ...FONTS.body4, marginBottom: SIZES.base-3}}>{item.NAME_TASK}</Text>

                                    
                                </View>
                                {!rpa && (
                                    <TouchableOpacity 
                                        onPress={()=> navigation.navigate("List", {
                                            ID_RPA: item.ID_RPA,
                                            NAME_RPA: item.NAME_RPA,
                                        })}
                                    >
                                        <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5}}>Quy trình: {item.NAME_RPA}</Text>
                                    </TouchableOpacity>
                                )}
                                <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5}}>Ngày trình: {item.CREATED_AT}</Text>
                                {item.STAGE && (
                                    <View style={{flexDirection: 'row'}}>
                                        <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5, marginRight: SIZES.base}}>Giai đoạn:</Text>
                                        <Text numberOfLines={1} style={{ ...FONTS.body6, color: COLORS.white, backgroundColor: `#${item.STAGE.COLOR}`, paddingHorizontal: SIZES.base, borderRadius: SIZES.padding, overflow: 'hidden',}}>{item.STAGE.NAME}</Text>
                                    </View>
                                )}
                                
                                <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={(itemUser) => {
                                            const ite = itemUser.item
                                            if(ite.INFORMATION){
                                                const user = ite.INFORMATION;
                                                const image = user.PATH ? {uri: user.PATH} : icons.user
                                                return (
                                                    <View style={{marginRight: SIZES.base+5}}>
                                                        <Avatar.Image size={35} source={image} style={{backgroundColor: '#f1f1f1'}}/>
                                                        {ite.FILE_SIGNATURE == item.COUNT_FILE && (
                                                            <Image 
                                                            source={icons.check_green}
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                position:'absolute',
                                                                right: -5,
                                                                top: 0
                                                            }}
                                                        />
                                                        )}
                                                        
                                                    </View>
                                                )
                                            }
                                        }
                                        }
                                        data={item.USERS}
                                        keyExtractor={(itemUser, index_u) => `u${index_u}`}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
           
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxItem: {
        marginBottom: SIZES.base*2, 
        backgroundColor: COLORS.white, 
        borderRadius: SIZES.base, 
        padding: SIZES.base,
        borderColor: COLORS.border,
        borderWidth: 2,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.02 : 0.30,
        shadowRadius: 2,

        elevation: 2,
    },
})
export default ItemSign;