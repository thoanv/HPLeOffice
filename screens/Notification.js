import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES, FONTS, COLORS } from '../constants';
import { POST_DATA } from './ultils/api';
import PlaceholderNoti from '../components/placeholderNoti';
const Notification = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [notifications, setNotifications] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0)
  const [empty, setEmpty] = useState(false);
  const [emptyFirst, setEmptyFirst] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function fetchList() {
        setIsLoadingData(true)
        let payload = {
          'page': page,
        };
        console.log(payload);
        let url = '/signature-notifications.php';
        POST_DATA(`${url}`, payload).then(res => {
          if (res['success'] == 1) {
            if (res['data'].length) {
              setNotifications(res['data']);
              setIsLoadingData(false)
              setPage(page + 1);
            }
          }
          setIsLoadingData(false)
        }).catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });
      }
      fetchList();
    });
    return unsubscribe;
  }, []);
  const fetchData = () => {
    let pa = 0;
    let payload = {
      'page': pa,
    };
    let url = '/signature-notifications.php';
    POST_DATA(`${url}`, payload).then(res => {
      setPage(pa)
      if (res['success'] == 1) {
        setNotifications(res['data']);
      }
      setPage(pa + 1);
      setIsFetching(false);
      setIsLoadingData(false)
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }
  const _handleOnRefresh = () => {
    setIsFetching(true);
    setPage(0);
    setEmpty(false);
    setIsLoading(false)
    setIsLoadingData(true);
    setNotifications([])
    fetchData();
  }
  const _onEndReachedLoad = () => {
    setIsLoading(true)
    let payload = {
      'page': page,
    };
    let url = '/signature-notifications.php';
    POST_DATA(`${url}`, payload).then(res => {
      if (res['success'] == 1) {
        if (res['data'].length) {
          const result = notifications.concat(res['data']);
          setNotifications(result);
          setPage(page + 1);
        } else {
          setEmpty(true)
        }

      }
      setIsLoading(false)
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }
  const convertDateTime = (time) => {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
      return;

    return day_diff == 0 && (
      diff < 60 && "vừa xong" ||
      diff < 120 && "1 phút trước" ||
      diff < 3600 && Math.floor(diff / 60) + " phút trước" ||
      diff < 7200 && "1 giờ trước" ||
      diff < 86400 && Math.floor(diff / 3600) + " giờ trước") ||
      day_diff == 1 && "hôm qua" ||
      day_diff < 7 && day_diff + " ngày trước" ||
      day_diff < 31 && Math.ceil(day_diff / 7) + " tuần trước";
  }
  function showNotification() {
    const renderItem = ({ item }) => {
      let owner = item.owner;
      let bgColor = item.status == 1 ? "#eee" : COLORS.white;
      let borderColor = item.status == 1 ? COLORS.white : "#ccc";
      return (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", {
          ID_RPA: item.rpa_type_id,
          ID_TASK: item.rpa_stage_id,
          FLAG: item.status == 1 ? item.id : 0,
        })}>
          <View style={[styles.container, { backgroundColor: bgColor, borderBottomColor: borderColor, }]}>
            <View>
              <Image style={styles.image} source={{ uri: owner.PATH }} />
            </View>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{item.title}</Text>

              </View>
              <Text rkType='primary3 mediumLine' style={{ color: COLORS.black }}>{item.content}</Text>
              <Text style={styles.time}>
                {convertDateTime(item.created_at)}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ flex: 10, marginTop: -22 }}>
        <FlatList
          refreshing={isFetching}
          onRefresh={() => _handleOnRefresh()}
          onEndReachedThreshold={1.5}
          onEndReached={() =>
            _onEndReachedLoad()
          }
          showsHorizontalScrollIndicator={false}
          style={styles.root}
          data={notifications}
          ListFooterComponent={() => (empty == true ? 
                    <View style={{justifyContent:'center', alignItems: 'center'}}><Text>Dữ liệu trống</Text></View> 
                    : <PlaceholderNoti/>)}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ height: 45 }}>
          <LinearGradient
            start={{ x: 0.5, y: 0.5 }} end={{ x: 0.5, y: 1.5 }}
            colors={['#FF9417', '#FEDC10']}
            style={{
              flex: 1,
            }}
          >
            <View style={{ textAlignVertical: 'center', textDecorationLine: 'line-through', marginTop: SIZES.padding, marginHorizontal: SIZES.base * 2 }}>
              <Text style={{ ...FONTS.h5, color: COLORS.white }}>Thông báo</Text>
            </View>

          </LinearGradient>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 15 }}>
        {isLoadingData ? (
          <>
            <PlaceholderNoti />
            <PlaceholderNoti />
            <PlaceholderNoti />
            <PlaceholderNoti />
            <PlaceholderNoti />
            <PlaceholderNoti />
            <PlaceholderNoti />
          </>
        ) : (
          showNotification()
        )}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f1f1f1",
  },
  container: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    flexDirection: 'row',
    alignItems: 'flex-start',
    
    borderBottomWidth: 1
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
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: SIZES.base
  },
  time: {
    fontSize: 11,
    color: "#808080",
    marginTop: 5
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black
  },
});
export default Notification;