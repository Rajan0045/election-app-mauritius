import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import { useSelector } from 'react-redux';
import { Colors } from '../../../assets/styles/Colors';
import { Dimension } from '../../../assets/styles/Dimension';
import { Font } from '../../../assets/styles/FontsFamily';
import globalStyles from '../../../assets/styles/GlobalStyles';
import { IconsName, IconsType } from '../../../assets/styles/Icon';
import { dpBorderWidth, dpFont, dpHeight, dpImageHeight, dpSpacing } from '../../../assets/styles/Sizes';
import { renderImage } from '../../helpers/renderImage';

const GalleryGridScreen = (props) => {
    const imageArray = props.route && props.route.params && props.route.params.imageArray;
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;


    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const width = useWindowDimensions().width;
    const [visible, setIsVisible] = useState(false);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus && imageArray && imageArray.length > 0) {
            let array = imageArray.map((url) => renderImage(url));
            setImages(array)
        }
    }, [isFocus])


    const handleImageClick = (index) => {
        setIsVisible(true);
        setSelectedImageIndex(index);
    };



    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text> */}
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={styles.containerStyle}
                data={images ? images : []}
                keyExtractor={(item, index) => (item, index)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                numColumns={3}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[styles.grid, { width: width / 3 - dpBorderWidth(0.25) }]}
                        key={index}
                        onPress={() => handleImageClick(index)}
                    >
                        <Image
                            source={item}
                            style={globalStyles.image}
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                )}
            />
            {visible ?
                <ImageView
                    images={images ? images : []}
                    imageIndex={selectedImageIndex}
                    visible={visible}
                    onRequestClose={() => setIsVisible(false)}
                    HeaderComponent={
                        (e) => {
                            return (
                                <>
                                    <View style={styles.Row}>
                                        <View style={styles.col} />
                                        <View style={styles.col}>
                                            <Text style={styles.title}>{e.imageIndex + 1}/{images.length}</Text>
                                        </View>
                                        <View style={[styles.col, { alignItems: 'flex-end' }]}>
                                            <Icon
                                                type={IconsType.antDesign}
                                                name={IconsName.close}
                                                color={Colors.white}
                                                size={Dimension.large2}
                                                onPress={() => setIsVisible(false)}
                                            />
                                        </View>
                                    </View>
                                </>
                            )
                        }
                    }
                />
                :
                null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    currentImg: {
        fontSize: dpFont(16),
        color: Colors.white,
        marginVertical: 20,
        textAlign: 'center',
    },
    grid: {
        height: dpImageHeight(120),
        borderWidth: dpBorderWidth(0.5),
        borderColor: Colors.white
    },
    containerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(2),
        paddingTop: dpHeight(2)
    },
    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: dpSpacing(5),
        marginTop: dpHeight(2)
    },
    col: {
        flex: 0.3333
    },
    title: {
        fontSize: dpFont(15),
        color: Colors.white,
        fontFamily: Font.regular,
        textAlign: 'center'
    },
    ScrollView: {
        flex: 1
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: dpHeight(4)
    },
    headerTitle: {
        fontSize: dpFont(15),
        color: Colors.black3,
        fontFamily: Font.regular,
        paddingHorizontal: dpSpacing(5)
    }
});


export default GalleryGridScreen;

