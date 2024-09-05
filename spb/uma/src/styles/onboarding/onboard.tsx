import { StyleSheet } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
	firstContainer: {
		alignItems: 'center',
		marginTop: 50,
	},
	logo: {
		width: wp('23%'),
		height: hp('10%'),
	},
})
