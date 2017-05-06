import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
	static navigationOptions = ({navigation}) =>({
		title: 'Review Jobs',
		tabBarIcon: ({ tintColor }) => {
		  return <Icon name="favorite" size={30} color={tintColor} />;
		},
		headerRight: 
			<Button 
				title="Settings" 
				onPress={() => { navigation.navigate('settings') }} 
			/>
	});

	renderLikedJobs() {
		return this.props.likedJobs.map(job => {
			const { company, formattedRelativeTime, url, 
				longitude, latitude, jobtitle, jobkey
			} = job;
			const initialRegion = {
				longitude,
				latitude,
				latitudeDelta: 0.045,
				longitudeDelta: 0.02
			};

			return (
				<Card title={jobtitle} key={jobkey}>
					<View style={{ height: 200 }}>
						<MapView
							style={{ flex: 1 }}
							cacheEnabled={Platform.OS === 'android'}
							scrollEnabled={false}
							initialRegion={initialRegion}

						/>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{company}</Text>
							<Text style={styles.italics}>{formattedRelativeTime}</Text>
						</View>
						<Button
							title="View Job Details"
							backgroundColor="#03A9F4"
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			)
		});
	}

	render() {
		return (
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		);
	}
}

const styles = {
	italics: {
		fontWeight: 'bold'
	},
	detailWrapper: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
}

function mapStateToProps(state) {
	return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);