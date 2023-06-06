
const initialState = {
    ingresos: [],
    egresos: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_INFO': 
            return {
                ...state,
                ingresos: action.payload.ingresos,
                egresos: action.payload.egresos
            }
        default: return state            
    }
}

export default rootReducer;