const initialState={
 listing:[]
}


const UPDATELISTING= "UPDATELISTING"

export function updatelisting(listing){
    return {type: UPDATELISTING, payload:listing}
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case UPDATELISTING:
        return {...state, listing: action.payload}
        default: return {...state}
    }
}

