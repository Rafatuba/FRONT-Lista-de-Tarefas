import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.base.gray700,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 173,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '50%',
  },
  form: {
    position: 'absolute',
    bottom: -54 / 2,
    height: 54,
    width: '100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  input: {
    height: 54,
    width: '75%',
    backgroundColor: theme.colors.base.gray500,
    borderRadius: 5,
    padding: 16,
    marginRight: 4,
    fontSize: theme.font_size.md,
    color: theme.colors.base.gray100,
    borderColor: theme.colors.base.gray300,
    borderWidth: 1
  },
  inputBorder: {
    borderColor: theme.colors.brand.purple,
  },
  button: {
    width: 54,
    height: 54,
    borderRadius: 5,
    backgroundColor: theme.colors.brand.blue_dark,
    alignItems: 'center',
    justifyContent: 'center'
  }
})