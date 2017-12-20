import Api from '../api.jsx';
import dispatcher from "../dispatchers/dispatcher";



export function _createClientDetails(data){
	dispatcher.dispatch({
	    type:'Loader',
	    showLoader: true 
	})
	data = JSON.stringify(data);
	Api._callAPI('/clients/create', 'POST', data, (type,dt) => {
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

export function _getClientList(data){
	Api._callAPI( '/clients/list', 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'ClientList',
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
