import React, { Component } from 'react';
import axios from 'axios';
import List from '../Realtor/List'

import MapContainer from '../Realtor/mapper'
import './buyer.css'
import { Link } from 'react-router-dom';




class Guest extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            address: '',
            beds: '',
            bath: '',
            area_sqft: '',
            description: '',
            id: '',
            listing: [],
        }
        this.addFavts = this.addFavts.bind(this);
    }

    componentDidMount() {
        axios.get('/listing')
            .then(res => {
                this.setState({ listing: res.data })
                 ('***CONSOLE***', res.data)
            })
    }

    logout() {
        axios.get('/logout')
            .then(res => {
                this.setState({})
            })
    }

    async addFavts(postid) {
        // let {user_id, listings_id}= this.state\
         (postid)
        const res = await axios.post('/buyers/addFavts', { post: postid })
         (res.data)
        if (res.data === 'OK') {
            return alert('Added to Favorites')
        }

    }

    render() {
        let listing = this.state.listing.map((ele, i) => {
            //  ('ele',ele)
            return (
                <div>

                    <List 
                    key={i} 
                    list={ele}
                    location={this.props.location} />
                   

                </div>
            )
        })
        return (
            <div className='parent'>
<link href='https://fonts.googleapis.com/css?family=Laila' rel='stylesheet'></link>
                <div className='favts_logout'>

                    <Link to='/favts'><button>My Favorites</button></Link>

                    <a href='/'>
                        <button className='logout' >Logout</button>
                    </a>

                </div>



                <h1>Listings Page</h1>




                <div className='listMap'>
                    <div className='buyerList'>{listing}</div>
                    <div className='map'><MapContainer
                    listings={this.state.listing} /></div>
                </div>



            </div>
        )
    }
}

export default Guest