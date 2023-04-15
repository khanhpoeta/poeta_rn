import * as React from 'react';
import {
  View,
  Image as RNImage,
  ImageStyle,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export interface ImageProps {
  /**
   * Children components
   *
   * @type {React.ReactNode}
   * @memberof TextProps
   */
  children?: React.ReactNode;

  /**
   * Style overrides for the image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the image container
   */

  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Image url.
   */
  url?: string;

  // Use FastImage
  useFastImage?: boolean;

  image?: ImageStyle;
}

export function Image(props: ImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    style: styleOverride,
    url,
    containerStyle,
    children,
    image,
    useFastImage = false,
  } = props;
  const style: StyleProp<ImageStyle> = [styles.root, styleOverride];
  if (url) {
    return (
      <View style={containerStyle}>
        {useFastImage == true ? (
          <FastImage
            // @ts-ignore
            style={style}
            source={{
              uri: url,
            }}
            onLoadEnd={() => setIsLoading(false)}
          />
        ) : (
          <RNImage
            style={style}
            source={{
              uri: url,
              cache: 'force-cache',
            }}
            onLoadEnd={() => setIsLoading(false)}
            resizeMode={'cover'}
          />
        )}
        {isLoading && (
          <View style={styles.indicatorView}>
            <ActivityIndicator color={'#CB997E'} size="small" />
          </View>
        )}
        {children}
      </View>
    );
  }

  if (image) {
    return <View style={containerStyle} />;
  }
  return <View />;
}

const styles = StyleSheet.create({
  root: {
    resizeMode: 'contain',
  },
  indicatorView: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
