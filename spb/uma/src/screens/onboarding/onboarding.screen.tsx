import { RootStackParamList } from '@/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type OnboardingScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Onboarding'
>

type Props = {
	navigation: OnboardingScreenNavigationProp
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to the App!</Text>
			<Button
				title="Login"
				onPress={() => navigation.navigate('Login')}
				color="#1e90ff"
			/>
			<Button
				title="Register"
				onPress={() => navigation.navigate('Register')}
				color="#32cd32"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: 'center',
	},
})

export default OnboardingScreen
