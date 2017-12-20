import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as ContractAction from '../../actions/contractAction.jsx';
import ContractStore from '../../store/contractStore.jsx';

class ContractList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           organizationlist: {
              organizations: []
            },
            templatelist: {
              templates: []
            },
            clientdetails: {
              clients: []
            },
            contractlist:[],
            columnDefs: [
            {
                headerName: "Contract ID",
                field: "contractId",
                width: 150
            },
            {
                headerName: "Client Name",
                field: "clientName",
                width: 150
            },
            {
                headerName: "Contract Name",
                field: "name",
                width: 150
            },
            {
                headerName: "Contract Title",
                field: "title",
                width: 150
            },
            {
                headerName: "Status",
                field: "status",
                width: 100
            },
            {
                headerName: "Created Date",
                field: "createdAt",
                width: 150
            },
            {
                headerName: "Last Modified",
                field: "updatedAt",
                width: 100
            },
            {
                headerName: "Actions",
                field: "name",
                cellRendererFramework: action,
                width: 150
            }
        ],
        };
       this._templateStoreChange = this._templateStoreChange.bind(this);
       this._contractStoreChange = this._contractStoreChange.bind(this);
       this._clientStoreChange = this._clientStoreChange.bind(this);
      
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

    
render() {
   
    let containerStyle = {
            height: 400
        };
        return (
            <div>
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
        <div className="title-block">
            <div className="row">
                <div className="col-md-12 d-flex align-items-center">
                    <h3 className="title mr-auto"> Contracts List </h3>
                    <Link to="/contractdetails" className="btn btn-primary btn-lg rounded-s mb-0"> <i className="fa fa-file icon mr-1"></i> Create New Contract </Link>
                </div>
            </div>
        </div>
        
        
        <div style={containerStyle} className="ag-theme-material">
                    <AgGridReact
                        // properties
                        rowData={this.state.contractlist.contracts}
                        columnDefs={this.state.columnDefs}
                        // events
                        pagination = {true}
                        onGridReady={this.onGridReady}
                        enableSorting
                        enableFilter>

                    </AgGridReact>
                </div>
    

             <div className="modal fade" id="confirm-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    <i className="fa fa-warning"></i> Alert</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure want to do this?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            </div>
                        </div>
                       
                    </div>
                    
                </div>
         
      </div>
        )
    }
}

export default ContractList;





 