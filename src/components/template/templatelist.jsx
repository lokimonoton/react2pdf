import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';


class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           formlist: {},
           organizationlist: {},
           templatelist: [],
           columnDefs: [
            {
                headerName: "Template Name",
                field: "name",
                width: 200
            },
            {
                headerName: "Template Title",
                field: "title",
                width: 200
            },
            {
                headerName: "Status",
                field: "status",
                width: 200
            },
            {
                headerName: "Created Date",
                field: "createdAt",
                width: 200
            },
            {
                headerName: "Last Modified",
                field: "updatedAt",
                width: 200
            },
            {
                headerName: "Actions",
                field: "name",
                cellRendererFramework: action,
                width: 250
            }
        ],
        };
      this._templateStoreChange = this._templateStoreChange.bind(this);
    }

    componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
     }

    componentDidMount() {
       TemplateAction._getTemplateList();
    }

    _templateStoreChange(type){
        if(type == 'FormList'){
        let formlist = TemplateStore._getFormDetailsList() || {};
       
        this.setState({formlist});
    }
    if(type == 'OrganizationList'){
        let organizationlist = TemplateStore._getOrganizionDetailsList() || {};
        
        this.setState({organizationlist});
    }
    if(type == 'TemplateList'){
        let templatelist = TemplateStore._getTemplateDetailsList() || {};
        
        this.setState({templatelist});
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
                                <h3 className="title mr-auto">Templates List</h3>
                                <Link to="/templatedetails" className="btn btn-primary btn-lg rounded-s mb-0"> <i className="fa fa-file icon mr-1"></i> Create New Template </Link>
                            </div>
                        </div>
                    </div>
                   
                    <div style={containerStyle} className="ag-theme-material">
                    <AgGridReact
                        // properties
                        rowData={this.state.templatelist.templates}
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

export default TemplateList;





 