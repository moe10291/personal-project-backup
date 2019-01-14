import React, { Component } from 'react';
import './maps.css'
import {geoKey} from '../../../config'

class geolocation extends Component{
    constructor(props){
    super(props);
    this.state={}

    }

    componentDidMount(){
        this.renderMap()
    }

  initMap= () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }

renderMap(){
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB8atUZgdWRIMAil2FvZ8HA9qiXCUKEozs&callback=initMap")
    window.initMap= this.initMap
}

    render(){
        return (
            <div id='map'>
                <h3>MAP SHOULD APPEAR ON THIS PAGE</h3>
    

            </div>
        )
    }
}

{/* <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8atUZgdWRIMAil2FvZ8HA9qiXCUKEozs&callback=initMap">
</script> */}
function loadScript(url) {
    var index  = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }
export default geolocation;