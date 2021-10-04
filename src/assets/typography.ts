import {StyleSheet} from 'react-native';
import {colors} from './colors';

const fontFamily = 'Montserrat';

export const typography = StyleSheet.create({
  appHeader: {
    fontFamily,
    fontSize: 30,
    color: colors.text.primary,
  },
  header: {
    fontFamily,
    fontSize: 20,
    color: colors.text.primary,
  },
  headerAction: {
    fontFamily,
    fontSize: 20,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontFamily,
    fontSize: 30,
    color: colors.text.primary,
  },
  title: {
    fontFamily,
    fontSize: 15,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily,
    fontSize: 13,
    color: colors.text.secondary,
  },
});
