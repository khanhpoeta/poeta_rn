/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const ColorPalette = {
  color_background: '#E5E5E5',
  color_brand_primary: '#0075E0',
  color_brand_secondary: '#61C835',
  color_neutral_light: '#FFFFFF',
  color_neutral_semi_dark: '#A0A0A0',
  color_neutral_dark: '#000000',
  color_highlight: '#E1FAF9',
  color_disabled: '#DCDCDC',
  color_highlight_row: '#fcf2de',
  color_border_input: '#d9d9d9',
  color_odd_table_row: '#FFFBF3',
  color_danger: '#F00303',
  color_info: '#29CDC6',
  color_warning: '#D36500',
  color_paid: '#D300CB',
  color_success: '#00760C',
  color_avatar: '#0038a4',
  color_light_mode_bg: '#f0f2f5',
  color_label_card: '#555555',
  color_placeholder: '#999999',
  color_shadow_card: '#E3E3E3',
  color_border_orderStatus: '#C2C2C2',
};

export const Colors = {
  color_background_reset: ColorPalette.color_neutral_dark,
  color_background_primary: ColorPalette.color_background,
  color_background_navigation_primary: ColorPalette.color_brand_primary,
  color_background_header_navigation_primary: ColorPalette.color_neutral_light,
  color_text_header_navigation_primary: ColorPalette.color_neutral_dark,
  color_background_status_primary: ColorPalette.color_neutral_light,
  color_background_status_secondary: ColorPalette.color_neutral_dark,

  color_text_dropdown_primary: ColorPalette.color_neutral_dark,
  color_border_dropdown_primary: ColorPalette.color_border_input,

  color_background_input_primary: ColorPalette.color_neutral_light,
  color_background_input_primary_disabled1: ColorPalette.color_border_input,
  color_background_input_primary_disabled2: ColorPalette.color_disabled,
  color_border_input_primary: ColorPalette.color_border_input,
  color_text_input_primary: ColorPalette.color_neutral_dark,
  color_text_input_secondary: ColorPalette.color_brand_primary,
  color_text_input_warning: ColorPalette.color_danger,
  color_placeholder_text_input_primary: ColorPalette.color_placeholder,

  color_background_container_primary: ColorPalette.color_neutral_light,
  color_background_container_secondary: ColorPalette.color_light_mode_bg,
  color_background_container_footer: ColorPalette.color_neutral_dark,
  color_background_container_disabled: ColorPalette.color_disabled,
  color_background_container_warning: ColorPalette.color_highlight_row,
  color_border_container_primary: ColorPalette.color_brand_primary,
  color_border_container_secondary: ColorPalette.color_neutral_semi_dark,
  color_border_container_disabled: ColorPalette.color_border_input,

  color_background_button_primary: ColorPalette.color_neutral_light,
  color_background_button_secondary: ColorPalette.color_brand_primary,
  color_background_button_avatar: ColorPalette.color_avatar,
  color_text_button_primary: ColorPalette.color_neutral_light,
  color_text_button_secondary: ColorPalette.color_brand_primary,
  color_text_button_inActive: ColorPalette.color_label_card,
  color_icon_button_primary: ColorPalette.color_neutral_dark,
  color_icon_button_primary_loading: ColorPalette.color_neutral_light,
  color_icon_button_avatar: ColorPalette.color_avatar,
  color_border_button_primary: ColorPalette.color_border_input,

  color_border_button_outline_primary: ColorPalette.color_brand_primary,
  color_text_button_outline_primary: ColorPalette.color_brand_primary,
  color_background_button_outline_primary: ColorPalette.color_neutral_light,

  color_background_button_linear_primary: ColorPalette.color_brand_primary,
  color_background_button_linear_secondary: ColorPalette.color_brand_secondary,

  color_text_label_primary: ColorPalette.color_neutral_dark,
  color_text_label_secondary: ColorPalette.color_neutral_light,
  color_text_label_footer: ColorPalette.color_neutral_semi_dark,
  color_text_label_card: ColorPalette.color_label_card,
  color_text_label_warning: ColorPalette.color_danger,
  color_text_label_info: ColorPalette.color_brand_primary,

  color_border_card_primary: ColorPalette.color_border_input,
  color_border_card_secondary: ColorPalette.color_neutral_light,
  color_background_card_primary: ColorPalette.color_light_mode_bg,
  color_background_card_secondary: ColorPalette.color_neutral_light,
  color_shadow_card_primary: ColorPalette.color_shadow_card,

  color_activity_indicator_primary: ColorPalette.color_brand_primary,
  color_icon_tab_primary_active: ColorPalette.color_brand_primary,
  color_icon_tab_primary_inActive: ColorPalette.color_neutral_semi_dark,
  color_background_tab_primary: ColorPalette.color_neutral_light,
  color_icon_primary: ColorPalette.color_placeholder,

  color_background_image_primary: ColorPalette.color_light_mode_bg,
  color_background_image_secondary: ColorPalette.color_border_input,
  color_border_image_primary: ColorPalette.color_border_input,
  color_background_search_primary: ColorPalette.color_neutral_light,
  color_border_search_primary: ColorPalette.color_border_input,
  color_background_modal_primary: ColorPalette.color_light_mode_bg,
  color_background_dropdown_primary: ColorPalette.color_neutral_light,

  color_text_label_orderStatusSubmitted: ColorPalette.color_brand_primary,
  color_text_label_orderStatusBackOrder: ColorPalette.color_neutral_dark,
  color_text_label_orderStatusInProgress: ColorPalette.color_info,
  color_text_label_orderStatusRejected: ColorPalette.color_danger,
  color_text_label_orderStatusNeedPayment: ColorPalette.color_success,
  color_text_label_orderStatusPaid: ColorPalette.color_paid,
  color_text_label_orderStatusCompleted: ColorPalette.color_brand_secondary,
  color_text_label_orderStatusRefill: ColorPalette.color_brand_primary,
  color_text_label_orderStatusProcessing: ColorPalette.color_warning,
  color_text_label_orderStatusCanceled: ColorPalette.color_neutral_semi_dark,
  color_border_label_orderStatus: ColorPalette.color_border_orderStatus,
};

export const NavigationColors = {
  primary: Colors.color_background_navigation_primary,
};

/**
 * FontSize
 */
export const FontSize = {
  xs: 12,
  sm: 13,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
};

export enum FontWeight {
  regular = '400',
  medium = '500',
  semibold = '600',
  bold = '700',
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const xregular = tiny * 4; // 20
const large = regular * 2; // 30
const xlarge = large * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  xregular,
  large,
  xlarge,
};

export default {
  ColorPalette,
  Colors,
  NavigationColors,
  FontSize,
  FontWeight,
  MetricsSizes,
};
