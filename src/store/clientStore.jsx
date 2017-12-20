import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class ClientStore extends EventEmitter{
	
	constructor(){
		super();
		this.clientlist = {};
	}

	_getClientDeatilsList(){
      return this.clientlist || {};
	}
	
	_handleActions(action){
		switch(action.type){
			case 'ClientList':{
                this.clientlist = action.data;
                this.emit('change', 'ClientList');
				break;
			}
		}
	}
}

const clientStore = new ClientStore;
dispatcher.register(clientStore._handleActions.bind(clientStore));
export default clientStore;
