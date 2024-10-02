import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import globalStyles from '../../assets/styles/GlobalStyles'
import { Images } from '../../assets/styles/Images'
import { dpFont, dpHeight } from '../../assets/styles/Sizes'
import { renderImage } from '../helpers/renderImage'
import { TouchableOpacity } from 'react-native'


const GalleryListComponent = (props) => {
    const { title, description, images, imageArray } = props;


    return (
        <TouchableOpacity style={styles.main} onPress={() => props.navigation.navigate('gallery_grid', { imageArray: imageArray })} >
            {
                images && images.length === 4 ?
                    <View style={styles.twoImg}>
                        {
                            images.map((item, i) => {
                                return (
                                    <View style={[styles.imgArea2]} key={i}>
                                        <Image
                                            source={item ? renderImage(item) : Images.noImg}
                                            style={globalStyles.image}
                                            resizeMode='cover'
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                    :
                    images && images.length === 3 ?
                        <View style={styles.twoImg}>
                            <View style={styles.col}>
                                <View style={styles.imgArea1} >
                                    <Image
                                        source={images ? renderImage(images[0]) : Images.noImg}
                                        style={globalStyles.image}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                            <View style={styles.col}>
                                {
                                    images.slice(1, 3).map((item, i) => {
                                        return (
                                            <View style={[styles.imgArea1, { height: dpHeight(24) / 2 }]} key={i}  >
                                                <Image
                                                    source={item ? renderImage(item) : Images.noImg}
                                                    style={globalStyles.image}
                                                    resizeMode='cover'
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        :
                        images && images.length === 2 ?
                            <View style={styles.twoImg}>
                                {
                                    images.map((item, i) => {
                                        return (
                                            <View style={styles.col} key={i}>
                                                <View style={styles.imgArea1}  >
                                                    <Image
                                                        source={item ? renderImage(item) : Images.noImg}
                                                        style={globalStyles.image}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            :
                            <>
                                {
                                    images.map((item, i) => {
                                        return (
                                            <View style={styles.imgArea} >
                                                <Image
                                                    source={item ? renderImage(item) : Images.noImg}
                                                    style={globalStyles.image}
                                                    resizeMode='cover'
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </>
            }
            <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
            <Text style={styles.post}>{description}</Text>
        </TouchableOpacity >
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
        marginBottom: dpHeight(4),
    },
    imgArea: {
        width: "100%",
        height: dpHeight(24),
        borderRadius: dpHeight(1),
        overflow: 'hidden',
        backgroundColor: Colors.lightGrey2
    },
    imgArea1: {
        width: "100%",
        height: dpHeight(24),
        backgroundColor: Colors.lightGrey2
    },
    imgArea2: {
        width: "50%",
        height: dpHeight(24) / 2,
        backgroundColor: Colors.lightGrey2
    },
    videoTitle: {
        fontSize: dpFont(16),
        color: Colors.black,
        fontFamily: Font.semiBold,
        paddingTop: dpHeight(1)
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: dpHeight(1)
    },
    mint: {
        fontSize: dpFont(14),
        color: Colors.darkGrey2,
        fontFamily: Font.regular
    },
    post: {
        fontSize: dpFont(14),
        color: Colors.cmsText,
        fontFamily: Font.regular,
        marginTop: dpHeight(1)
    },
    twoImg: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: dpHeight(1),
        overflow: 'hidden',
        flexWrap: 'wrap'
    },
    col: {
        flex: 0.5
    }
})

export default GalleryListComponent
