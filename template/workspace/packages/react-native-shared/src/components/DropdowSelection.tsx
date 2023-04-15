import SelectDropdown from 'react-native-select-dropdown';
import {
  ViewStyle,
  StyleProp,
  Text,
  StyleSheet,
  View,
  TextStyle,
  Platform,
} from 'react-native';
import {defaultTheme, fonts, renderNode, Theme} from '@rneui/base';
import React from 'react';

export interface ISelectionItem {
  name: string;
  value: any;
}

const renderText = (content: any, defaultProps: any, style: StyleProp<any>) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export interface IUserRelationshipProps {
  value: any;
  /**
   * array of data that will be represented in dropdown, can be array of objects
   */
  data: Array<ISelectionItem>;
  /**
   * Style for container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for container
   */
  rowStyle?: StyleProp<ViewStyle>;
  /**
   * disables the input component
   */
  disabled?: boolean;
  /**
   * disabled styles that will be passed to the style props of the React Native TextInput
   */
  disabledInputStyle?: StyleProp<TextStyle>;
  /**
   * styling for Input Component Container
   */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /**
   * styling for left Icon Component container
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * styling for right Icon Component container
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for Input Component
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * component that will be rendered in place of the React Native TextInput
   * @type React Component
   */
  InputComponent?: React.ComponentType | React.ForwardRefExoticComponent<any>;
  /**
   * props to be passed to the React Native Text component used to display the error message
   */
  errorProps?: object;
  /**
   * add styling to error message
   */
  errorStyle?: StyleProp<TextStyle>;
  /**
   * Error message to be displayed under the input field
   */
  errorMessage?: string;
  /**
   * add a label on top of the input
   */
  label?: string | React.ReactNode;
  /**
   * styling for the label; You can only use this if label is a string
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * props to be passed to the React Native Text component used to display the label or React Component used instead of simple string in label prop
   */
  labelProps?: object;
  /**
   * If the error message container should be rendered (take up vertical space). If false, when showing errorMessage, the layout will shift to add it at that time.
   */
  renderErrorMessage?: boolean;

  onChangeSelection: (value?: any) => void;
}

export class DropdowSelection extends React.Component<
  IUserRelationshipProps & {theme?: Theme}
> {
  static displayName = 'DropdowSelection';

  render() {
    const {
      data,
      containerStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      theme = defaultTheme,
      renderErrorMessage = true,
      inputStyle,
      inputContainerStyle,
      value,
      rowStyle,
      onChangeSelection,
    } = this.props;

    const displayValue = data
      .filter(item => item.value === value)
      .shift()?.name;
    const handleSelectionChange = (selectedItem: ISelectionItem) => {
      onChangeSelection(selectedItem.value);
    };

    const hideErrorMessage = !renderErrorMessage && !errorMessage;

    return (
      <View
        testID="RNE__Input__view-wrapper"
        style={StyleSheet.flatten([styles.container, containerStyle])}>
        {renderText(
          label,
          {style: labelStyle, ...labelProps},
          {
            fontSize: 16,
            color: theme?.colors?.grey3,
            ...Platform.select({
              android: {
                ...fonts.android.bold,
              },
              default: {
                fontWeight: 'bold',
              },
            }),
          },
        )}
        <SelectDropdown
          data={data}
          onSelect={selectedItem => {
            handleSelectionChange(selectedItem);
          }}
          defaultButtonText={displayValue ?? ''}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
          buttonStyle={StyleSheet.flatten([
            inputContainerStyle,
            styles.dropdownStyle,
          ])}
          buttonTextStyle={[inputStyle, styles.dropdown2BtnTxtStyle]}
          dropdownStyle={styles.dropdownContainerStyle}
          rowStyle={rowStyle}
          rowTextStyle={[styles.dropdown2BtnTxtStyle, inputStyle]}
        />

        <Text
          {...errorProps}
          style={StyleSheet.flatten([
            {
              margin: 5,
              fontSize: 12,
              color: theme?.colors?.error,
            },
            errorStyle && errorStyle,
            hideErrorMessage && {
              height: 0,
              margin: 0,
              padding: 0,
            },
          ])}>
          {errorMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  disabledInput: {
    opacity: 0.5,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    marginVertical: 4,
  },
  dropdownStyle: {
    width: '100%',
  },
  dropdown2BtnTxtStyle: {
    textAlign: 'left',
  },
  dropdownContainerStyle: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
