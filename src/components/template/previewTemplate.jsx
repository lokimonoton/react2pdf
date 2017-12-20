import React from 'react';
import { Link } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';


class PreviewTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          singletemplate: {
            template: {},
          },
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
    if(type == 'SingleTemplate'){
        let singletemplate = TemplateStore._getSingleTemplate() || {};
        console.log("single template response", singletemplate);
        this.setState({singletemplate});
    }
}


render() {
       console.log("single template response", this.state.singletemplate);
        let singletemplate = this.state.singletemplate;
        return (
            <div>
                 <div className="sidebar-overlay" id="sidebar-overlay"></div>
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div className="mobile-menu-handle"></div>
                
                    <div className="title-block">
                        <h3 className="title"> Preview Template</h3>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card sameheight-item">
                                <div className="card-block">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <a href="#contractPrev" className="nav-link active" data-target="#contractPrev" data-toggle="tab" aria-controls="contractPrev" role="tab">Template Preview</a>
                                        </li>
                                        
                                    </ul>
                                    
                                    <div className="tab-content tabs-bordered">
                                        <div className="tab-pane active p-4" id="contractPrev">
                                            <div className="row">
                                                <div className="col-md-4">
                                                     <div className="form-group d-flex">
                                                        <label className="form-control-label text-xs-right"> Template Title: </label>
                                                        <div className="ml-2">{singletemplate.template.title}</div>
                                                    </div>

                                                    <div className="form-group d-flex">
                                                        <label className="form-control-label text-xs-right"> Module Name: </label>
                                                        <div className="ml-2">{singletemplate.template.formName}</div>
                                                    </div>

                                                    

                                                    <div className="form-group d-flex">
                                                        <label className="form-control-label text-xs-right"> Template Name: </label>
                                                        <div className="ml-2">{singletemplate.template.name}</div>
                                                    </div>

                                                    <div className="form-group d-flex">
                                                        <label className=" form-control-label text-xs-right"> Organization name:  </label>
                                                        <div className="ml-2">{singletemplate.template.orgName}</div>
                                                    </div>
                                                    <div className="form-group d-flex">
                                                        <label className=" form-control-label text-xs-right"> Template Version: </label>
                                                        <div className="ml-2"></div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group d-flex justify-content-center">
                                                        <a href="" className="item-actions-toggle-btn">
                                                            Attachments
                                                            <i className="fa fa-paperclip"></i> 
                                                            <sup>
                                                                <span className="counter">
                                                                    <b>3</b>
                                                                </span>
                                                            </sup>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group d-flex justify-content-end">
                                                        <Link to="/templatedetails" className="btn btn-primary ml-2 mr-2" >Edit</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-10 m-auto pt-5 pb-5">
                                                    <h4>Template Preview</h4>
                                                    <p>{singletemplate.template.html}</p>
                                                    <p></p>
                                                    <p></p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                                                                
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                
            </div>
        )
    }
}

export default PreviewTemplate;





 