import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";

class TemplateStore extends EventEmitter{
	
	constructor(){
		super();
		this.clientlist = {};
		this.formlist = {};
		this.organizationlist = {};
		this.templatelist = {};
		this.singletemplate = {};
	}

	_getFormDetailsList(){
      return this.formlist || {};
	}
	_getOrganizionDetailsList(){
      return this.organizationlist || {};
	}
	_getTemplateDetailsList(){
      return this.templatelist || {};
	}

	_getSingleTemplate(){
		return this.singletemplate || {};
	}
	
	_handleActions(action){
		switch(action.type){
			case 'FormList':{
                this.formlist = action.data;
                this.emit('change', 'FormList');
				break;
			}
			case 'OrganizationList':{
                this.organizationlist = action.data;
                this.emit('change', 'OrganizationList');
				break;
			}
			case 'TemplateList':{
                this.templatelist = action.data;
                this.emit('change', 'TemplateList');
				break;
			}
			case 'SingleTemplate':{
                this.singletemplate = action.data;
                this.emit('change', 'SingleTemplate');
				break;
			}
			
		}
	}
}

const templateStore = new TemplateStore;
dispatcher.register(templateStore._handleActions.bind(templateStore));
export default templateStore;
