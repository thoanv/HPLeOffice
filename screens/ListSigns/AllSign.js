import React , { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    StyleSheet,
    Text
} from 'react-native';
import { icons, COLORS, images, SIZES, FONTS } from '../../constants'
import { POST_DATA } from '../ultils/api';
import PlaceholderItem from '../../components/placeholderItem';

import ItemSign from '../../components/itemSign';

const AllSign = ({navigation}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [dataSignatures, setDataSignatures] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0)
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        async function fetchList() {
            setIsLoadingData(true)
            let payload = {
                'type' : 'all',
                'page': page,
            };
            let url = '/signature-lists.php';
            POST_DATA(`${url}`, payload).then(res => {
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
    const fetchData =  () =>  {
        let pa = 0;
        let payload = {
            'type' : 'all',
            'page': pa,
        };
        let url = '/signature-lists.php';
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
    function renderDataSection () {

        const renderItem = ({item, index}) => {
            return (
                <ItemSign item={item} navigation={navigation} type={true} />
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
                    keyExtractor={(item, index) => `${item.ID_RPA}t${item.ID_TASK}${index}`}
                    ListFooterComponent={() => (empty == true ? 
                    <View style={{justifyContent:'center', alignItems: 'center'}}><Text>Dữ liệu trống</Text></View> 
                    : <PlaceholderItem/>)}
                />
            </View>
        )
    }
    const _handleOnRefresh = () => {
        setIsFetching(true);
        setPage(0);
        setEmpty(false);
        setIsLoading(false)
        setIsLoadingData(true);
        setDataSignatures([])
        fetchData();
    }
    const _onEndReachedLoad = () => {
        setIsLoading(true)
        let payload = {
            'type' : 'all',
            'page': page,
        };
        let url = '/signature-lists.php';
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
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F4F5F7'}}>
            <View style={styles.container}>
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
})
export default AllSign;