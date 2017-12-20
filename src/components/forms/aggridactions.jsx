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
            formlist: {
                forms: []
            },
            organizationlist: {},
            templatelist: {
                templates: []
            },
        };

        this.clicked = this.clicked.bind(this); 
        this._templateStoreChange = this._templateStoreChange.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
         
    }

     componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
     }

    componentDidMount() {
       TemplateAction._getFormList();
    }

    _templateStoreChange(type){
        if(type == 'FormList'){
        let formlist = TemplateStore._getFormDetailsList() || {};
        console.log("form list response", formlist);
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

    
    

    _handleFormSelection(name){
      let data = {
          name : this.state.cell.row,
        };
        console.log("data",data);
       TemplateAction._deleteForm(data);
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    render() {
         //let formlist = this.state.formlist;
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
            
                                <a href="" className="">
                                    <i className="fa fa-paperclip"></i> 
                                    <sup>
                                        <span className="counter">
                                            <b>3</b>
                                        </span>
                                    </sup>
                                </a>
                                <Link to="/formdetails" className=" mr-2">
                                    <i className="fa fa-eye"></i> 
                                </Link>

                                <a href="" className=" mr-2">
                                    <i className="fa fa-file-text"></i> 
                                </a>

                                <a href="" className=" mr-2">
                                    <i className="fa fa-code-fork"></i> 
                                </a>

                                <a  className=" mr-2" onClick={this._handleFormSelection}>
                                    <i className="fa fa-trash-o"></i>
                                </a>

                            </div>
                           
              
                                  
        );
    }
}