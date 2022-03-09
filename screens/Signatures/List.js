import React, { useState, useEffect  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { POST_DATA } from '../ultils/api';
import PlaceholderItem from '../../components/placeholderItem';
import ItemSign from '../../components/itemSign';
const width_screen  = Dimensions.get('window').width;
const List = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [limit, setLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        setIsLoadingData(true)
        const id_rpa = route.params.ID_RPA;
        const name_rpa = route.params.NAME_RPA;
        setTitle(name_rpa);
        let payload = {
            'rpa' : id_rpa,
            'limit': limit,
        };
        let url = `/signature-list-task.php`;
        POST_DATA(`${url}`, payload).then(res => {
            console.log(res)
            if(res['success'] == 1){
                setData(res['data']);
                setLimit(limit+15);
                setIsLoadingData(false)
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }, [])
   
    function renderHeader() {
        return (
            <View style={{flex: 1}}>

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >

                </View>
                {/* Navigation header */}
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    height: 40,
                    alignItems: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={{marginLeft: SIZES.base}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text numberOfLines={1} style={{...FONTS.body3}}>{title}</Text>
                    </View>
                </View>
            </View>
        )
    }
    const _onEndReachedLoad = () => {
        if(!empty){
            setIsLoading(true)
            const id_rpa = route.params.ID_RPA;
            let payload = {
                'rpa' : id_rpa,
                'limit': limit,
            };
            let url = `/signature-list-task.php`;
            POST_DATA(`${url}`, payload).then(res => {
                if(res['success'] == 1){
                    if(res['data'].length){
                        const result =  data.concat(res['data']);
                        console.log(res['data'])
                        setData(result);
                        setLimit(limit+15);
                    }
                    else{
                        setEmpty(true)
                    }
                }
                setIsLoading(false)
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            });
        }
    }
    const _handleOnRefresh = () => {
        const limit_ = 0;
        setData([]);
        setEmpty(false);
        setIsLoading(false);
        setIsLoadingData(true);
        const id_rpa = route.params.ID_RPA;
        let payload = {
            'rpa' : id_rpa,
            'limit': limit_,
        };
        let url = `/signature-list-task.php`;
        POST_DATA(`${url}`, payload).then(res => {
            setLimit(limit_);
            if(res['success'] == 1){
                setData(res['data']);
                setLimit(15);
                setIsLoadingData(false);
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }
    function renderBody() {
        return (
            <FlatList
                data={data}
                ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator}/>
                )
                }}
                keyExtractor={(item)=>{
                return 'a'+item.ID_TASK;
                }}
                refreshing={false}
                onRefresh={() => _handleOnRefresh()}
                onEndReachedThreshold={0.5}
                onEndReached={() => 
                    _onEndReachedLoad()
                }
                ListFooterComponent={() => (empty == true ? 
                    <View style={{justifyContent:'center', alignItems: 'center'}}><Text style={styles.emptyMessageStyle}>Dữ liệu trống</Text></View> 
                    : null)}
                renderItem={({item}) => {
                    return(
                        <ItemSign item={item} navigation={navigation} rpa={true}/>
                    );
                }
            }/>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Book Cover Section */}
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            {/* Description */}
            <View style={{flex: 10, marginHorizontal: SIZES.base}}>
                {isLoadingData ? (
                    <>
                        <PlaceholderItem />
                        <PlaceholderItem />
                        <PlaceholderItem />
                        <PlaceholderItem />
                        <PlaceholderItem />
                        <PlaceholderItem />
                    </>
                ):(
                    renderBody()
                )}
               
                {isLoading == true && (
                    <PlaceholderItem />
                )}
               
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    boxItem:{
        paddingVertical: SIZES.base, 
        paddingHorizontal: SIZES.base, 
        marginHorizontal: SIZES.base*3, 
        marginBottom: SIZES.base*2, 
        borderRadius: 10
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
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        // height: 1,
        backgroundColor: "#CCCCCC"
    },
    image:{
        width:45,
        height:45,
        borderRadius:20,
        marginLeft:SIZES.base,
    },
    time:{
        fontSize:11,
        color:"#808080",
    },
    name:{
        fontSize:16,
        fontWeight:"bold",
    },
    
})

export default List;