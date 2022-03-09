import React from 'react';
import {
    View,
} from 'react-native';
import { SIZES, COLORS } from '../constants';

const Dot = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems:'center', marginHorizontal: SIZES.base}}>
            <View style={{width: 3, height: 3, backgroundColor: COLORS.darkgray, borderRadius: 3}}></View>
        </View>
    )
}
export default Dot;