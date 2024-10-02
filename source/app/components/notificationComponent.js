import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../assets/styles/Colors'
import { Font } from '../../assets/styles/FontsFamily'
import { dpBorderWidth, dpFont, dpHeight, dpSpacing } from '../../assets/styles/Sizes'


const NotificationComponent = (props) => {
    const {
        title,
        read,
        created
    } = props;

    return (
        <View style={[styles.main, !read ? styles.unreadNotification : null]}>
            <View style={styles.row}>
                <View style={styles.col1}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.col2}>
                    <Text style={styles.created}>{created}</Text>
                </View>
            </View>
            <Text style={styles.update}>Update your app and get new features </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingVertical: dpHeight(1.8),
        paddingHorizontal: dpSpacing(5)
    },
    row: {
        flexDirection: 'row',
        columnGap: dpHeight(2)
    },
    col1: {
        flex: 0.78
    },
    col2: {
        flex: 0.22,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: dpFont(16),
        color: Colors.black,
        fontFamily: Font.bold
    },
    created: {
        fontSize: dpFont(13),
        color: Colors.secondary,
        fontFamily: Font.regular
    },
    update: {
        fontSize: dpFont(14),
        color: Colors.grey,
        fontFamily: Font.regular,
        paddingTop: dpHeight(0.8)
    },
    unreadNotification: {
        backgroundColor: Colors.unreadNotifi,
        borderBottomWidth: dpBorderWidth(0.3),
        borderColor: Colors.lightGrey
    }
})

export default NotificationComponent
