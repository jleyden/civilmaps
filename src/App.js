import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import StackGrid from 'react-stack-grid';

import GoogleApiComponent from './api/GoogleApiComponent'
import './App.css';

const API_KEY = 'AIzaSyAEN02qP3JKvP-RC2DZN7ZnRvwNgI0nmEg'

export class Container extends React.Component {

	constructor() {
		super()
		this.map = null
		this.google = null
		this.state = {
			loadedMap: false,
			results: null,
			location: {
				lat: 37.807547,
				lon: -122.415379
			}
		}
	}

	componentWillMount() {
		// Get location from the browser
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					location: {
						lat: position.coords.latitude,
						lon: position.coords.longitude
					}
				})
			},
			(error) => console.log(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
			this.loadMap();}
		}

	// taken from https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
	loadMap() {
		// google is available
		const {google} = this.props;
		this.google = google
		const maps = google.maps;

		const mapRef = this.refs.map;
		const node = ReactDOM.findDOMNode(mapRef);

		let zoom = 14;
		let lat = 37.807547;
		let lng = -122.415379;
		const center = new maps.LatLng(lat, lng);
		const mapConfig = Object.assign({}, {
			center: center,
			zoom: zoom
		})
		this.map = new maps.Map(node, mapConfig);
		this.setState({
			loadedMap: true
		})
	}


	// Queries the Google Places api for the closest places that match the query
	searchNearby(search_str) {
		if (!this.map) {
			return
		}
		const google = this.google
		const placesService = new google.maps.places.PlacesService(this.map)
		const lat = this.state.location.lat
		const lon = this.state.location.lon
		const latLong = new google.maps.LatLng(lat, lon)
		placesService.nearbySearch({
			location: latLong,
			radius: 50000,
			keyword: search_str,
			rankby: 'distance'
		}, (results) => {
			console.log(results)
			this.setState({results})
		})
	}

	// whats up
	// takes a result from state and returns a brick for displaying
	makeBrick(result, i) {

		// Need to work on photos

		// const photoreference = result.photos ? result.reference : null
		// if (photoreference) {
		// 	const query_params = {
		// 		key: API_KEY,
		// 		photoreference,
		// 		maxWidth: '300'
		// 	}
		// 	const str = querystring.stringify(query_params)
		// 	const pre_str = 'https://maps.googleapis.com/maps/api/place/photo?'
		// 	const request = pre_str + str
		// 	axios.get(request).then((response) => {
		// 		console.log(response)
		// 	}).catch((error) => console.log(error))
		// }

		return (
			<div className="block" key={i}>
				<div>
					{result.name}
				</div>
			</div>)
	}

	render() {
		if (!this.props.loaded) {
			return <div>Loading...</div>
		}
		return (
			<MuiThemeProvider style = {{Margin: 0}}>
				<div >
					<AutoComplete
						label="Default"
						className="SearchBar"
						dataSource={[]}
						hintText="Search for a place..."
					  onNewRequest={
						  (request) => this.searchNearby(request)}
					 />
					<StackGrid>
						{this.state.results ?
								this.state.results.map((result,  i) => this.makeBrick(result, i))
						  : null}
					</StackGrid>
					<div ref='map'></div>
				</div>

			</MuiThemeProvider>
		)
	}

}

export default GoogleApiComponent({
	apiKey: API_KEY ,
	libraries: ['places']
})(Container)
