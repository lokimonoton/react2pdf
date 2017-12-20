import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class ContractStore extends EventEmitter{
	
	constructor(){
		super();
		this.contractlist = {};
		this.singlecontract = {};
	}

	_getContractDetailsList(){
      return this.contractlist || {};
	}
	_getSingleContractDetails(){
      return this.singlecontract || {};
	}
	
	
	_handleActions(action){
		switch(action.type){
			case 'ContractList':{
                this.contractlist = action.data;
                this.emit('change', 'ContractList');
				break;
			}
			case 'SingleContract':{
                this.singlecontract = action.data;
                this.emit('change', 'SingleContract');
				break;
			}

			
		}
	}
}

const contractStore = new ContractStore;
dispatcher.register(contractStore._handleActions.bind(contractStore));
export default contractStore;
