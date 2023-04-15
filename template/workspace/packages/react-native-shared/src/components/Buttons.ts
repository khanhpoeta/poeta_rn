import {StyleSheet} from 'react-native';
import {CommonParams} from 'theme/theme';

export default function <C>({Colors, Gutters, Layout}: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.color_background_button_primary,
  };
  const rounded = {
    ...base,
    borderRadius: 20,
  };

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.color_background_button_primary,
      borderWidth: 2,
      borderColor: Colors.color_background_button_primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.color_background_button_primary,
      borderWidth: 2,
      borderColor: Colors.color_background_button_primary,
    },
  });
}
