import React, { useState, useEffect  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { POST_DATA } from '../ultils/api';
import Pdf from 'react-native-pdf';
const width_screen  = Dimensions.get('window').width;
const height_screen  = Dimensions.get('window').height;


const ViewFile = ({ route, navigation }) => {

    const [file, setFile] = useState();
    const [pageCurrent, setPageCurrent] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        const id_rpa = route.params.rpa;
        const id_task = route.params.task;
        const id_file = route.params.file_id;
        let payload = {
            'rpa' : id_rpa,
            'task' : id_task,
            'file_id': id_file,
        };

        let url = `/signature-sign.php`;
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                setFile(res['file'])
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }, [])

    function renderHeader() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white, borderBottomColor: COLORS.darkgray, borderBottomWidth: 1}}>
            
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

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...FONTS.h3,}}>Văn bản</Text>
                    </View>

                    <TouchableOpacity
                        style={{marginRight: SIZES.base}}
                        onPress={() => console.log("Click more")}
                    >
                        <Image
                            source={icons.more_icon}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                
            </View>
        )
    }

    function renderBody() {
        if(file){
            const source = { uri: file.PATH, cache: true };
            return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* Custom Scrollbar */}
                    <View style={styles.container}>
                        <View style={styles.pdf}>
                            <Pdf
                                enablePaging = {true}
                                ref={(pdf) => { pdf = 2; }}
                                source={source}
                                onLoadComplete={(numberOfPages,filePath) => {
                                    setTotalPage(numberOfPages);
                                }}
                                onPageChanged={(page,numberOfPages) => {
                                    setPageCurrent(page);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link pressed: ${uri}`);
                                }}
                                style={styles.pdf}/>
                               
                        </View>
                        {totalPage > 1 && (
                            <View style={{flexDirection: 'row',backgroundColor: COLORS.white,paddingHorizontal: 15, borderRadius: 4, paddingVertical: 5, position: 'absolute', bottom: 5, left: '40%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold'}}>{pageCurrent ? pageCurrent : 1}</Text>
                                <Text style={{marginHorizontal: SIZES.base}}>|</Text>
                                <Text style={{fontWeight: 'bold'}}>{totalPage}</Text>
                            </View>
                        )}
                    
                    </View>
                </View>
            )
        }      
       
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Book Cover Section */}
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            {/* Description */}
            <View style={{flex: 10}}>
                {renderBody()}
            </View>
        </SafeAreaView>
    )
   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black
    },
    pdf: {
        flex:1,
        width:width_screen,
        height:height_screen,
    }
})

export default ViewFile;