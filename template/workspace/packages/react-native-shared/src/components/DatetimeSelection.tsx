import DatePicker from 'react-native-date-picker';
import {Icon, Input, InputProps, Theme} from '@rneui/base';
import {format} from 'date-fns';
import React, {LegacyRef, Ref} from 'react';
import {TextInput} from 'react-native';

interface IDateTimeSelectionProps extends InputProps {
  /**
   * Date time format
   */
  datetimeFormat?: string;
  /**
   * Default date value
   */
  currentDate?: Date;
  /**
   * The max selection date
   */
  maxDate?: Date;
  /**
   * On Date change value
   */
  onDateChange: (date?: number) => void;
}

interface IDatetimeSelectionState {
  open: boolean;
  date?: Date;
  datetimeFormat?: string;
}

export class DatetimeSelection extends React.Component<
  IDateTimeSelectionProps & {theme?: Theme},
  IDatetimeSelectionState
> {
  static displayName = 'DatetimeSelection';
  textInput: React.RefObject<Input>;

  constructor(props: IDateTimeSelectionProps) {
    super(props);
    this.textInput = React.createRef<Input>();

    this.state = {
      open: false,
      date: props.currentDate,
      datetimeFormat: props.datetimeFormat,
    };
  }

  render() {
    const {
      onBlur,
      errorMessage,
      placeholder,
      errorStyle,
      label,
      inputStyle,
      inputContainerStyle,
      labelStyle,
      maxDate,
      onDateChange,
    } = this.props;

    const onSelectionChange = (date?: Date) => {
      if (date !== undefined) {
        onDateChange(Math.trunc(date.valueOf() / 1000));
      } else {
        onDateChange(undefined);
      }
      this.setState({open: false, date: date});
    };

    const blur = () => {
      this.setState({open: false});
      this.textInput.current.blur();
    };

    return (
      <>
        <Input
          ref={this.textInput as LegacyRef<Input> & Ref<TextInput>}
          value={
            this.state.date
              ? format(
                  this.state.date,
                  this.state.datetimeFormat ?? 'yyyy-MM-dd',
                )
              : ''
          }
          onBlur={onBlur}
          onPressIn={() => {
            this.setState({open: true});
          }}
          clearButtonMode="never"
          errorMessage={errorMessage}
          placeholder={placeholder}
          rightIcon={
            this.state.date ? (
              <Icon
                name="close"
                size={20}
                onPress={() => {
                  onSelectionChange(undefined);
                }}
              />
            ) : (
              <></>
            )
          }
          errorStyle={errorStyle}
          label={label}
          inputContainerStyle={inputContainerStyle}
          inputStyle={inputStyle}
          labelStyle={labelStyle}
        />
        <DatePicker
          modal
          mode={'date'}
          maximumDate={maxDate}
          open={this.state.open}
          date={this.state.date ?? new Date()}
          onConfirm={date => {
            onSelectionChange(date);
          }}
          onCancel={blur}
        />
      </>
    );
  }
}
