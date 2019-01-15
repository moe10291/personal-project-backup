import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { geoKey } from '../../../config'
import './mapper.css'
import axios from 'axios'

const mapStyles = {
    width: '68%',
    height: '85%',
    position: 'fixed'


};

export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            location: {
                lat: "",
                lng: ""
            },
        }
    }

    async componentDidMount() {

        await navigator.geolocation.getCurrentPosition((position) => {

            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })

        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.lat !== prevState.lat) {
            console.log('**DIDUPDATE**', this.state)
        }
    }

    render() {

        let markers = this.props.listings.map((listing) => {
            return( <Marker
                position={{
                    lat: listing.lat,
                    lng: listing.lng
                }}
            />)

        })

        const position = [this.state.location.lat, this.state.location.lng]
        console.log('**SHOW ME**', this.state.location.lat)
        return (
            <div className='gmap'>
                <Map

                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{
                        lat: 40.2338,
                        lng: -111.6585
                    }}

                >
                    {markers}

                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: geoKey()
})(MapContainer);