import React, { Component } from 'react';
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
export default class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:1, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/12472/a675e39808194d91abec863ea67d0fae/main/4e6/4e66e4fb4547eacd276d40994d160b21/Avatar.png", name:"Trần Công Hậu",    comment:"Gửi trình ký xác nhận công tháng 2."},
        {id:2, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18200/a675e39808194d91abec863ea67d0fae/main/171/171e09e442914ede8807c1eff35078bd/8b90fa55333bc865912a.png", name:"Doãn Viết Hạnh",     comment:"Đã xác nhận công tháng 2."},
        {id:3, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/11897/a675e39808194d91abec863ea67d0fae/main/073/07365116eceee871e5808c353be05a52/103322229_3047704648646610_3956645873692175894_n.png", name:"Nguyễn Quốc Hoàng", comment:"Đã xác nhận công tháng 3."},
        {id:4, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/12472/a675e39808194d91abec863ea67d0fae/main/4e6/4e66e4fb4547eacd276d40994d160b21/Avatar.png", name:"Trần Công Hậu",  comment:"Đã xác nhận công tháng 2."},
        {id:5, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18476/a675e39808194d91abec863ea67d0fae/main/368/368edeb236f40dd77fc67cc80457f7b5/thoa.png", name:"Nguyễn Văn Thỏa",  comment:"Đã xác nhận công tháng 2."},
        {id:6, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/11897/a675e39808194d91abec863ea67d0fae/main/073/07365116eceee871e5808c353be05a52/103322229_3047704648646610_3956645873692175894_n.png", name:"Nguyễn Quốc Hoàng", comment:"Đã xác nhận công tháng 2."},
        {id:7, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/12472/a675e39808194d91abec863ea67d0fae/main/4e6/4e66e4fb4547eacd276d40994d160b21/Avatar.png", name:"Trần Công Hậu",      comment:"Đã xác nhận công tháng 2."},
        {id:8, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/12472/a675e39808194d91abec863ea67d0fae/main/4e6/4e66e4fb4547eacd276d40994d160b21/Avatar.png", name:"Trần Công Hậu",    comment:"Đã xác nhận công tháng 2."},
        {id:9, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18200/a675e39808194d91abec863ea67d0fae/main/171/171e09e442914ede8807c1eff35078bd/8b90fa55333bc865912a.png", name:"Doãn Viết Hạnh",     comment:"Đã xác nhận công tháng 2."},
        {id:10, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/11897/a675e39808194d91abec863ea67d0fae/main/073/07365116eceee871e5808c353be05a52/103322229_3047704648646610_3956645873692175894_n.png", name:"Nguyễn Quốc Hoàng", comment:"Đã xác nhận công tháng 3."},
        {id:11, image: "https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/12472/a675e39808194d91abec863ea67d0fae/main/4e6/4e66e4fb4547eacd276d40994d160b21/Avatar.png", name:"Trần Công Hậu",  comment:"Đã xác nhận công tháng 2."},
        
      ]
    }
  }

  render() {
    return (
     <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{height: 45}}>
            <LinearGradient
                start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1.5}}
                colors={['#FF9417', '#FEDC10']}
                style={{
                    flex: 1,
                }}
            >
                <View style={{  textAlignVertical: 'center', textDecorationLine: 'line-through', marginTop: SIZES.padding, marginHorizontal: SIZES.base*2 }}>
                    <Text style={{...FONTS.h5, color: COLORS.white}}>Thông báo</Text>
                </View>
                
            </LinearGradient>
          </View>
        </View>
        <View style={{flex: 10, marginTop: -10}}>
          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
            keyExtractor={(item)=>{
              return item.id;
            }}
            renderItem={(item) => {
              const Notification = item.item;
              return(
                <View style={styles.container}>
                  <TouchableOpacity onPress={() => {}}>
                    <Image style={styles.image} source={{uri: Notification.image}}/>
                  </TouchableOpacity>
                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text  style={styles.name}>{Notification.name}</Text>
                      <Text style={styles.time}>
                        9:58 am
                      </Text>
                    </View>
                    <Text rkType='primary3 mediumLine' style={{color: COLORS.black}}>{Notification.comment}</Text>
                  </View>
                </View>
              );
            }}/>
        </View>
    </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:SIZES.base
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
    color: COLORS.black
  },
}); 