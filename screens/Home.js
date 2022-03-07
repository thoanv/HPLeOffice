import React , { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    StyleSheet
} from 'react-native';
import { icons, COLORS, images, SIZES, FONTS } from '../constants'
import { GET_DATA } from './ultils/api';
import PlaceholderItem from '../components/placeholderItem'

import ItemSign from '../components/itemSign';

const Home = ({navigation}) => {

    const [dataSignatures, setDataSignatures] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(false)
    useEffect(() => {
        async function fetchList() {
            setIsLoadingData(true)
            let url = '/signature-lists.php';
            GET_DATA(`${url}`).then(response => {
                if(response['success'] == 1){
                    setDataSignatures(response['data']);
                    setIsLoadingData(false)
                }
             }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
        }
        fetchList();
    }, []);

    function renderDataSection () {

        const renderItem = ({item, index}) => {
            return (
                <ItemSign item={item} navigation={navigation}/>
            )
        }
        return (
            <View style={{ marginTop: SIZES.padding}}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    data={dataSignatures}
                    keyExtractor={item => `${item.ID_RPA}t${item.ID_TASK}`}
                />
            </View>
        )
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
export default Home;