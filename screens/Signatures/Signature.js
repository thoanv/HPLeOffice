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


const Signature = ({ route, navigation }) => {

    const [file, setFile] = useState();
    const [visibleType, setVisibleType] = useState(3);
    const [signature, setSignature] = useState('');
    const [localSignature, setLocalSignature] = useState({});
    const [pageCurrent, setPageCurrent] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [accessTokenVnpt, setAccessTokenVnpt] = useState('');
    const [tranId, setTranId] = useState('');
    const [note, setNote] = useState('');
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
                setLocalSignature(res['data']);
               
                setSignature(res['signature'])
                setFile(res['file'])
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
                            <Text style={{...FONTS.body3}}>Văn bản ký</Text>
                    </View>

                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
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
                                {signature !== '' && (
                                    Object.entries(localSignature).map(([key, value]) => {
                                        if(Number(key) == pageCurrent){
                                            return Object.entries(value).map(([key_, value_]) => {
                                                let x = value_['x']*width_screen/100;
                                                let y = value_['y']*(height_screen-150)/100;
                                                return (
                                                    <View key={Number(key_).toString()} style={{position:'absolute', top: y, left: x, borderColor: 'red', borderWidth: 1, borderStyle: 'dashed',}}>
                                                        <Image 
                                                            source={{uri: signature}}
                                                            style={{
                                                                width: 100,
                                                                height: 50
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            })
                                        }
                                        
                                    })
                                )
                                    
                                }
                               
                                
                        </View>
                        {totalPage > 1 && (
                            <View style={{flexDirection: 'row',backgroundColor: COLORS.white,paddingHorizontal: 15, borderRadius: 4, paddingVertical: 5, position: 'absolute', bottom: 5, left: '40%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold'}}>{pageCurrent ? pageCurrent : 1}</Text>
                                <Text style={{marginHorizontal: SIZES.base}}>|</Text>
                                <Text style={{fontWeight: 'bold'}}>{totalPage}</Text>
                            </View>
                        )}
                        {note !== '' && (
                            <View style={{width: '100%',flexDirection: 'row',backgroundColor: COLORS.lime, paddingHorizontal: 15, paddingVertical: 5, position: 'absolute', top: 10}}>
                                <Text style={{color: COLORS.white}}>{note}</Text>
                            </View>
                        )}
                    </View>
                </View>
            )
        }      
       
    }
    const actionSign = () => {
        setIsLoading(false);
        const id_rpa = route.params.rpa;
        const id_task = route.params.task;
        const id_file = route.params.file_id;
        let payload = {
            'rpa' : id_rpa,
            'task' : id_task,
            'file_id': id_file,
            'visibleType' : visibleType
        };
        let url = `/signature-sign.php`;
        console.log(payload);
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                console.log(res)
                if(res.access_token_vnpt)
                    setAccessTokenVnpt(res.access_token_vnpt);
                if(res.tranId)
                    setTranId(res.tranId)

                setNote(res.note);
            }
            setIsLoading(true);
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
        
    }
    const actionComplete = () => {
        setIsLoading(false);
        const id_rpa = route.params.rpa;
        const id_task = route.params.task;
        const id_file = route.params.file_id;
        let payload = {
            'rpa' : id_rpa,
            'task' : id_task,
            'file_id': id_file,
            'tran_id' : tranId,
            'access_token_vnpt' : accessTokenVnpt,
        };
        let url = `/signature-sign.php`;
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                setLocalSignature({});
                setSignature('')
                setFile(res['file'])
                setNote(res.note);
            }else if(res['success'] == 3){
                if(res.access_token_vnpt)
                    setAccessTokenVnpt(res.access_token_vnpt);
                if(res.tranId)
                    setTranId(res.tranId)

                setNote(res.note);
            }
            setIsLoading(true);
            console.log(res)
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }
    const createSigAlert = () => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn thực hiện thao tác này",
            [
              {
                text: "Hủy",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Đồng ý", onPress: () => actionSign()}
            ]
          );
    }
    function renderFooter () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.white}}>
                {tranId == '' ? (
                    <>
                    {isLoading == true ? (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.oragin,
                                marginHorizontal: SIZES.largeTitle*2,
                                marginVertical: SIZES.base,
                                borderRadius: SIZES.base*3,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress = {() => createSigAlert()}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    source={icons.signature}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.white
                                    }}
                                />
                                <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: SIZES.base}}>Xác nhận ký</Text>

                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{
                            flex: 1,
                            backgroundColor: COLORS.oragin,
                            marginHorizontal: SIZES.largeTitle*2,
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.base*3,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator animating={true} color="#FFF" />
                        </View>
                    )}
                    </>
                ):(
                    <View style={{width: '100%'}}>
                    {isLoading == true ? (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.lime,
                                marginHorizontal: SIZES.largeTitle*2,
                                marginVertical: SIZES.base,
                                borderRadius: SIZES.base*3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: SIZES.padding
                            }}
                            onPress = {() => actionComplete()}
                            >
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    source={icons.success}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.white
                                    }}
                                />
                                <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: SIZES.base}}>Hoàn thành ký</Text>

                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{
                            flex: 1,
                            backgroundColor: COLORS.lime,
                            marginHorizontal: SIZES.largeTitle*2,
                            marginVertical: SIZES.base,
                            borderRadius: SIZES.base*3,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator animating={true} color="#FFF" />
                        </View>
                    )}
                    </View>
                    )
                }
                
                              
            </View>
            
        )
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
            {/* Buttons */}
            {Object.keys(localSignature).length > 0 && (
                <View style={{height: 60, marginBottom: 0}}>
                    {renderFooter()}
                </View>
            )}
            
        </SafeAreaView>
    )
   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    pdf: {
        flex:1,
        width:width_screen,
        height:height_screen,
    }
})

export default Signature;