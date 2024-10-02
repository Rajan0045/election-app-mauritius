import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import styles from './style'
import NotificationComponent from '../../components/notificationComponent'
import EmptyStatesNotifications from '../../components/EmptyStatesNotifications'
import { useSelector } from 'react-redux'


const Notifications = (props) => {
    const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
    let apiColors = apiStyleData.colors ? apiStyleData.colors : null;

    const [list, setList] = useState([
        {
            id: 1,
            title: 'New Update Available!',
            read: false,
            created: '1 day ago'
        },
        {
            id: 2,
            title: 'New Voter Register',
            read: false,
            created: '2 days ago'
        },
        {
            id: 3,
            title: 'New Update Available!',
            read: true,
            created: '2 days ago'
        },
        {
            id: 4,
            title: 'New Voter Register',
            read: true,
            created: '1 day ago'
        },
        {
            id: 5,
            title: 'New Update Available!',
            read: true,
            created: '2 days ago'
        },
        {
            id: 6,
            title: 'New Voter Register',
            read: true,
            created: '2 days ago'
        },
    ])

    return (
        <View style={styles.main}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={styles.containerStyle}
                data={list ? list : []}
                keyExtractor={(item, index) => (item, index)}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({ item, index }) => (
                    <NotificationComponent
                        title={item && item.title}
                        read={item && item.read}
                        created={item && item.created}
                    />
                )}
                ListEmptyComponent={<EmptyStatesNotifications />}
            />
        </View>
    )
}

export default Notifications
