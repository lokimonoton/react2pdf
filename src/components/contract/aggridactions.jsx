import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as ContractAction from '../../actions/contractAction.jsx';
import ContractStore from '../../store/contractStore.jsx';

export default class ClickableRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            },
            clientdetails:  [],
        };

        this.clicked = this.clicked.bind(this); 
        this._templateStoreChange = this._templateStoreChange.bind(this);
       this._contractStoreChange = this._contractStoreChange.bind(this);
       this._clientStoreChange = this._clientStoreChange.bind(this);
       this._handleContractSelection = this._handleContractSelection.bind(this);
       this._getSingleContract = this._getSingleContract.bind(this);
        
    }

     componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
      ContractStore.on('change', this._contractStoreChange);
      ClientStore.on('change', this._clientStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
        ContractStore.removeListener('change', this._contractStoreChange);
        ClientStore.removeListener('change', this._clientStoreChange);
     }

    componentDidMount() {
       ContractAction._getContractList();
      
    }

     _templateStoreChange(type){
        if(type == 'OrganizationList'){
            let organizationlist = TemplateStore._getOrganizionDetailsList() || {};
            this.setState({organizationlist});
        }
        if(type == 'TemplateList'){
            let templatelist = TemplateStore._getTemplateDetailsList() || {};
            this.setState({templatelist});
          }
        }

    _clientStoreChange(type){
        if(type == 'ClientList'){
        let clientdetails = ClientStore._getClientDeatilsList() || {};
        this.setState({clientdetails});
      }
    }

    _contractStoreChange(type){
        if(type == 'ContractList'){
        let contractlist = ContractStore._getContractDetailsList() || {};
        this.setState({contractlist});
      }
    }

    
    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _handleContractSelection(name){
      let data = {
          name : this.state.cell.row,
        };
        console.log("data",data);
       ContractAction._deleteContract(data);
    }

    _getSingleContract(name){

      let data = {
          name : this.state.cell.row,
        };
        ContractAction._getSingleContract(data);
    }

    render() {
        
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <a href="" className="">
                            <i className="fa fa-paperclip"></i> 
                            
                        </a>
                        <Link to="/previewContract" className=" mr-2" onClick={this._getSingleContract}>
                            <i className="fa fa-eye"></i> 
                        </Link>

                        <a href="" className=" mr-2">
                            <i className="fa fa-file-text"></i> 
                        </a>

                        <a href="" className=" mr-2">
                            <i className="fa fa-code-fork"></i> 
                        </a>

                        <a  className=" mr-2" onClick={this._handleContractSelection}>
                            <i className="fa fa-trash-o"></i>
                        </a>

                </div>
          );
    }
}