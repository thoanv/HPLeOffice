import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    PlaceholderContainer,
    Placeholder,
  } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../constants';
const Gradient = () => {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{x: 1.0, y: 0.0}}
        end={{x: 0.0, y: 0.0}}
        style={{
          flex: 1,
          width: 120,
        }}
      />
    );
};
const PlaceholderDetail= () => {
    return (
        <View style={{marginHorizontal: SIZES.base*2}}>
            <PlaceholderContainer
                    style={styles.placeholderContainer}
                    animatedComponent={<Gradient />}
                    duration={1000}
                    delay={1000}
                >
                    <View style={{backgroundColor: '#FFF', flexDirection: 'row', borderBottomColor: COLORS.border, borderBottomWidth: 1, paddingBottom: SIZES.base, borderRadius: 10, marginBottom: SIZES.base*2}}>
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                        <Placeholder style={[styles.placeholder,{width: '80%',height: 15} ]} />
                        <View style={{marginTop: SIZES.base}}>
                          <Placeholder style={[styles.placeholder,{width: '30%',height: 12} ]} />
                          <View style={{flexDirection: 'row', paddingTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 20, borderRadius: 30} ]} />
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 20, borderRadius: 30} ]} />
                          </View>
                          {/* <View style={{flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                          </View>
                          <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder,{width: 30,height: 30, borderRadius: 30} ]} />
                            <Placeholder style={[styles.placeholder,{width: 30,height: 30, borderRadius: 30} ]} />
                            <Placeholder style={[styles.placeholder,{width: 30,height: 30, borderRadius: 30} ]} />
                          </View> */}
                        </View>
                        </View>
                    </View>
                    <View style={{ borderRadius: 10, marginBottom: SIZES.base*2,backgroundColor: '#FFF', flexDirection: 'row', borderBottomColor: COLORS.border, borderBottomWidth: 1, paddingBottom: SIZES.base, marginTop: SIZES.base}}>
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                          <Placeholder style={[styles.placeholder,{width: '80%',height: 15} ]} />
                          <View style={{marginTop: SIZES.base, flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 12,} ]} />
                            <Placeholder style={[styles.placeholder,{width: '50%',height: 12,} ]} />
                          </View>
                          <View style={{marginTop: SIZES.base, flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 12,} ]} />
                            <Placeholder style={[styles.placeholder,{width: '50%',height: 12,} ]} />
                          </View>
                          <View style={{marginTop: SIZES.base, flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 12,} ]} />
                            <Placeholder style={[styles.placeholder,{width: '50%',height: 12,} ]} />
                          </View>
                          <View style={{marginTop: SIZES.base, flexDirection: 'row'}}>
                            <Placeholder style={[styles.placeholder,{width: '30%',height: 12,} ]} />
                            <Placeholder style={[styles.placeholder,{width: '50%',height: 12,} ]} />
                          </View>
                        </View>
                    </View>
                    <View style={{borderRadius: 10, marginBottom: SIZES.base*2,backgroundColor: '#FFF', flexDirection: 'row', borderBottomColor: COLORS.border, borderBottomWidth: 1, paddingBottom: SIZES.base, marginTop: SIZES.base}}>
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                          <Placeholder style={[styles.placeholder,{width: '80%',height: 15} ]} />
                          <View style={{ flexDirection: 'row',  paddingBottom: SIZES.base, paddingTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                              <Placeholder style={[styles.placeholder,{width: '70%',height: 12} ]} />
                              <View style={{marginTop: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: SIZES.base}}>
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                </View>
                              </View>
                              
                            </View>
                            
                          </View>
                          <View style={{ flexDirection: 'row',  paddingBottom: SIZES.base, paddingTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                              <Placeholder style={[styles.placeholder,{width: '70%',height: 12} ]} />
                              <View style={{marginTop: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: SIZES.base}}>
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                </View>
                              </View>
                              
                            </View>
                            
                          </View>
                        </View>
                    </View>
                    <View style={{borderRadius: 10, marginBottom: SIZES.base*2,backgroundColor: '#FFF', flexDirection: 'row', borderBottomColor: COLORS.border, borderBottomWidth: 1, paddingBottom: SIZES.base, marginTop: SIZES.base}}>
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                          <Placeholder style={[styles.placeholder,{width: '80%',height: 15} ]} />
                          <View style={{ flexDirection: 'row',  paddingBottom: SIZES.base, paddingTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                              <Placeholder style={[styles.placeholder,{width: '70%',height: 12} ]} />
                              <View style={{marginTop: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: SIZES.base}}>
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                </View>
                              </View>
                              
                            </View>
                            
                          </View>
                          <View style={{ flexDirection: 'row',  paddingBottom: SIZES.base, paddingTop: SIZES.base}}>
                            <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                            <View
                                style={{
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                              <Placeholder style={[styles.placeholder,{width: '70%',height: 12} ]} />
                              <View style={{marginTop: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '30%',height: 10} ]} />
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: SIZES.base}}>
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                  <Placeholder style={[styles.placeholder,{width: '10%',height: 10} ]} />
                                </View>
                              </View>
                              
                            </View>
                            
                          </View>
                        </View>
                    </View>
                </PlaceholderContainer>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    placeholderContainer: {
        // width: WIDTH,
        // height: 200,
        marginTop: 10,
      },
      placeholder: {
        height: 8,
        marginTop: 6,
        marginLeft: 15,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 10
      },
      placeholderHeader:{
        height: 8,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
      },
      placeholderIma:{
        height: 8,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        marginLeft: -10
      },
      placeholderBody:{
        height: 8,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        marginLeft: 15
      },
      boxPlaceholder:{
        width: 50, 
        justifyContent: 'center', 
        alignItems: 'flex-start',
      },
})
export default PlaceholderDetail;