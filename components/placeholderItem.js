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
const PlaceholderItem= () => {
    return (
      <PlaceholderContainer
        style={styles.placeholderContainer}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Placeholder style={[styles.placeholder, {width: 50, height: 50, borderRadius: 50 }]} />
            <Placeholder style={[styles.placeholder, {width: 50, height: 7 }]} />
            <Placeholder style={[styles.placeholder, {width: 60, height: 7 }]} />
          </View>
          <View style={{width: '100%', justifyContent: 'center' }} >
            <Placeholder style={[styles.placeholder, {width: '70%', height: 12, marginBottom: 10 }]}/>
            <Placeholder style={[styles.placeholder, {width: '35%',  height: 7 }]}/>
            <Placeholder style={[styles.placeholder, {width: '35%', height: 7 }]} />
            <View style={{flexDirection: 'row'}}>  
              <Placeholder style={[styles.placeholder, {width: 30, height: 30, borderRadius: 30 }]} />
              <Placeholder style={[styles.placeholder, {width: 30, height: 30, borderRadius: 30 }]} />
              <Placeholder style={[styles.placeholder, {width: 30, height: 30, borderRadius: 30 }]} />
            </View>
          </View>
        </View>
      </PlaceholderContainer>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    placeholderContainer: {
  
        marginTop: 10,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.padding,
        marginBottom: SIZES.base*2
      },
      placeholder: {
        height: 8,
        marginTop: 6,
        marginLeft: 10,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 5
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
export default PlaceholderItem;