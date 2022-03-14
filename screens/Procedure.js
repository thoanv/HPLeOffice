import React , { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    StyleSheet, 
    TouchableOpacity,
    Image,
    Text,
    Dimensions
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { icons, COLORS, images, SIZES, FONTS } from '../constants'
import { POST_DATA } from './ultils/api';
import PlaceholderItem from '../components/placeholderItem'
import LinearGradient from 'react-native-linear-gradient';
const width_screen  = Dimensions.get('window').width;
const Procedure = ({navigation}) => {

    const [dataSignatures, setDataSignatures] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [page, setPage] = useState(0)
    const [isFetching, setIsFetching] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchList() {
            setIsLoadingData(true)
            let url = '/signature-list-proceduries.php';
            let payload = {
                'page': page,
            };
            POST_DATA(`${url}`, payload ).then(res => {
                if(res['success'] == 1){
                    setDataSignatures(res['data']);
                    setIsLoadingData(false)
                    setPage(page+1);
                }
             }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
        }
        fetchList();
    }, []);

    function renderHeader() {
        return (
            <View style={{height: 45}}>
                <LinearGradient
                    start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1.5}}
                    colors={['#FF9417', '#FEDC10']}
                    style={{
                        flex: 1,
                        height: 10
                    }}
                >
                    <View style={{  textAlignVertical: 'center', textDecorationLine: 'line-through', marginTop: SIZES.padding, marginHorizontal: SIZES.base*2 }}>
                        <Text style={{...FONTS.h5, color: COLORS.white}}>Quy trình</Text>
                    </View>
                   
                </LinearGradient>
            </View>
            
        )
    }
    const fetchData =  () =>  {
        let pa = 0;
        let payload = {
            'page': pa,
        };
        let url = '/signature-list-proceduries.php';
        POST_DATA(`${url}`, payload).then(res => {
            setPage(pa)
            if(res['success'] == 1){
                setDataSignatures(res['data']);
            }
            setPage(pa+1);
            setIsFetching(false);
            setIsLoadingData(false)
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }
    const _handleOnRefresh = () => {
        setIsFetching(true);
        setPage(0);
        setIsLoading(false)
        setIsLoadingData(true);
        setDataSignatures([])
        fetchData();
    }
    const _onEndReachedLoad = () => {
        setIsLoading(true)
        let payload = {
            'page': page,
        };
        let url = '/signature-list-proceduries.php';
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                if(res['data'].length){
                    const result =  dataSignatures.concat(res['data']);
                    setDataSignatures(result);
                    setPage(page+1);
                }else{
                    setEmpty(true)
                }
                
            }
            setIsLoading(false)
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }
    function renderDataSection () {

        const renderItemChild = (item_store, index_store) => {
            let value = item_store.item
            const path = value.CREATED_BY.PATH ? {uri: value.CREATED_BY.PATH} : icons.user;
           return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginVertical: SIZES.base,
                    borderRadius: SIZES.base, 
                    padding: SIZES.base,
                    width: width_screen-60,
                }}
                onPress={()=> navigation.navigate("Detail",{
                    ID_RPA: value.ID_RPA,
                    ID_TASK: value.ID_TASK
                })}
            >
                <View style={styles.cardShadow}>
                    <View style={{marginRight: SIZES.base, justifyContent: 'center', alignItems: 'center'}}>
                        {value.CREATED_BY && (
                            <>
                            <Avatar.Image size={50} style={{backgroundColor: COLORS.border}} source={path} />
                            <View style={{justifyContent: 'center', alignItems: 'center', width: 100}}>
                                <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5, }}>{value.CREATED_BY.FULLNAME}</Text>
                                
                                <View style={{textAlign: 'justify'}}>
                                    <Text numberOfLines={2} style={{color: COLORS.darkgrayText, ...FONTS.body6, lineHeight: 15, textTransform: 'capitalize'}}>{value.CREATED_BY.WORK_POSITION ? value.CREATED_BY.WORK_POSITION : 'Nhân viên'}</Text>
                                </View>
                                <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body6, lineHeight: 15, textTransform: 'capitalize'}}>{value.CREATED_BY.WORK_DEPARTMENT}</Text>
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
                        {value.DOCUMENT_SIGN && (
                            <View style={{
                                width: 25,
                                height: 27,
                                backgroundColor: COLORS.border,
                                position: 'absolute',
                                top: -8,
                                left: 0,
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
                    <View style={{borderLeftWidth: 1, borderLeftColor: COLORS.border, paddingLeft: SIZES.base, width: width_screen-200}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text numberOfLines={2} style={{color: COLORS.black, ...FONTS.body4, marginBottom: SIZES.base-3, height: 50}}>{value.NAME_TASK}</Text>
                        </View>
                        
                        <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5}}>Ngày trình: {value.CREATED_AT}</Text>
                        {value.STAGE && (
                            <View style={{flexDirection: 'row'}}>
                                <Text numberOfLines={1} style={{color: COLORS.darkgrayText, ...FONTS.body5, marginRight: SIZES.base}}>Giai đoạn:</Text>
                                <Text numberOfLines={1} style={{ ...FONTS.body6, color: COLORS.white, backgroundColor: `#${value.STAGE.COLOR}`, paddingHorizontal: SIZES.base, borderRadius: SIZES.padding, overflow: 'hidden',}}>{value.STAGE.NAME}</Text>
                            </View>
                        )}
                        
                        <View style={{marginTop: SIZES.base}}>
                            <View style={{flexDirection: 'row'}}>
                                {value.USERS.map(function(item_u, index_u){
                                    if(item_u.INFORMATION){
                                        const user = item_u.INFORMATION;
                                        const image = user.PATH ? {uri: user.PATH} : icons.user
                                        return (
                                            <View style={{marginRight: SIZES.base+5}} key={`${value.ID_RPA}as${index_u}`}>
                                                <Avatar.Image size={35} source={image} style={{backgroundColor: '#f1f1f1'}}/>
                                                {item_u.FILE_SIGNATURE == value.COUNT_FILE && (
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
                                        ); 
                                    }
                                })}
                            </View>
                        
                            
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
           )
        }
        const renderItem = ({item, index}) => {
            return (
                <View style={{flex: 1, marginBottom: SIZES.base*2}}>
                    {/* Hearder */}
                        <TouchableOpacity
                            onPress={()=> navigation.navigate("List", {
                                ID_RPA: item.ID_RPA,
                                NAME_RPA: item.TITLE,
                            })}
                        >
                            <View style={{paddingHorizontal: SIZES.base, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: COLORS.black, ...FONTS.h6, marginRight: SIZES.base}}>{item.TITLE}</Text>
                                <Image 
                                    source={icons.right}
                                    style={{
                                        width: 13,
                                        height: 13,
                                        alignItems: 'stretch',
                                    }}
                                />
                                
                            </View>
                        </TouchableOpacity>
                        {/* Books */}
                        <View style={{flex: 1}}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemChild}
                                data={item.STORES}
                                keyExtractor={item_store => `a${item_store.ID_TASK}_${item_store.ID_RPA}`}
                            />
                        </View>
                    
                </View>
            )
        }
        return (
            <View style={{ marginTop: SIZES.padding}}>
                <FlatList
                    refreshing={isFetching}
                    onRefresh={() => _handleOnRefresh()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => 
                        _onEndReachedLoad()
                    }
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    data={dataSignatures}
                    keyExtractor={item => `a${item.ID_RPA}`}
                    ListFooterComponent={() => (empty == true ? 
                        <View style={{justifyContent:'center', alignItems: 'center'}}><Text>Dữ liệu trống</Text></View> 
                        : <PlaceholderItem/>)}
                />
            </View>
        )
    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}>
                    {renderHeader()}
                </View>
                <View style={{flex: 10, marginHorizontal: SIZES.base}}>
                    {isLoadingData ? (
                        <>
                        <PlaceholderItem/>
                        <PlaceholderItem/>
                        <PlaceholderItem/>
                        <PlaceholderItem/>
                        <PlaceholderItem/>
                        <PlaceholderItem/>
                        </>
                    ):(
                        renderDataSection()
                    )} 
                    {isLoading == true && (
                        <PlaceholderItem />
                    )}
                    
                </View>
            </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxItem: {
        marginBottom: SIZES.base*2, 
        backgroundColor: COLORS.white, 
        borderRadius: SIZES.base, 
        paddingVertical: SIZES.base*2,
        paddingHorizontal: SIZES.base
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,

        elevation: 2,
    },
    cardShadow: {
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderColor: COLORS.border,
        paddingVertical: SIZES.base,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
   },
   cardContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        width: 240,
        alignItems: 'flex-start',
        paddingTop: SIZES.padding2,
   },
   cardInfor:{
       marginTop: SIZES.padding_15,
       width: 180,
       color: COLORS.white,
       shadowColor: "#000",
   }
})
export default Procedure;