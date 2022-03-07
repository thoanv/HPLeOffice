import React, { useState, useEffect, useRef  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    FlatList,
    Animated,
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import BorderHorizontal from '../../components/borderHorizontal';
import PlaceholderDetail from '../../components/placeholderDetail';
import Dot from '../../components/dot';
import { POST_DATA } from '../ultils/api';
import Modal from "react-native-modal";
import RNFetchBlob from 'rn-fetch-blob';
const width_screen  = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
const Detail = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [stages, setStages] = useState([]);
    const [checkStageCurrents, setCheckStageCurrents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    useEffect(() => {
        setIsLoadingData(true)
        let id_rpa = route.params.ID_RPA;
        let id_task = route.params.ID_TASK;
        let payload = {
            'rpa' : id_rpa,
            'task': id_task
        };
        let url = `/signature-detail.php`;
        POST_DATA(`${url}`, payload).then(res => {
            console.log(res['data'])
            if(res['success'] == 1){
                setData(res['data'])
                setStages(res['stages'])
                setIsLoadingData(false)
                setCheckStageCurrents(res['checkStageCurrent'])
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const createAlertAccept = (status) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn thực hiện thao tác này",
            [
              {
                text: "Hủy",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Đồng ý", onPress: () => actionChangeStage(status)}
            ]
          );
    }
    const actionChangeStage = (status) => {
        const stage_current = data.STAGE;
        const stage_status = status;
        setModalVisible(!isModalVisible);
        setIsLoading(false)
        let id_rpa = route.params.ID_RPA;
        let id_task = route.params.ID_TASK;
        let payload = {
            'rpa' : id_rpa,
            'task': id_task,
            'stage_current' : stage_current,
            'stage_status' : stage_status
        };
        console.log(payload);
        let url = `/signature-detail.php`;
        POST_DATA(`${url}`, payload).then(res => {
            console.log(res)
            if(res['success'] == 1){
                setData(res['data'])
                setStages(res['stages'])
            }
            setIsLoading(true)
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }
    function renderHeader() {
        return (
            <View style={{flex: 1, }}>
            
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
                        style={{marginHorizontal: SIZES.base}}
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
                            <Text numberOfLines={1} style={{...FONTS.body3,}}>{data.NAME_TASK}</Text>
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
    function renderNote() {
        if(data.Note){
            return (
                <View style={{flex: 1, marginBottom: SIZES.base*2, borderRadius: SIZES.base*2}}>
                    <View
                        style={[{
                            paddingVertical: 10,
                            paddingHorizontal: SIZES.base,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase'}}>Ghi chú</Text>
                        <BorderHorizontal/>
                        <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                            <Text>
                                {data.note}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    function renderStage() {
        const renderItemStage = ({item, index}) => {
                return (
                    <View style={{marginBottom: SIZES.base, marginLeft: SIZES.base, paddingBottom: SIZES.base}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={data.STAGE.SORT >= item.SORT ? styles.stage_process: styles.stage_future}>
                                <Text style={data.STAGE.SORT >= item.SORT ? styles.txt_stage_process: styles.txt_stage_future}>{index+1}</Text>
                            </View>
                            <View style={{ marginLeft: SIZES.base}}>
                                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                                    {item.NAME}
                                </Text>
                            </View>
                    
                        </View>
                    </View>
                )
        }
        return (
            <View style={{flex: 1, marginBottom: SIZES.base*2, borderRadius: SIZES.base*2}}>
                <View
                    style={[{
                        paddingVertical: 10,
                        paddingHorizontal: SIZES.base,
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base
                    }, styles.shadow]}
                >
                    <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase'}}>Tiến trình của các giai đoạn</Text>
                    <BorderHorizontal/>
                    <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                    <FlatList
                        renderItem={renderItemStage}
                        data={stages}
                        keyExtractor={(item, index) => 'key'+index}
                    />
                    </View>
                </View>
            </View>
        )
    }
    function renderInfoTask() {
        let created_at = data.CREATED_BY;
        
        if(created_at) {
            let nameUser = `${created_at['LAST_NAME']} ${created_at['NAME']}`
            return (
                <View style={{flexDirection: 'row', marginBottom: SIZES.base*2}}>
                    {/* Custom Scrollbar */}
                    <View style={{flex: 1}}>
                        <View
                            style={[{
                                paddingTop: 10,
                                paddingHorizontal: SIZES.base*2,
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.base
                            }, styles.shadow]}
                        >
                            <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase'}}>Thông tin công việc</Text>
                            <BorderHorizontal/>
                            {itemTaskUser(icons.user, 'Người tạo', nameUser  )}
                            {itemTask(icons.more, 'Phòng ban', created_at.WORK_DEPARTMENT)}
                            {itemTask(icons.clock, 'Thời gian tạo', data.CREATED_AT)}
                            {itemTask(icons.process, 'Quy trình', data.NAME_RPA)}
                        </View>
                    </View>
                </View>
            )
        }
    }
    function renderFileSignature() {
        const renderItemFile = ({item})=> {
            return (
                <View style={{paddingVertical: SIZES.base, flexDirection: 'row', width: '100%'}}>
                    <View>
                        <View>
                            <Image
                                source={icons.pdf}
                                resizeMode="cover"
                                style= {{
                                    width: 45,
                                    height: 45,
                                    marginRight: SIZES.base*2,
                                }}
                            />
                            </View>
                            {item.CHECK && (
                                <Image
                                source={icons.check_green}
                                resizeMode="cover"
                                style= {{
                                    width: 18,
                                    height: 18,
                                    position: 'absolute',
                                    right: 10,
                                    top: -5,
                                }}
                            />
                            )}
                            
                    </View>
                   
                    <View>
                        <Text>{item.NAME} {item.ID} </Text>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.SIZE}</Text>
                            <Dot/>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.CREATED_TIME}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            {data.checkCreatedByAndUserSig == true && (
                                <>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={()=> navigation.navigate("Signature", {
                                        rpa: data.ID_RPA,
                                        task: data.ID_TASK,
                                        file_id: item.ID
                                    })}
                                >
                                    <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Ký</Text>
                                </TouchableOpacity>
                                <Dot/>
                                </>
                            )}
                            
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> checkPermission(item.PATH)}
                            >
                                <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Tải xuống</Text> 
                            </TouchableOpacity>
                            <Dot/>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.navigate("ViewFile", {
                                    rpa: data.ID_RPA,
                                    task: data.ID_TASK,
                                    file_id: item.ID
                                })}
                            >
                                <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Xem</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            )
        }
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base*2}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase'}}>Tài liệu đính kèm ({data.TOTAL_FILE})</Text>
                        <BorderHorizontal/>
                  
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemFile}
                            data={data.FILES}
                            keyExtractor={item => `f${item.ID}`}
                        />
                    </View>
                </View>
            </View>
        )
    }
    function renderUserSignature() {
        const renderItemUser = ({item}) => {
            if(item.INFORMATION){
                let user = item.INFORMATION;
                let path = user.PATH  ? { uri:user.PATH } : icons.user
                return (
                    <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                        <View>
                            <View style={styles.profileImgContainer}>
                                <Image
                                    source={path}
                                    resizeMode="cover"
                                    style= {{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2
                                    }, styles.profileImg}
                                />
                            </View>
                            {(data.TOTAL_FILE == item.FILE_SIGNATURE) && (
                                <Image
                                source={icons.check_green}
                                resizeMode="cover"
                                style= {{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    right: 10,
                                    top: -5,
                                }}
                            />
                            )}
                        </View>
                        <View style={{paddingBottom: SIZES.base}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>{user.LAST_NAME} {user.NAME} </Text>
                                <Dot />
                                <Text style={{fontWeight: 'bold'}}>@{user.LOGIN}</Text>
                            </View>
                            
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.WORK_POSITION ? user.WORK_POSITION : 'Nhân viên'}</Text>
                                
                            </View>
                        </View>
                    </View>
                )
            }
           
        }
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base*2}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.base
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase'}}>Người xét duyệt</Text>
                        <BorderHorizontal/>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemUser}
                            data={data.USER_SIGS}
                            keyExtractor={(item, index) => index.toString()}
                        />
                      
                    </View>
                </View>
            </View>
        )
    }
    function itemTaskUser(icon, title, value, login='', position= '') {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base
                }}
            >
                <View style={{width: width_screen/3, flexDirection: 'row'}}>
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style= {{
                            width: 20,
                            height: 20,
                            marginRight: SIZES.base
                        }}
                    />
                    <Text style={{...FONTS.body4, fontWeight: 'bold'}}>{title}</Text>
                </View>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...FONTS.body4}}>{value} </Text>
                        {/* <Dot />
                        <Text>@{login}</Text> */}
                    </View>
                    {position !== '' && (<Text>{position}</Text>)}
                </View>
            </View>
        )
    }
    function itemTask(icon, title, value) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base
                }}
            >
                <View style={{width: width_screen/3, flexDirection: 'row'}}>
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style= {{
                            width: 20,
                            height: 20,
                            marginRight: SIZES.base
                        }}
                    />
                    <Text style={{...FONTS.body4, fontWeight: 'bold'}}>{title}</Text>
                </View>
                <View>
                    <Text>{value}</Text>
                </View>
            </View>
        )
    }
    function renderBottomButton () {
        if(!isLoadingData){
            if(data.STAGE && checkStageCurrents.includes(data.STAGE.ID)){
                return (
                    <View style={{height: 45, marginTop: SIZES.base}}>
                        <View style={{flex: 1, marginBottom: SIZES.base}}>
                            {isLoading == true ? (
                                <TouchableOpacity
                                style={{
                                    height: 40,
                                    borderRadius: SIZES.base,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    
                                }}
                                    onPress={toggleModal}
                                >
                                
                                <LinearGradient colors={[COLORS.primary, COLORS.primary, COLORS.primary]} style={{borderRadius: 20,}}>
                                    <Text style={styles.buttonText,{paddingVertical: 10, paddingHorizontal: 60, color: COLORS.white, ...FONTS.body4}}>
                                        Xác nhận
                                    </Text>
                                </LinearGradient>   
                                </TouchableOpacity>
                            ) : (
                                <View style={{
                                    flex: 1,
                                    backgroundColor: COLORS.oragin,
                                    marginHorizontal: SIZES.base,
                                    marginVertical: SIZES.base,
                                    borderRadius: SIZES.base,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <ActivityIndicator animating={true} color="#FFF" />
                                </View>
                            )}
                        </View>
                    </View>
                )
            }
        }
        
    }
    const checkPermission = async (path) => {
    
        if (Platform.OS === 'ios') {
          downloadFile(path);
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'Application needs access to your storage to download File',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile(path);
              console.log('Storage Permission Granted.');
            } else {
              // If permission denied then show alert
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++"+err);
          }
        }
    };
    const downloadFile = (path) => {

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = path;    
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
    
    file_ext = '.' + file_ext[0];
    
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
        path:
            RootDir+
            '/file_' + 
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
        },
    };
    config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Tải file thành công.');
        });
    };

    const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
                /[^.]+$/.exec(fileUrl) : undefined;
    };
    return (
        <SafeAreaView  style={styles.container}>
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            <View style={{flex: 10, marginHorizontal: SIZES.base}}>
                {isLoadingData ? (
                    <PlaceholderDetail/>
                ):(
                    <ScrollView style={{flexGrow: 1}}
                    nestedScrollEnabled={true}>
                        {/* {renderTitle()} */}
                        {renderInfoTask()}
                        {renderNote()}
                        {renderStage()}
                        {(data.TOTAL_FILE > 0) && (renderFileSignature())}
                        {renderUserSignature()}
                    </ScrollView>
                )}
                
            </View>
           
            {renderBottomButton()}
           
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{backgroundColor: COLORS.white, borderRadius: SIZES.padding}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                if(item.ID == data.STAGE.ID) {
                                    return(
                                        <View style={styles.stage}>
                                            <View style={{flexDirection: 'row', paddingVertical: 10}} >
                                                <Text style={{color: `#${item.COLOR}`, ...FONTS.body4}}>{item.NAME}</Text>
                                            </View>
                                            <View style={{marginLeft: SIZES.base, position: 'absolute', top: 10, right: 10}}>
                                                    <Image 
                                                        source={icons.location}
                                                        resizeMode="cover"
                                                        style= {{
                                                            width: 22,
                                                            height: 22,
                                                            tintColor: COLORS.primary
                                                        }}
                                                    />
                                                </View>
                                        </View>
                                    )
                                }
                                
                            }}
                            data={stages}
                            keyExtractor={item => `s${item.ID}`}
                        />
                        {(data.STAGE) && (data.STAGE.SORT > 1000) && (
                            <TouchableOpacity style={styles.stage} onPress={() => createAlertAccept(2)}>
                                <View style={styles.itemStage}>
                                    <Text style={{...FONTS.body4, color: COLORS.red}}>Không duyệt</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        
                        <TouchableOpacity style={styles.stage} onPress={() => createAlertAccept(1)}>
                            <View style={styles.itemStage}>
                                    <Text style={{color: COLORS.primary, ...FONTS.body4}}>Duyệt</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.stageEnd}  onPress={toggleModal}>
                            <View style={styles.itemStage}>
                                    <Text style={{color: 'red', ...FONTS.body4}}>Đóng</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: COLORS.darkgray
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
    profileImgContainer: {
        marginRight: SIZES.base*2,
        
    },
    profileImg: {
        height: 45,
        width: 45,
        borderRadius: 45,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 1,
    },
    borderBottom:{
        borderBottomColor: COLORS.darkgray, 
        borderBottomWidth: 1, 
    },
 
    fadingContainer: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 5,
        backgroundColor: COLORS.white,
        position: 'absolute',
        left: 0,
        width: '100%',
        zIndex: 0,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,

    },
    fadingText: {
        fontSize: 28
    },
    stage:{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stageEnd:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemStage:{
        paddingVertical: 10
    },
    stage_process:{
        backgroundColor: COLORS.primary, 
        height: 30, 
        width: 30, 
        justifyContent:'center', 
        alignItems: 'center', 
        borderRadius: 30, 
        borderColor: COLORS.oragin, 
        borderWidth: 1
    },
    stage_future:{
        backgroundColor: COLORS.white, 
        height: 30, 
        width: 30, 
        justifyContent:'center', 
        alignItems: 'center', 
        borderRadius: 30, 
        borderColor: COLORS.black, 
        borderWidth: 1,
    },
    txt_stage_future:{
        color: COLORS.black
    },
    txt_stage_process:{
        color: COLORS.white
    }
})

export default Detail;