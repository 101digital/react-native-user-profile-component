import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: SelectGenderModalStyles): SelectGenderModalStyles => {
  const theme = useContext(ThemeContext);

  const defaultStyles: SelectGenderModalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.LightGrayBackground, // Access theme colors
      padding: 8,
      paddingTop: 33,
    },
    userInfo: {
      marginTop: 16,
      width: '100%',
      paddingHorizontal: 8,
    },
    subtitle:{
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 20,
      color:theme.colors.Black
    },
    fieldLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    input: {
      fontSize: 16,
      marginBottom: 16,
      backgroundColor: 'white',
      width: '90%',
    },
    activeInput: {
      borderColor: theme.colors.Black1B, // Use theme colors
      borderWidth: 1,
    },
    inputIconWrapper: {
      alignSelf: 'center',
    },
    inputWrapper: {
      flex: 1,
      paddingHorizontal: 8,
      flexDirection: 'row',
    },
    inputContent: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 12,
      height: 55,
      overflow: 'hidden',
    },
    errorText: {
      color: theme.colors.Red, // Use theme colors
    },
    errorInput: {
      borderColor: theme.colors.Red,
    },
    saveButtonContainer: {
      marginTop: 20,
      alignSelf: 'center',
    },
    successMessage: {
      color: theme.colors.GreenSuccess, // Use theme colors
      textAlign: 'center',
      marginBottom: 10,
    },
    errorMessage: {
      color: theme.colors.Red, // Use theme colors
      textAlign: 'center',
      marginBottom: 10,
    },
    selectorWrapper:{
      margin: 0,
      justifyContent: 'flex-end'
    },
    selectorContainer: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16,
    },
    selectorTitle : {
      textAlign:'center',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 32,
      letterSpacing: -0.12,
      color:theme.colors.Black1B,
    },
    selectorItem :{
      paddingHorizontal: 8,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
    },
    selectedItem :{
      paddingHorizontal: 8,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: theme.colors.LightGrayBorder
    }
  });

  return defaultsDeep(defaultStyles);
};

export default useMergeStyles;
