import React from 'react';
import { Link } from 'react-router';
import CKEditor from "react-ckeditor-component";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';



class TemplateDetails extends React.Component {
    activeEditor;
    constructor(props) {
        super(props);
        this.state = {
           name: '',
           title: '',
           orgName: '-1',
           formName: '-1',
           modulefield: '-1',
           content: " ",
           editorState: EditorState.createEmpty(),
           formlist: {
            forms: []
           },
           organizationlist: {
            organizations: []
           },
           templatelist: {},

        };
    this.handleTemplateNameChange = this.handleTemplateNameChange.bind(this);
    this.handleTemplateTitleChange = this.handleTemplateTitleChange.bind(this);
    this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
    this.handleModulenameChange = this.handleModulenameChange.bind(this);
    this.handleModulefieldChange = this.handleModulefieldChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.insertIntoTemplate = this.insertIntoTemplate.bind(this);
    this._createTemplateDetails = this._createTemplateDetails.bind(this);
    this._templateStoreChange = this._templateStoreChange.bind(this);
    }

     componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
     }

    componentDidMount() {
       TemplateAction._getOrganizationList();
       TemplateAction._getFormList();
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


   insertIntoTemplate() {
        this.activeEditor.insertText("$$" + this.state.modulefield + "$$");
    }

    onFocus(evt) {
       console.log(evt);
        console.log("htmltag <p> ", evt.editor._.data);
        this.activeEditor = evt.editor;
       
    }

    onChange(evt){
      
      var newContent = evt.editor.getData();
      this.setState({content: newContent});
      console.log("CKEditor content",newContent);
      
    }

    handleTemplateTitleChange(e){
        this.setState({title: e.target.value});
        console.log(e.target.value);
    }

    handleTemplateNameChange(e){
        this.setState({name: e.target.value});
        console.log(e.target.value);
    }
    
    handleOrgNameChange(e){
        this.setState({orgName: e.target.value});
        console.log(e.target.value);
    }
    
   handleModulenameChange(e){
        this.setState({formName: e.target.value});
        console.log(e.target.value);
    }

    handleModulefieldChange(e){
        this.setState({modulefield: e.target.value});
        console.log(e.target.value);
    }

    _createTemplateDetails(e){
        e.preventDefault();
        
        let data = {
          name : this.state.name,
          title : this.state.title,
          orgName : this.state.orgName,
          formName: this.state.formName,
          html:   this.state.content,
         };
        
        TemplateAction._createTemplateDetails(data);
        
     } 
    


render() {
    const { editorState } = this.state;
    console.log("formlist response", this.state.formlist.forms);
    console.log("organizationlist response", this.state.organizationlist.organizations);
    console.log(this.state.content);
        return (
            <div> 
                   <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
                    <div className="title-block">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center">
                                <h3 className="title mr-auto"> Create/Edit Template </h3>
                                
                                <div>
                                <button type="submit" className=" ml-2 mr-0 btn btn-primary" onClick={this._createTemplateDetails}> Save </button>
                                <Link to="/templatelist" type="close" className=" ml-2 mr-0 btn btn-primary"> Close </Link>
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group row d-flex align-items-center">
                        <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Template Title:</label>
                        <div className="col-sm-2">
                            <input className="form-control box_ip" id=" " placeholder="Template Title" type="text"
                                onChange={this.handleTemplateTitleChange} name='Client Title' value={this.state.title} />
                        </div>
                    
                        <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Template Name:</label>
                        <div className="col-sm-2">
                            <input className="form-control box_ip" id=" " placeholder="Template Name" type="text"
                                onChange={this.handleTemplateNameChange} name='Client Name' value={this.state.name} />
                        </div>

                          <label className="col-sm-2 form-control-label text-xs-right"> Organization Name: </label>
                            <div className="col-sm-2">
                                <select className="c-select form-control box_ip" onChange={this.handleOrgNameChange} value={this.state.orgName}>
                                      <option value='-1' disabled>Select Organization</option>
                                     {this.state.organizationlist.organizations.map((el,i) => <option key={i} value={el.name}>{el.name}</option>)} 
                                  
                                 </select>
                            </div>
                    </div>


                  <div className="form-group row d-flex align-items-center">
                            <label className="col-sm-2 form-control-label text-xs-right"> Module Name: </label>
                            <div className="col-sm-3">
                                <select className="c-select form-control box_ip" onChange={this.handleModulenameChange} value={this.state.formName}>
                                    <option value='-1' disabled>Select Form</option>
                                    {this.state.formlist.forms.map((el,i) => <option key={i} value={el.name}>{el.name}</option>)}
                                     
                                </select>
                            </div>

                            <label className="col-sm-2 form-control-label text-xs-right"> Module Field Name: </label>
                            <div className="col-sm-3">
                                <select className="c-select form-control box_ip" onChange={this.handleModulefieldChange} value={this.state.modulefield}>
                                    <option value='-1' disabled>Select Field</option>

                                    <option >Subscription Amount</option>
                                    <option >Contract Start Date</option>
                                    <option >Contract End Date</option>
                                    
                                    <option >Agent Name</option>
                                    <option >NRIC/Passport Number</option>
                                    <option >No of Preference Shares</option>
                                    <option >Monthly Profit pay by Company</option>
                                    <option>First Pay out Date</option>
                                    <option >Last Pay out Date </option>
                                    <option >Subscription Amount Payback Date</option>
                                    <option >Contract Value </option>
                                </select>
                            </div>
                            <button type="Insert" className=" ml-2 mr-0 btn btn-primary" onClick={this.insertIntoTemplate}> Insert Into Template </button>
                        </div>



                
                <form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Body </button>
                      <div className="form-group">
                           <CKEditor activeClass="editor" content={this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/> 
                     </div>
                     
                </form>

                {/*<form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Body </button>
                    <div className="form-group">
                       <CKEditor activeClass="editor" content={this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/>
                    </div>
                   
                </form>  

                <form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Footer </button>
                      <div className="form-group">
                       <CKEditor activeClass="p10" content={this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/>
                    </div>
                    
                </form>*/}

             </div>

        )
    }
}

export default TemplateDetails;





 