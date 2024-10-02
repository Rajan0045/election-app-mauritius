import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


const VideoEmbed = ({ htmlCode }) => {
  const screenWidth = "100%"
  const videoHeight = "100%"

  const extractVideoId = (html) => {
    const match = html.match(/src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(htmlCode);
  const directVideoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

  const modifiedHtmlCode = htmlCode.replace(/width="[^"]+"/g, 'width="100%"').replace(/height="[^"]+"/g, `height="${videoHeight}"`);

  return (
    <View style={[styles.container, { width: screenWidth, height: videoHeight }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: modifiedHtmlCode }}
        // source={{ uri:directVideoUrl }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('HTTP error: ', nativeEvent); // Log the error
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent); // Log the WebView error
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoEmbed;
