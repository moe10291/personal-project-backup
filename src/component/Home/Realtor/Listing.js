import React, { Component } from 'react';
import List from './List';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatelisting} from '../../../ducks/reducer';
// import L from 'leaflet';
// import map from './leaflet'
// import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './Listing.css'



class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '',
            address: '',
            beds: '',
            bath: '',
            area_sqft: '',
            description: '',
            id:'',
            marker:{
                lat:'',
                long:''
            },
            listing: [],
            editing: false,
            logout:'',
            userFav:[],
            showButton: true,
           
            

        }
        this.addHouse = this.addHouse.bind(this);
        this.fillStateInputs= this.fillStateInputs.bind(this);
        this.removeHouse= this.removeHouse.bind(this);
        
       
    }


    componentDidMount() {
        axios.get('/real/listing')
            .then(res => {
                this.setState({ listing: res.data })
                // console.log('***CONSOLE***', res.data)
            })
    }

    handlePrice(val) {
        this.setState({ price: val })
    }

    handleAddress(text) {
        this.setState({ address: text })
    }
    handleBed(val) {
        this.setState({ beds: val })
    }
    handleBath(val) {
        this.setState({ bath: val })
    }
    handleArea(text) {
        this.setState({ area_sqft: text })
    }
    handleDescription(text) {
        this.setState({ description: text })
    }

    removeHouse(id) {
        console.log(id)
        axios.delete(`/listing/${id}`)
            .then((res) => {
                this.setState({ listing: res.data })

            })
    }

    

    updateListing = (id) => {
        let {price, address, beds, bath, area_sqft, description}= this.state
        axios.put(`/listing/${id}`,{price, address, beds, bath, area_sqft, description})
            .then((res) => {
                this.setState({ 
                    price: '',
                    address: '',
                    beds: '',
                    bath: '',
                    area_sqft: '',
                    description: '',
                    id:'',
                    lat:'',
                    long:'',
                    editing: false,
                    listing: res.data })
            })
    }


    fillStateInputs(id){
        axios.get(`/listing/${id}`)
        .then(res => {
            this.setState({
            price: res.data.price,
            address: res.data.address,
            beds: res.data.beds,
            bath: res.data.bath,
            area_sqft: res.data.area_sqft,
            description: res.data.description,
            id: res.data.id,
            editing: true
        })
        })
    }

    // addHouse(){
    //     let {price, address, beds, bath, area_sqft, description}= this.state
    //     this.setState({
    //         listing:[ price, address, beds, bath, area_sqft, description]
    //     });
    // }
   componentDidMount(){
    // let { price, address, beds, bath, area_sqft, description } = this.state
    axios.get('/listing')
    .then(res => {
        this.setState({listing: res.data})
    })


   }

    async addHouse() {
        let { price, address, beds, bath, area_sqft, description } = this.state
  
    //  var location= address;
    console.log(process.env.REACT_APP_GEOLOCATION_KEY)
            const resGeo= await axios.get('http://open.mapquestapi.com/geocoding/v1/address', {
                params: {
                  location: address,
                  key: process.env.REACT_APP_GEOLOCATION_KEY	
                  
                }
            })
            console.log(resGeo)    
                       
                console.log(resGeo.data.results[0].providedLocation.location)
                console.log(resGeo.data.results[0].locations[0].displayLatLng.lat)
                console.log(resGeo.data.results[0].locations[0].displayLatLng.lng)
                
               const cords= resGeo.data.results[0].providedLocation.location
            //    const address= resGeo.data.results[0].formatted_address
        //  addMarker=()=>{
        //      var marker=L.marker(resGeo.data.results[0].locations[0].displayLatLng.lat, resGeo.data.results[0].locations[0].displayLatLng.lng).addTo()
        //  }       
                  
        
        const res= await axios.post('/listing/add', { price, cords, beds, bath, area_sqft, description })
            
                console.log(res)
                this.setState({ listing: res.data })

            //     var marker = L.marker([resGeo.data.results[0].locations[0].displayLatLng.lat, resGeo.data.results[0].locations[0].displayLatLng.lng]).addTo(this.props.map);
            //  let markers= marker

    }

    logout(){
        axios.get('/logout')
        .then(res=> {
            this.setState({})
        })
    }



    render() {
       
        let listing = this.state.listing.map((ele, i) => {
            // console.log(ele)
            return (
                <div>
                <List 
                    key={i} 
                    list={ele} 
                    removeHouse={this.removeHouse} 
                    fillStateInputs={this.fillStateInputs} 
                    addFavts={this.addFavts}
                    />

                    {/* <button onClick={() => this.removeHouse(ele.id)}>Remove</button> */}
                </div>
            )
        })

        // let listing= this.state.listing.map((ele, i)=> {``
        //     return (
        //         <div>
        //         <List key={i} list={ele} updateHouse={this.updateHouse}/>
        //         <button onClick={()=>this.removeHouse(ele.id)}>Remove</button>
        //         </div>
        //     )
        // })
        // console.log(this.props)
        return (
            <div className='parentBox'>
                <a className='atag' href='/'>
                            <button className='logout' >Logout</button>
                            </a>
                     
            <div className='box1'>
                <div className='ListingInfo'>
                    <p>Price</p> <input value={this.state.price}
                        onChange={(e) => this.handlePrice(e.target.value)} type='value'></input>
                    <p>Address</p> <input value={this.state.address}
                        onChange={(e) => this.handleAddress(e.target.value)}></input>
                    <p>Bed</p> <input value={this.state.beds}
                        onChange={(e) => this.handleBed(e.target.value)} type='value'></input>
                    <p>Bath</p>  <input value={this.state.bath}
                        onChange={(e) => this.handleBath(e.target.value)}></input>
                    <p>Covered Area</p> <input value={this.state.area_sqft}
                        onChange={(e) => this.handleArea(e.target.value)}></input>
                    <p>Description</p><textarea className='desc' rows='5' cols='45' value={this.state.description} onChange={(e) => this.handleDescription(e.target.value)}></textarea>
                    {/* <input type='file'></input> */}
                   
            
                    <br></br>
                    <br></br>
                    <br></br>
                   {this.state.editing ? <button onClick={()=>this.updateListing(this.state.id)}>Edit House</button>: <button onClick={this.addHouse}>Add House</button>}
                
                </div>
                </div>

            <div className='listings'>
                <div className='listing'>
                
                {listing}
                </div>
                </div>

            </div>
        )
    }
}

export default connect(null, {updatelisting})(Listing);