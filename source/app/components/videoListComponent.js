import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { dpFont, dpHeight } from '../../assets/styles/Sizes'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import { Icon } from '@rneui/themed'
import { IconsName, IconsType } from '../../assets/styles/Icon'
import { Dimension } from '../../assets/styles/Dimension'
import globalStyles from '../../assets/styles/GlobalStyles'
import VideoEmbed from './embededVideo'


const VideoListComponent = (props) => {
    const { title, length, created, description , index} = props;

    return (
        <View style={styles.main}>
            <View style={styles.videoArea}>
                <VideoEmbed
                    key={index}
                    htmlCode={description}
                />
            </View>
            <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
            <View style={styles.dateRow}>
                <Text style={styles.mint}>{length}</Text>
                <View style={globalStyles.Row}>
                    <Icon
                        type={IconsType.feather}
                        name={IconsName.clock}
                        color={Colors.darkGrey2}
                        size={Dimension.small}
                    />
                    <Text style={styles.post}>{created}</Text>
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.white,
        marginBottom: dpHeight(2),
    },
    videoArea: {
        width: "100%",
        height: dpHeight(24),
        borderRadius: dpHeight(1.2),
        overflow: 'hidden',
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
        fontSize: dpFont(13),
        color: Colors.darkGrey2,
        fontFamily: Font.regular,
        paddingLeft: dpHeight(0.5)
    }
})

export default VideoListComponent
