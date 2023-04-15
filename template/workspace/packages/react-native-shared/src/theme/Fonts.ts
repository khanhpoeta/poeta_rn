/**
 * This file contains all application's style relative to fonts
 */
import {StyleSheet} from 'react-native';
import {ThemeVariables} from './theme';

export default function ({FontSize, FontWeight}: ThemeVariables) {
  return StyleSheet.create({
    xsRegular: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.regular,
    },
    smRegular: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.regular,
    },
    base: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.regular,
    },
    lgRegular: {
      fontSize: FontSize.lg,
      fontWeight: FontWeight.regular,
    },
    xlRegular: {
      fontSize: FontSize.xl,
      fontWeight: FontWeight.regular,
    },
    xxlRegular: {
      fontSize: FontSize.xxl,
      fontWeight: FontWeight.regular,
    },
    xsMedium: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.medium,
    },
    smMedium: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.medium,
    },
    baseMedium: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.medium,
    },
    lgMedium: {
      fontSize: FontSize.lg,
      fontWeight: FontWeight.medium,
    },
    xlMedium: {
      fontSize: FontSize.xl,
      fontWeight: FontWeight.medium,
    },
    xxlMedium: {
      fontSize: FontSize.xxl,
      fontWeight: FontWeight.medium,
    },
    xsSemiBold: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.semibold,
    },
    smSemiBold: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.semibold,
    },
    baseSemiBold: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.semibold,
    },
    lgSemiBold: {
      fontSize: FontSize.lg,
      fontWeight: FontWeight.semibold,
    },
    xlSemiBold: {
      fontSize: FontSize.xl,
      fontWeight: FontWeight.semibold,
    },
    xxlSemiBold: {
      fontSize: FontSize.xxl,
      fontWeight: FontWeight.semibold,
    },
    xsBold: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.bold,
    },
    smBold: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.bold,
    },
    baseBold: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.bold,
    },
    lgBold: {
      fontSize: FontSize.lg,
      fontWeight: FontWeight.bold,
    },
    xlBold: {
      fontSize: FontSize.xl,
      fontWeight: FontWeight.bold,
    },
    xxlBold: {
      fontSize: FontSize.xxl,
      fontWeight: FontWeight.bold,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  });
}
