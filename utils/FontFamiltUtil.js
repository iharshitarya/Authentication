import { Platform } from "react-native";

export const FontFamilyUtil = {

    w100: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Thin', fontWeight: Platform.OS === 'ios' ? '100' : undefined },
    w200: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-ExtraLight', fontWeight: Platform.OS === 'ios' ? '200' : undefined },
    w300: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Light', fontWeight: Platform.OS === 'ios' ? '300' : undefined },
    w400: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Regular', fontWeight: Platform.OS === 'ios' ? '400' : undefined },
    w500: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Medium', fontWeight: Platform.OS === 'ios' ? '500' : undefined },
    w600: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-SemiBold', fontWeight: Platform.OS === 'ios' ? '600' : undefined },
    w700: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Bold', fontWeight: Platform.OS === 'ios' ? '700' : undefined },
    w800: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-ExtraBold', fontWeight: Platform.OS === 'ios' ? '800' : undefined },
    w900: { fontFamily: Platform.OS === 'ios' ? 'Urbanist' : 'Urbanist-Black', fontWeight: Platform.OS === 'ios' ? '900' : undefined }


};
