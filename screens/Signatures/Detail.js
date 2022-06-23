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
    ActivityIndicator,
    Alert,
    Platform,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import BorderHorizontal from '../../components/borderHorizontal';
import PlaceholderDetail from '../../components/placeholderDetail';
import Dot from '../../components/dot';
import { POST_DATA } from '../ultils/api';
import Modal from "react-native-modal";
const width_screen  = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
const Detail = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [stages, setStages] = useState([]);
    const [comments, setComments] = useState([]);
    const [userLogin, setUserLogin] = useState(0);
    const [checkStageCurrents, setCheckStageCurrents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [textInput, setTextInput] = React.useState("");
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            async function fetchList() {
                setIsLoadingData(true)
                let id_rpa = route.params.ID_RPA;
                let id_task = route.params.ID_TASK;
                let flag = route.params.FLAG != undefined ? route.params.FLAG : 0;
                console.log(flag);
                let payload = {
                    'rpa' : id_rpa,
                    'task': id_task,
                    'flag': flag
                };
               
                let url = `/signature-detail.php`;
                POST_DATA(`${url}`, payload).then(res => {
                    if(res['success'] == 1){
                        setData(res['data'])
                        setStages(res['stages'])
                        setComments(res['comments'])
                        setUserLogin(res['user_login'])
                        setIsLoadingData(false)
                        setCheckStageCurrents(res['checkStageCurrent'])
                    }
                }).catch((error)=>{
                    console.log("Api call error");
                    alert(error.message);
                });
            }
        fetchList();
        });
        return unsubscribe;
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    const createNotification = (stage_id) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn thực hiện thao tác này",
            [
              {
                text: "Hủy",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Đồng ý", onPress: () => actionChange(stage_id)}
            ]
          );
    }
    //Chuyển trạng thái
    const actionChange = (stage_id) => {
        console.log(stage_id);
        const stage_current = data.STAGE;
        setModalVisible(!isModalVisible);
        setIsLoading(false)
        let id_rpa = route.params.ID_RPA;
        let id_task = route.params.ID_TASK;
        let payload = {
            'rpa' : id_rpa,
            'task': id_task,
            'stage_id_next' : stage_id,
            'stage_current' : stage_current
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
    //Gửi comments
    const sendComment = () => {
        const comment = textInput;
        if(comment == ''){
            Alert.alert(
                "Thông báo",
                "Bạn chưa nhập bình luận!",
                [
                  {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                ]
            );
        }else{
            const id_rpa = route.params.ID_RPA;
            const id_task = route.params.ID_TASK;
            let payload = {
                'comment' : comment,
                'rpa' : id_rpa,
                'task': id_task
            };
            let url = `/signature-send-comment.php`;
            POST_DATA(`${url}`, payload).then(res => {
                const result =  comments.concat(res['comment']);
                setComments(result);
                setTextInput('');
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            });
        }
        
    }
    //convert thời gian
    const convertDateTime = (time) => {
        var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
            return;

        return day_diff == 0 && (
                diff < 60 && "vừa xong" ||
                diff < 120 && "1 phút trước" ||
                diff < 3600 && Math.floor( diff / 60 ) + " phút trước" ||
                diff < 7200 && "1 giờ trước" ||
                diff < 86400 && Math.floor( diff / 3600 ) + " giờ trước") ||
            day_diff == 1 && "hôm qua" ||
            day_diff < 7 && day_diff + " ngày trước" ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + " tuần trước";
    }
    const textInputChange = (val) => {
        setTextInput(val);
    }
    //Xóa comment
    const deleteComment = (ID) => {
        Alert.alert(
            "Thông báo",
            "Bạn muốn xóa bình luận này",
            [
              {
                text: "Hủy",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Đồng ý", onPress: () => actionDeleteComment(ID)}
            ]
          );
    }
    const actionDeleteComment = (ID) => {
        const id_rpa = route.params.ID_RPA;
        const id_task = route.params.ID_TASK;
        let payload = {
            'ID' : ID,
            'rpa' : id_rpa,
            'task': id_task
        };
        
        let url = `/signature-delete-comment.php`;
        POST_DATA(`${url}`, payload).then(res => {
               console.log(res['comments'])
                setComments([]);
                setComments(res['comments']);
        }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
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
                            <Text numberOfLines={1} style={{...FONTS.body3, color: COLORS.black}}>{data.NAME_TASK}</Text>
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
        if(data.NOTE){
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Ghi chú</Text>
                        <BorderHorizontal/>
                        <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                            <Text style={{color: COLORS.black}}>
                                {data.NOTE}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
    function renderPurpose() {
        if(data.PURPOSE){
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Mục đích</Text>
                        <BorderHorizontal/>
                        <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                            <Text style={{color: COLORS.black}}>
                                {data.PURPOSE}
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
                    <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Tiến trình của các giai đoạn</Text>
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
                            <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Thông tin công việc</Text>
                            <BorderHorizontal/>
                            {itemTaskUser(icons.user, 'Người tạo', nameUser  )}
                            {itemTask(icons.more, 'Phòng ban', created_at.WORK_DEPARTMENT)}
                            {itemTask(icons.position, 'Chức vụ', created_at.WORK_POSITION ? created_at.WORK_POSITION : 'Nhân viên')}
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
                        <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.NAME}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.SIZE}</Text>
                            <Dot/>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.CREATED_TIME}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            {(data.checkCreatedByAndUserSig == true && data.DOCUMENT_SIGN && checkStageCurrents.includes(data.STAGE.ID)) && (
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
                            
                            {/* <TouchableOpacity
                                style={styles.button}
                                onPress={()=> checkPermission(item.PATH)}
                            >
                                <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Tải xuống</Text> 
                            </TouchableOpacity>
                            <Dot/> */}
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Văn bản ký ({data.TOTAL_FILE})</Text>
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
    function renderFileAttach() {
        const renderItemFileAttach = ({item})=> {
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
                        <Text style={{fontWeight: 'bold', color: COLORS.black }}>{item.NAME}</Text>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.SIZE}</Text>
                            <Dot/>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.CREATED_TIME}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Văn bản đính kèm ({data.COUNTFILEATTACHS})</Text>
                        <BorderHorizontal/>
                  
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemFileAttach}
                            data={data.FILEATTACHS}
                            keyExtractor={item => `f_a${item.ID}`}
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
                                    style= {[{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2
                                    }, styles.profileImg]}
                                />
                            </View>
                            {((item.FILE_SIGNATURE > 0) && (data.TOTAL_FILE == item.FILE_SIGNATURE)) && (
                                <Image
                                source={icons.check_green}
                                resizeMode="cover"
                                style= {{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    right: Platform.OS === 'ios' ? 25 : 25,
                                    top: -5,
                                }}
                            />
                            )}
                        </View>
                        <View style={{paddingBottom: SIZES.base}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontWeight: 'bold', color: COLORS.black}}>{user.LAST_NAME} {user.NAME} </Text>
                                
                                <View style={{flexDirection: 'row'}}>
                                <Text style={{...FONTS.body4,fontWeight: 'bold', color: COLORS.black}}>@{user.LOGIN}</Text>
                                <Dot/>
                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.WORK_POSITION ? user.WORK_POSITION : 'Nhân viên'}</Text>
                                
                                </View>
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Người xét duyệt</Text>
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
    function renderUserDrive() {
        if(data.DRIVE){
            let user = data.DRIVE;
            let path = user.PATH  ? { uri:user.PATH } : icons.user
            return (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: SIZES.base
                        }}
                    >
                        
                        <View style={{width: width_screen/3, flexDirection: 'row'}}>
                            <Image
                                source={icons.driver}
                                resizeMode="cover"
                                style= {{
                                    width: 20,
                                    height: 20,
                                    marginRight: SIZES.base
                                }}
                            />
                            <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.black}}>Lái xe</Text>
                        </View>
                    </View>
                    <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                    
                    <View>
                        <View style={styles.profileImgContainer}>
                            <Image
                                source={path}
                                resizeMode="cover"
                                style= {[{
                                    width: 45,
                                    height: 45,
                                    marginRight: SIZES.base*2
                                }, styles.profileImg]}
                            />
                        </View>
                    </View>
                    <View style={{paddingBottom: SIZES.base}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontWeight: 'bold', color: COLORS.black}}>{user.LAST_NAME} {user.NAME} </Text>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={{...FONTS.body4,fontWeight: 'bold', color: COLORS.black}}>@{user.LOGIN}</Text>
                            <Dot/>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.WORK_POSITION ? user.WORK_POSITION : 'Nhân viên'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </View>
                
            )
        }
           
    }
    function renderUserFollow() {
        if(data.FOLLOW){
            const follow = data.FOLLOW;
            const pathFollow = follow.PATH  ? { uri:follow.PATH } : icons.user
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
                            <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Người theo dõi</Text>
                            <BorderHorizontal/>
                            <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                            <View>
                                <View style={styles.profileImgContainer}>
                                    <Image
                                        source={pathFollow}
                                        resizeMode="cover"
                                        style= {[{
                                            width: 45,
                                            height: 45,
                                            marginRight: SIZES.base*2
                                        }, styles.profileImg]}
                                    />
                                </View>
                                
                            </View>
                            <View style={{paddingBottom: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold', color: COLORS.black}}>{follow.FULLNAME} </Text>
                                </View>
                                
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.black}}>@{follow.LOGIN}</Text>
                                    <Dot />
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{follow.WORK_POSITION ? follow.WORK_POSITION : 'Nhân viên'}</Text>
                                    
                                </View>
                            </View>
                        </View>
                          
                        </View>
                    </View>
                </View>
            )
        }
        
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
                    <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.black}}>{title}</Text>
                </View>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...FONTS.body4, color: COLORS.black}}>{value} </Text>
                        {/* <Dot />
                        <Text>@{login}</Text> */}
                    </View>
                    {position !== '' && (<Text style={{color: COLORS.black}}>{position}</Text>)}
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
                    <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.black}}>{title}</Text>
                </View>
                <View>
                    <Text style={{color: COLORS.black, flexWrap: 'wrap'}}>{value}</Text>
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
                                    <Text style={[styles.buttonText,{paddingVertical: 10, paddingHorizontal: 60, color: COLORS.white, ...FONTS.body4}]}>
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
    function renderInfomationDrive(){
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
                            <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Thông tin Xe Ô Tô</Text>
                            <BorderHorizontal/>
                            {itemTaskUser(icons.steering_wheel, 'Loại xe', data.TYPE_CAR  )}
                            {itemTask(icons.car, 'Xe', data.CAR)}
                            {itemTask(icons.clock, 'Thời gian đi', data.TIME_START)}
                            {itemTask(icons.clock, 'Thời gian về', data.TIME_END)}
                            {itemTask(icons.location, 'Từ địa điểm', data.ADDRESS_START)}
                            {itemTask(icons.location, 'Đến địa điểm', data.ADDRESS_END)}
                            {renderUserDrive()}
                        </View>
                    </View>
                </View>
            )
        }
    }
    function renderComments(){
        const renderItemComment = ({item})=> {
            let path = item.PATH  ? { uri:item.PATH } : icons.user
            if(userLogin == item['user_id']){
                return (
                    <View>
                        <TouchableOpacity onPress={() => deleteComment(item.ID)} style={{paddingTop: SIZES.base, flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: SIZES.base -5}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{maxWidth: width_screen - 100,paddingBottom: SIZES.base, backgroundColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: '400', color: COLORS.black}}>{item.FULLNAME}</Text>
                                    </View>
                                    
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: COLORS.darkgrayText}}>{item['DESCRIPTION']}</Text>
                                    </View>
                                </View>
                                <View style={{marginLeft: SIZES.base}}>
                                    <Image
                                        source={path}
                                        resizeMode="cover"
                                        style= {{
                                            width: 25,
                                            height: 25,
                                            borderColor: COLORS.border,
                                            borderWidth: 1,
                                            padding: 1,
                                            borderRadius: 25,
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{marginLeft: SIZES.base*4, marginTop: 0, alignItems: 'flex-end', marginRight: SIZES.base*4}}> 
                            <Text style={{fontSize: 10, color: COLORS.darkgrayText}}>{convertDateTime(item['CREATED_TIME'])}</Text>
                        </View>
                    </View>
                    
                )
            }else{
                return (
                    <View>
                        <View style={{paddingTop: SIZES.base, flexDirection: 'row', paddingBottom: SIZES.base -5}}>
                            <View>
                                <View style={{marginRight: SIZES.base}}>
                                    <Image
                                        source={path}
                                        resizeMode="cover"
                                        style= {{
                                            width: 25,
                                            height: 25,
                                            borderColor: COLORS.border,
                                            borderWidth: 1,
                                            padding: 1,
                                            borderRadius: 25,
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{maxWidth: width_screen - 100,paddingBottom: SIZES.base, backgroundColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '400', color: COLORS.black}}>{item.FULLNAME}</Text>
                                </View>
                                
                                <View>
                                    <Text style={{color: COLORS.darkgrayText}}>{item['DESCRIPTION']}</Text>
                                </View>
                            </View>
                        
                        </View>
                        <View style={{marginLeft: SIZES.base*4, marginTop: 0}}> 
                            <Text style={{fontSize: 10, color: COLORS.darkgrayText}}>{convertDateTime(item['CREATED_TIME'])}</Text>
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
                        <Text style={{...FONTS.body4, fontWeight: 'bold', textTransform: 'uppercase', color: COLORS.black}}>Bình luận</Text>
                        <BorderHorizontal/>
                        {comments.length > 0 ? (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderItemComment}
                                data={comments}
                                keyExtractor={item => `f${item.ID}`}
                            />
                        ) : (
                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop:10}}>
                                <Image 
                                    source={icons.comments}
                                    resizeMode="cover"
                                    style= {{
                                        width: 30,
                                        height: 30,
                                        tintColor: COLORS.primary
                                    }}
                                />
                                <Text style={{color: COLORS.black, ...FONTS.body5, marginTop: SIZES.padding}}>Dữ liệu trống</Text>
                            </View>
                        )}
                        
                        <BorderHorizontal/>
                        <KeyboardAvoidingView>
                            <View>
                                <TextInput
                                    placeholder="Viết bình luận ..."
                                    style={styles.input}
                                    onChangeText={(val) => textInputChange(val)}
                                    value={textInput}
                                />
                            </View>
                            <View style={{marginBottom: SIZES.base}}>
                                <TouchableOpacity onPress={() => sendComment()}>
                                    <View style={{flexDirection: 'row', backgroundColor: COLORS.primary, width: 60, paddingHorizontal: SIZES.base, alignSelf: 'flex-end', borderRadius: 25, paddingVertical: 5}}>
                                        <Text style={{color: COLORS.white, paddingRight: 2}}>Gửi</Text>
                                        <Image 
                                            source={icons.send}
                                            resizeMode="cover"
                                            style= {{
                                                width: 18,
                                                height: 18,
                                                tintColor: COLORS.white
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    
                </View>
            </View>
        )
    }
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
                        {(data.ID_RPA == 14) && (renderInfomationDrive())}
                        {renderPurpose()}
                        {renderNote()}
                        {renderStage()}
                        {(data.TOTAL_FILE > 0) && (renderFileSignature())}
                        {(data.COUNTFILEATTACHS > 0) && (renderFileAttach())}
                        {renderUserSignature()}
                        {renderUserFollow()}
                        {renderComments()}
                    </ScrollView>
                )}
                
            </View>
            {renderBottomButton()}
            <View>
                <Modal isVisible={isModalVisible}>
                    <View style={{backgroundColor: COLORS.white, borderRadius: SIZES.padding}}>
                        {data.DOCUMENT_SIGN ? (
                            <>
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
                            </>
                        ): (
                            <>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        if(item.ID !== data.STAGE.ID) {
                                            return (
                                                <TouchableOpacity style={styles.stage} onPress={() => createNotification(item.ID)}>
                                                    <View style={styles.itemStage} >
                                                        <Text style={{color: `#${item.COLOR}`, ...FONTS.body4}}>{item.NAME}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                    
                                            )
                                        }else{
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
                                    keyExtractor={item => `sw${item.ID}`}
                                />
                            </>
                        )}
                        
                        
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
        shadowOpacity: Platform.OS === 'ios' ? 0.01 : 0.30,
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
    },
    input: {
        height: 40,
        marginTop: 12,
        marginBottom: 5,
        borderWidth: 1,
        padding: 10,
        borderColor: COLORS.white,
        borderRadius: 30,
        backgroundColor: COLORS.gray
    },
})

export default Detail;