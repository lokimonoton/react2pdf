import Api from '../api.jsx';
import dispatcher from "../dispatchers/dispatcher";

export function _createContractDetails(data){
	dispatcher.dispatch({
	    type:'Loader',
	    showLoader: true 
	})
	data = JSON.stringify(data);
	Api._callAPI('/contracts/create', 'POST', data, (type,dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
			    type:'Loader',
			    showLoader: false 
			})
			dispatcher.dispatch({
			    type:'SnackBar',
			    string: dt.response
			})
			
		}
	});
}


export function _getContractList(data){
	Api._callAPI( '/contracts/list', 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'ContractList',
                data: dt,
            })  

              if(dt.responseCode == 1){

	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				return;
			}
			if(dt.responseCode == 0){
	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				
			} 
		}
		
	});

}


export function _getSingleContract(data){
	let url = "/contracts/read";
	Api._callAPI( url, 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'SingleContract',
                data: dt,
            })  

              if(dt.responseCode == 1){

	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				return;
			}
			if(dt.responseCode == 0){
	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				
			} 
		}
		
	});

}



export function _deleteContract(data){
	let url = '/contracts/delete?name=' + data.name;
	Api._callAPI( url, 'DELETE', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'ContractList',
                data: dt,
            })  

              if(dt.responseCode == 1){

	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				return;
			}
			if(dt.responseCode == 0){
	    		dispatcher.dispatch({
				    type:'SnackBar',
				    string: dt.serviceStatus
				})
				
			} 
		}
		
	});

}
