import { Icon } from '@rneui/themed'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Dimension } from '../../assets/styles/Dimension'
import { Font } from '../../assets/styles/FontsFamily'
import globalStyles from '../../assets/styles/GlobalStyles'
import { IconsName, IconsType } from '../../assets/styles/Icon'
import { Images } from '../../assets/styles/Images'
import { dpFont, dpHeight, dpImageHeight } from '../../assets/styles/Sizes'
import { getExtension, getRelativeTime } from '../helpers/generals'
import { renderImage } from '../helpers/renderImage'


const NewsListComponent = (props) => {
    const {
        title,
        category,
        type,
        created,
        image,
        item,
        thumbnail,
        show_banner
    } = props;

    return (
        <View style={styles.main}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => props.navigation.navigate('news_details', { item: item })} style={styles.col1}>
                    <View style={styles.viewImg}>
                        {image && getExtension(image) === 'mp4' ?
                            <View style={styles.playBtn}>
                                <Icon
                                    type={IconsType.antDesign}
                                    name={IconsName.play}
                                    color={Colors.white}
                                    size={Dimension.large}
                                />
                            </View>
                            : null}

                        {parseInt(show_banner) === 1 ?
                            <Image
                                source={thumbnail ? renderImage(thumbnail) : Images.greyBackground}
                                style={globalStyles.image}
                                resizeMode="cover"
                            /> :
                            <Image
                                source={Images.greyBackground}
                                style={globalStyles.image}
                                resizeMode="cover"
                            />}

                    </View>
                </TouchableOpacity>
                <View style={styles.col2}>
                    <Text style={styles.locTxt} >{category}</Text>
                    <Text style={styles.title} numberOfLines={2} onPress={() => props.navigation.navigate('news_details', { item: item })}  >{title}</Text>
                    <View style={globalStyles.Row}>
                        {created ? <Icon
                            type={IconsType.feather}
                            name={IconsName.clock}
                            color={Colors.grey}
                            size={Dimension.small}
                            style={{ paddingTop: dpHeight(0.2) }}
                        /> : null}
                        <Text style={styles.created}>{getRelativeTime(created)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: dpHeight(3.5),
    },
    row: {
        flexDirection: 'row',
        columnGap: dpHeight(2)
    },
    col1: {
        flex: 0.32
    },
    col2: {
        flex: 0.68
    },
    viewImg: {
        height: dpImageHeight(100),
        width: '100%',
        borderRadius: dpHeight(1.2),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    locTxt: {
        fontSize: dpFont(14),
        color: Colors.darkGrey2,
        fontFamily: Font.regular,
        paddingBottom: dpHeight(0.4)
    },
    title: {
        fontSize: dpFont(16),
        color: Colors.black,
        fontFamily: Font.medium,
        lineHeight: dpFont(24),
        paddingBottom: dpHeight(0.6)
    },
    created: {
        fontSize: dpFont(14),
        color: Colors.darkGrey2,
        fontFamily: Font.regular,
        paddingLeft: dpHeight(1)
    },
    playBtn: {
        position: 'absolute',
        zIndex: 999,
        alignSelf: 'center',
    }
})

export default NewsListComponent
