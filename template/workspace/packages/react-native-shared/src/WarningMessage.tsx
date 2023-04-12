import * as React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {ViewStyle, StyleProp} from 'react-native';

export interface WarningMessageProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  message: string;
}

export const WarningMessage = (props: WarningMessageProps) => {
  const {containerStyle, inputStyle, message} = props;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Text style={StyleSheet.flatten([styles.defaultInput, inputStyle])}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  defaultInput: {
    fontWeight: '400',
    textAlign: 'left',
  },
});
