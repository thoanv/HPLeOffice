import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

const LineDivider = () => {
    return (
        <View style={{width: 1, paddingVertical: 5}}>
            <View style={{flex: 1, borderColor: COLORS.lightGray2, borderLeftWidth: 1}}></View>
        </View>
    )

}

const BookDetail = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let {book} = route.params;
        setBook(book)
    }, [book])

    function renderBookInfoSection() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.primary}}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0
                    }}
                />
                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: book.backgroundColor
                    }}
                >

                </View>
                {/* Navigation header */}
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.radius,
                    height: 40,
                    alignItems: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={{marginLeft: SIZES.base}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.navTintColor
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...FONTS.h3, color: book.navTintColor}}>Trình ký</Text>
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
                                tintColor: book.navTintColor,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{flex: 5, paddingTop: SIZES.padding2, alignItems: 'center'}}>
                    <Image
                        source={book.bookCover}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: "auto"
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{...FONTS.h2, color: book.navTintColor}}>
                        {book.bookName}
                    </Text>
                    <Text style={{...FONTS.body3, color: book.navTintColor}}>
                        {book.author}
                    </Text>
                </View>
                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor : 'rgba(0,0,0,0.5)',
                    }}
                >

                    {/* Rating */}
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>
                            {book.rating}
                        </Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Rating</Text>
                    </View>
                    <LineDivider />

                    {/* Papes */}
                    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: SIZES.radius}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>
                            {book.pageNo}
                        </Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Number of Page</Text>
                    </View>
                    <LineDivider />
                    {/* Language */}
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>
                            {book.language}
                        </Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Language</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {/* Custom Scrollbar */}
                <View style={styles.container}>
                    <Pdf
                        source={source}
                        onLoadComplete={(numberOfPages,filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}/>
                </View>
            </View>
        )
    }

    function renderBottomButton () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.primary}}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Bookmark")}
                >
                    <Image
                        source={icons.comment_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Bookmark")}
                >
                    <Text style={{color: COLORS.primary, ...FONTS.h3}}>Hủy</Text>
                </TouchableOpacity>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.lightGreen,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Start Reading")}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={icons.signature_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text style={{color: COLORS.white, ...FONTS.h3, marginLeft: SIZES.base}}>Xác nhận ký</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    if(book){
        return (
            <View style={styles.container}>
                {/* Book Cover Section */}
                <View style={{flex: 1}}>
                    {renderBookInfoSection()}
                </View>
                {/* Description */}
                <View style={{flex: 10}}>
                    {renderBookDescription()}
                </View>
                {/* Buttons */}
                <View style={{height: 70, marginBottom: 0}}>
                    {renderBottomButton()}
                </View>
            </View>
        )
    }else{
        return (
            <></>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black
    },
    pdf: {
            flex:1,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        }
})

export default BookDetail;