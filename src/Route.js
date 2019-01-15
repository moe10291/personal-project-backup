import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from'./component/Home/Realtor/Login';
import Signup from './component/Home/Realtor/Signup';
import Listing from './component/Home/Realtor/Listing';
import BuyerSignup from './component/Home/Buyer/BuyerSignup';
import BuyersListings from './component/Home/Buyer/buyersListings';
import Favts from './component/Home/Buyer/Favts';
import maps from './component/Home/Buyer/maps'
import leaflet from './component/Home/Realtor/leaflet'
import mapper from './component/Home/Realtor/mapper';



const route=(
    <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/signup' component={Signup}/>
        <Route path='/listing' component={Listing}/>
        <Route path='/buyersignup' component={BuyerSignup}/>
        <Route path='/buyersListings' component={BuyersListings}/>
        <Route path='/favts' component={Favts}/>
        <Route path='/maps' component={maps}/>
        <Route path='/leaf' component={leaflet}/>
        <Route path='/mapper' component={mapper}/>
        <Route path='/guest' component ={BuyersListings}/>

    </Switch>
)


export default route