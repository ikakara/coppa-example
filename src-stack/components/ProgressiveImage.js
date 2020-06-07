// https://snack.expo.io/@wcandillon/progressive-image-loading
import React, { useState, useEffect } from "react";
import { Image, Animated, StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo";

if (Platform.OS === "ios") {
  const AnimatedImage = Animated.createAnimatedComponent(BlurView);
}

export default function ProgressiveImage(props) {
  const { preview, uri, style } = props;
  const [_uri, updateUri] = useState(preview);
  const [intensity, updateIntensity] = useState(new Animated.Value(100));

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    console.log("in fetchImage " + uri);
    if (uri instanceof Promise) {
      uri
        .then((image) => {
          Image.prefetch(image);
          updateUri(image);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      await Image.prefetch(uri);
      updateUri(uri);
    }
  }

  function onLoadEnd(euri) {
    console.log("in onLoadEnd");
    if (euri == preview) {
      //updateIntensity(new Animated.Value(100));
      Animated.timing(intensity, {
        duration: 5000,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }

  const computedStyle = [StyleSheet.absoluteFill, style];
  return (
    <View {...{ style }}>
      {_uri && (
        <Image
          source={{ uri: _uri }}
          resizeMode="contain"
          style={computedStyle}
          onLoadEnd={() => onLoadEnd(_uri)}
        />
      )}
      {Platform.OS === "ios" && (
        <AnimatedImage
          tint="default"
          style={computedStyle}
          {...{ intensity }}
        />
      )}
    </View>
  );
}
