import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../../assets/styles/Colors';
import { useSelector } from 'react-redux';

const Loader = ({ loader, home }) => {
  const apiStyleData = useSelector((state) => state.AppDynamicStyleReducer.styles);
  let apiColors = apiStyleData.colors ? apiStyleData.colors : null

  const renderLoader = () => {
    if (loader) {
      return (
        <View style={home ? styles.background2 : styles.background}>
          <ActivityIndicator size={40} color={apiColors?.primary || Colors.primary} />
        </View>
      );
    } else {
      return null;
    }
  };

  return renderLoader();
};

const styles = StyleSheet.create({
  background: {
    top: 0,
    left: 0,
    flex: 1,
    right: 0,
    bottom: 0,
    opacity: 0.8,
    zIndex: 9999,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  background2: {
    top: 0,
    left: 0,
    flex: 1,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default Loader;
