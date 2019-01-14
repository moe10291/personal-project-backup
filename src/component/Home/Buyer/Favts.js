import React, { Component } from 'react';
import axios from 'axios';
import './Favts.css'

class Favts extends Component{
    constructor(){
        super();
        this.state={
            favts:[],
            
        }
    }

    componentDidMount(){
        axios.get('/buyers/favts')
        .then(res => {
            console.log('**SHOW', res)
            this.setState({favts: res.data})
        })
    }

    async removeFl(id){
        
        console.log('**WHATSTHIS**',id)
        let resp = await axios.delete(`/favts/${id}`)
        if(resp.data === 'OK'){
            axios.get('/buyers/favts')
            .then(res => {
                console.log('**SHOW', res)
                this.setState({favts: res.data})
            })
        }
    }

 

    render(){

        let favorites= this.state.favts.map((ele, i, arr) => {
            console.log(ele)
            return (
                <div className='favt-item' key={i}> 
                     <p>{ele.address}</p>
                     <p> {ele.price}</p>
                     <p> {ele.beds}</p>
                     <p> {ele.bath}</p>
                     <p> {ele.area_sqft}</p>
                     <p> {ele.description}</p>
                     
                    <button onClick={()=>this.removeFl(ele.listings_id)}>delete</button>
                </div>
            )
        })
        return (
            <div className='favts'>
            
            <h1>Users Favt Page</h1>
                <div>
                    {favorites}
                </div>
         {/* {[<p>'hi'</p>, <p>'how'</p>, <p>'are'</p>]}
         {[<h1>BYU56</h1>, <h1>`lat40.498701,lng-74.44672254`</h1>, <h1>`lat43.659428,-79.3771162000`</h1>]} */}
                
            </div>
        )
    }
}

export default Favts