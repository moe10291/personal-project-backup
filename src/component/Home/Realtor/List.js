import React from 'react';
import './List.css'


function List(props){
    console.log('PROPS',props)
    // console.log(props.list)
    // console.log(Edit)
    const showList= true
    return (

    //     <div style={{border: "black 2px solid", display: "flex", justifyContent: "center"}} className="parent-box">
    //      <div style={{border: "purple 2px solid"}} className="image-box">
    //        Image: Image
    //    </div>
    
    <div className='lister'>
       
        <p className='price'>Price: {props.list.price}
        <br></br>
        Address: {props.list.address}
        <br></br>
        Beds: {props.list.beds}
        <br></br>
        Bath: {props.list.bath}
        <br></br>
        Area: {props.list.area_sqft}
        <br></br>
       Description: {props.list.description}</p> 
       
    
       <button className='edit' onClick={() => props.fillStateInputs(props.list.id)}>Edit</button>
       
       <button className='delete' onClick={() => props.removeHouse(props.list.id)}>Delete</button>     

       {/* <button className='addToFavts' onClick={() => props.addFavts(props.list.id)}>Add to Favorites</button>  */}
       </div> 

    )
}

export default List;