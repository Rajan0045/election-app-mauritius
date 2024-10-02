import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StatusBar, Text, useWindowDimensions, View } from 'react-native'
import HTML from 'react-native-render-html'
import { Colors } from '../../../assets/styles/Colors'
import { Font } from '../../../assets/styles/FontsFamily'
import globalStyles from '../../../assets/styles/GlobalStyles'
import { Images } from '../../../assets/styles/Images'
import styles from './style'
import { renderImage } from '../../helpers/renderImage'

const NewsDetails = (props) => {
    const item = props && props.route && props.route.params && props.route.params.item;
    const [newsDatail, setNewsDetail] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);
    const contentWidth = useWindowDimensions().width;
    const systemFonts = [Font.bold, Font.thin, Font.regular];
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus && item) {
            setNewsDetail(item)
        }
    }, [isFocus]);


    return (
        <>
            <StatusBar
                backgroundColor={fullScreen ? Colors.black : Colors.background}
                barStyle={fullScreen ? "light-content" : "dark-content"}
            />
            <View style={styles.main}>
                {newsDatail &&
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <Text style={styles.title} >{newsDatail && newsDatail.title ? newsDatail.title : null}</Text>
                        <View style={styles.viewImg}>
                            {/* <Video
                                source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                                style={globalStyles.image}
                                resizeMode={fullScreen ? "contain" : "cover"}
                                controls={true}
                                playInBackground={false}
                                playWhenInactive={false}
                                repeat={false}
                                fullscreen={false}
                                onFullscreenPlayerWillPresent={() => setFullScreen(true)} // Called when entering full-screen
                                onFullscreenPlayerDidDismiss={() => setFullScreen(false)}
                                bufferConfig={{
                                    minBufferMs: 15000,
                                    maxBufferMs: 50000,
                                    bufferForPlaybackMs: 2500,
                                    bufferForPlaybackAfterRebufferMs: 5000
                                }}
                                paused={true}
                            // muted={}
                            // poster={}
                            // posterResizeMode={'cover'}
                            />  */}
                            {newsDatail && parseInt(newsDatail.show_banner) === 1 ?
                                <Image
                                    source={newsDatail && newsDatail.image ? renderImage(newsDatail.image) : Images.greyBackground}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                /> :
                                <Image
                                    source={Images.greyBackground}
                                    style={globalStyles.image}
                                    resizeMode="cover"
                                />
                            }
                        </View>
                        <View style={styles.subBody}>
                            <HTML
                                source={{ html: newsDatail && newsDatail.description }}
                                contentWidth={contentWidth}
                                tagsStyles={styles.contentStyle}
                                systemFonts={systemFonts}
                            />
                        </View>
                    </ScrollView>}
            </View>
        </>
    )
};

export default NewsDetails
