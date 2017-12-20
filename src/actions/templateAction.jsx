import Api from '../api.jsx';
import dispatcher from "../dispatchers/dispatcher";



export function _createTemplateDetails(data){
	dispatcher.dispatch({
	    type:'Loader',
	    showLoader: true 
	})
	data = JSON.stringify(data);
	Api._callAPI('/templates/create', 'POST', data, (type,dt) => {
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


export function _getFormList(data){
	Api._callAPI( '/forms/list', 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'FormList',
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


export function _deleteForm(data){
	let url = '/forms/delete?name=' + data.name;
	Api._callAPI( url, 'DELETE', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'FormList',
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




export function _getOrganizationList(data){
	Api._callAPI( '/organizations/list', 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'OrganizationList',
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


export function _getTemplateList(data){
	Api._callAPI( '/templates/list', 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'TemplateList',
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

export function _getSingleTemplate(data){
	let url = "/templates/read";
	Api._callAPI( url, 'GET', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'SingleTemplate',
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



export function _deleteTemplate(data){
	let url = '/templates/delete?name=' + data.name;
	Api._callAPI( url, 'DELETE', data, (type, dt) => {
		if(type == 'success'){
			dispatcher.dispatch({
                type: 'DeleteTemplate',
                name: data.name,
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



