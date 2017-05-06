import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
	static naviationOptions = {
		header: {
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		}
	}

	render() {
		return (
			<View>
				<Button 
					title="Clear Liked Jobs"
					large
					icon={{ name: 'delete-forever' }}
					onPress={this.props.clearLikedJobs}
				/>
			</View>
		);
	}
}

export default connect(null, { clearLikedJobs })(SettingsScreen);