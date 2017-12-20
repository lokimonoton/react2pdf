import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';

class clientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientdetails:  [],
            columnDefs: [
            {
                headerName: "Client ID",
                field: "id",
                width: 250
            },
            {
                headerName: "Client Name",
                field: "name",
                width: 200
            },
            {
                headerName: "Status",
                field: "status",
                width: 150
            },
            {
                headerName: "Registered Date",
                field: "createdAt",
                width: 250
            },
            {
                headerName: "Linked Active Contracts",
                field: "status",
                width: 250
            },
            {
                headerName: "Total Investment Amount",
                field: "",
                width: 200
            },
            {
                headerName: "Total Monthly Payout",
                
                field: "",
                width: 200
            },
            {
                headerName: "Actions",
                field: "name",
                cellRendererFramework: action,
                width: 150
            }
        ],
    };
        this._clientStoreChange = this._clientStoreChange.bind(this);
        this.createRowData = this.createRowData.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
     }



    componentWillMount() {
      ClientStore.on('change', this._clientStoreChange);
     }

    componentWillUnmount() {
        ClientStore.removeListener('change', this._clientStoreChange);
     }

    componentDidMount() {
       ClientAction._getClientList();
    }

    _clientStoreChange(type){
        if(type == 'ClientList'){
        let clientdetails = ClientStore._getClientDeatilsList() || {};
        console.log(clientdetails);
        this.setState({clientdetails});
    }
    }
    
   onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createRowData() {
        return this.state.clientdetails.clients;
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
                            <h3 className="title mr-auto"> Clients </h3>
                            <Link to="/clientdetails" className="btn btn-primary btn-lg rounded-s mb-0"> <i className="fa fa-user icon mr-1"></i> Register New Client </Link>
                        </div>
                    </div>
                </div>
                <div style={containerStyle} className="ag-theme-material">
                    <AgGridReact
                        // properties
                        rowData={this.state.clientdetails.clients}
                        columnDefs={this.state.columnDefs}
                        // events
                        pagination = {true}
                        onGridReady={this.onGridReady}
                        enableSorting
                        enableFilter>

                    </AgGridReact>
                </div>
                
            </div>

        );
    }
}

export default clientList;
