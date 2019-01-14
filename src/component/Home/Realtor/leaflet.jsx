import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './leaf.css'
import axios from 'axios';
// import Listing from './Listing';

var myIcon = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/33/33622.svg',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
 
});




class Leaf extends Component{
    constructor(props){
        super(props);
        this.state={
            listing:[],
            location: {
                lat: '',
                lng: '',
            },
            locByIp: '',
        haveUsersLocation: false,

            zoom: 3
     }
       }


       
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) =>{
            this.setState({
                
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
            haveUsersLocation: true,
            zoom: 15
            });

          });
        //   var marker= L.marker(this.state.location.lat, this.state.location.lng)
    }


    async addHouse() {
        let {lat, lng} = this.state.location
        console.log(this.state.location)
  
        const res= await axios.post('/listing/add', { lat, lng })
            
                console.log(res)
                this.setState({ listing: res.data })

    }



    
    render(){
        // var pin= L.marker([50.5, 30.5]).addTo();

        const position= [this.state.location.lat, this.state.location.lng]

        // var listing = this.state.listing.map((ele, i) => {
        // return (
        //     <div>key={i}, list={ele}</div>
        //     )
        // })
        
        return(
        <div id='mapid'>
            <Map className='map' center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.haveUsersLocation ? 
            <Marker 
            position={position}
            icon={myIcon}>
           
              <Popup>
                Current Location. <br /> You are Here.
              </Popup>
            </Marker> :
            'Access To Current Location Required'
        }
            
          </Map>
          </div>
        )
    }
}

export default Leaf;