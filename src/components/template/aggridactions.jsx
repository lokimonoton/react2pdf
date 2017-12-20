import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';

export default class ClickableRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            },
            templatelist: [],
        };

        this.clicked = this.clicked.bind(this); 
        this._templateStoreChange = this._templateStoreChange.bind(this);
        this._getSingleTemplate = this._getSingleTemplate.bind(this);
        this._handleTemplateSelection = this._handleTemplateSelection.bind(this);
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

    _getSingleTemplate(name){

      let data = {
          name : this.state.cell.row,
        };
        TemplateAction._getSingleTemplate(data);
    }



    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    

    _handleTemplateSelection(name){
      let data = {
          name : this.state.cell.row,
        };
        console.log("data",data);
        TemplateAction._deleteTemplate(data);
    }

    render() {
        
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <Link to="/previewTemplate" className=" mr-2">
                                <i className="fa fa-eye" onClick={this._getSingleTemplate}></i> 
                            </Link>
                            <a href="" className=" mr-2">
                                <i className="fa fa fa-minus-circle"></i> 
                            </a>
                            <a  className=" mr-2" onClick={this._handleTemplateSelection}>
                              <i className="fa fa-trash-o"></i>
                            </a>

                </div>
          );
    }
}