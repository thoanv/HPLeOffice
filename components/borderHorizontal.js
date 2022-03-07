import React from 'react';
import {
    View,
} from 'react-native';
import { SIZES, COLORS } from '../constants';

const BorderHorizontal = () => {
    return (
        <View style={{ paddingTop: SIZES.base}}>
            <View style={{flex: 1, borderColor: COLORS.border, borderWidth: 1}}></View>
        </View>
    )
}
export default BorderHorizontal;