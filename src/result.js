import * as actionTypes from './actions';
const initialState= {	
	results:[]
}

const counterResults = (state = initialState,action) => {
	switch(action.type){
		case actionTypes.STORE_RESULT:
		console.log(action.result);
			return{
				...state,
				results:state.results.concat({id:new Date(),value:action.result})
			}
		case actionTypes.STORE_DELETE:
			//const id = action.resultLid;
			//const newArray = [...state.results];
			//newArray.splice(id,1);
			const updatedArray = state.results.filter(result => result.id !== action.resultLid);
			return{
				...state,
				results:updatedArray
			}
		default :
			return state;
	}
}

export default counterResults;