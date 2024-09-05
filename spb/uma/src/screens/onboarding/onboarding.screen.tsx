import { styles } from '@/styles/onboarding/onboard'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, View } from 'react-native'

export default function OnBoardingScreen() {
	// let [fontsLoaded, fontError] = useFonts({
	// 	Raleway_700Bold,
	// 	Nunito_400Regular,
	// 	Nunito_700Bold,
	// })

	// if (!fontsLoaded && !fontError) {
	// 	return null
	// }

	return (
		<LinearGradient
			colors={['#E5ECF9', '#F6F7F9']}
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<View style={styles.firstContainer}>
				<View>
					<Image style={styles.logo} source={require('@/assets/logo.png')} />
				</View>
			</View>
		</LinearGradient>
	)
}
