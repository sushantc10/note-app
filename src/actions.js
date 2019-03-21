export const INCREMENT = 'INCREMENT';
export const ADD = 'ADD';
export const STORE_RESULT = 'STORE_RESULT';
export const STORE_DELETE = 'STORE_DELETE';

export const increment = () =>{
	return {
		type:INCREMENT
	}
} 

export const add = (value) =>{
	return {
		type:ADD,
		val:value
	}
} 

export const saveResult = res =>{
	const updateResult = res * 2;
	return {
		type:STORE_RESULT,
		result:res
	}
}

export const storeResult = (value) =>{
	return dispatch => {
		setTimeout(()=>{
			dispatch(saveResult(value));
		},2000);
	}
} 

export const storeDelete = (id) =>{
	return {
		type:STORE_DELETE,
		resultLid:id
	}
} 