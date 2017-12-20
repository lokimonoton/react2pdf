import React from 'react';
import { Link} from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CKEditor from "react-ckeditor-component";
import SignaturePad from "./index";
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './imageupload.css';
const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as ContractAction from '../../actions/contractAction.jsx';
import ContractStore from '../../store/contractStore.jsx';
import * as _ from 'lodash';

import FontAwesome from 'react-fontawesome';

class ContractDetails extends React.Component {
    textBoxIds= ['Subscription Amount', 'Agent Name', 'NRIC/Passport Number', 
    'No of Preference Shares', 'Monthly Profit pay by Company', 'Contract Value',
    'Contract Start Date', 'Contract End Date', 'First Pay out Date', 'Last Pay out Date',
    'Subscription Amount Payback Date'];
    currentActiveTextBox;
    activeEditor;
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            date: date,
            contractId: '',
            contracttitle: '',
            contractname: '',
            contractstartDate: '',
            contractendDate: '',
            firstpayoutDate: '',
            lastpayoutDate: '',
            subscriptionamountpayDate: '',
            agentname: '',
            subscriptionamount: '',
            passportnumber: '',
            sharescount: '',
            monthlyprofitpay: '',
            currency: '',
            clientname: '-1',
            templatename: '-1',
            orgName: '-1',
            uploadedFile: null,
            picture: '',
            content: "",
            
           organizationlist: {
              organizations: []
            },
            templatelist: {
              templates: []
            },
            clientdetails: {
              clients: []
            },  
            singletemplate: {
            template: {},
            },
            editorContent: "PREFERENCE SHAREHOLDER AGREEMENT THIS AGREEMENT is made on the $$Contract Start Date$$ BETWEEN CRADLE WEALTH SOLUTIONS PTE. LTD. (ACRA Registration No. 201427834G) of 12 Marina Boulevard #17-01 Marina Bay Financial Centre Singapore (018982) (hereinafter referred to as the Company) represented by its Consultant, $$Agent Name$$ (NRIC no. $$NRIC/Passport Number$$) of the one part AND $$Agent Name$$ (NRIC no.$$NRIC/Passport Number$$) of , $$Subscription Amount$$ Singapore $$No of Preference Shares$$ (hereinafter referred as the Preference Shareholder) of the other part.(Hereinafter the parties shall be individually referred to as the Party and jointly referred to as the Parties) ",


    };
       this.handleContractTitleChange = this.handleContractTitleChange.bind(this);
     this.handleContractIdChange = this.handleContractIdChange.bind(this);
       this.handleContractNameChange = this.handleContractNameChange.bind(this);
       this.handleContractStartDateChange = this.handleContractStartDateChange.bind(this);
       this.handleContractEndDateChange = this.handleContractEndDateChange.bind(this);
       this.handleFirstPayoutDateChange = this.handleFirstPayoutDateChange.bind(this);
       this.handleLastPayoutDateChange = this.handleLastPayoutDateChange.bind(this);
       this.handleSubscriptionamountPayDateChange = this.handleSubscriptionamountPayDateChange.bind(this);
       this.handleAgentNameChange = this.handleAgentNameChange.bind(this);
       this.handleSubscrtiptionAmountChange = this.handleSubscrtiptionAmountChange.bind(this);
       this.handlePassportNumberChange = this.handlePassportNumberChange.bind(this);
       this.handleSharesCountChange = this.handleSharesCountChange.bind(this);
       this.handleMonthlyProfitPayChange = this.handleMonthlyProfitPayChange.bind(this);
       this.handleContractValueChange = this.handleContractValueChange.bind(this); 
       this.handleClientNameChange = this.handleClientNameChange.bind(this);
       this.handleTemplateNameChange = this.handleTemplateNameChange.bind(this);
     this._createContractDetails = this._createContractDetails.bind(this);
       this.handleOrgNameChange = this.handleOrgNameChange.bind(this);
       this.onChange = this.onChange.bind(this);
       this.replaceText = this.replaceText.bind(this);
       this.ckeditorInstanceReady = this.ckeditorInstanceReady.bind(this);
       this.updateEditorData = this.updateEditorData.bind(this);
     this._templateStoreChange = this._templateStoreChange.bind(this);
       this._contractStoreChange = this._contractStoreChange.bind(this);
       this._clientStoreChange = this._clientStoreChange.bind(this);
       this.handleImageUpload = this.handleImageUpload.bind(this);
       this.handleEditorChange = this.handleEditorChange.bind();
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
        TemplateAction._getOrganizationList();
        TemplateAction._getTemplateList();
        ClientAction._getClientList();
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

        if(type == 'SingleTemplate'){
            let singletemplate = TemplateStore._getSingleTemplate() || {};
            console.log("single template response", singletemplate);
            this.setState({singletemplate});
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

    ckeditorInstanceReady(e) {
        this.activeEditor = e.editor;
    }

    updateEditorData() {

        this.state.content = _.cloneDeep(this.state.editorContent);
        this.textBoxIds.forEach((id) => {
            let element = document.getElementById(id);
            if(element != undefined) {
                if(element.value != undefined && element.value != ''){
                    this.replaceText(id, element.value);
                }
            }
        })
        this.activeEditor.setData(this.state.content);
    }

    replaceText(textboxId, value) {
        var templatesToReplace = [];
        const myRegexExp = /\$\$(.*?)\$\$+/g;
        let findResults = myRegexExp.exec(this.state.content);
        while(findResults != null) {
            templatesToReplace.push(findResults);
            findResults = myRegexExp.exec(this.state.content);
        }
        templatesToReplace.forEach(line => {
            if(line[1] == textboxId) {
                this.state.content = this.state.content.replace(line[0], value);
            }
        })
    }

     onChange(evt){
      var newContent = evt.editor.getData();
      this.activeEditor = evt.editor;
      this.setState({content: newContent});
      console.log(newContent);
      
    }
   

    handleContractTitleChange(e){
   this.setState({contracttitle: e.target.value});
   console.log(e.target.value);

    }
  
  handleContractIdChange(e){
     this.setState({contractId: e.target.value});
     console.log(e.target.value);

    }
  
  handleContractNameChange(e){
     this.setState({contractname: e.target.value});
     console.log(e.target.value);
       }

    handleContractStartDateChange(date) {
     this.setState({contractstartDate: date});
     console.log(date);
      }

     handleContractEndDateChange(date) {
     this.setState({contractendDate: date});
     console.log(date);
      }
      
     handleFirstPayoutDateChange(date) {
     this.setState({firstpayoutDate: date});
     console.log(date);
      }
      
       handleLastPayoutDateChange(date) {
     this.setState({lastpayoutDate: date});
     console.log(date);
      }

       handleSubscriptionamountPayDateChange(date) {
     this.setState({subscriptionamountpayDate: date});
     console.log(date);
      }    

      handleAgentNameChange(e){
       this.setState({agentname: e.target.value});
       console.log(e.target.value);
      }

      handleSubscrtiptionAmountChange(e){
        this.setState({subscriptionamount: e.target.value});
       console.log(e.target.value);

      }
      
      handlePassportNumberChange(e){
        this.setState({passportnumber: e.target.value});
       console.log(e.target.value);

      }
      handleSharesCountChange(e){
        this.setState({sharescount: e.target.value});
       console.log(e.target.value);

      }
      handleMonthlyProfitPayChange(e){
        this.setState({monthlyprofitpay: e.target.value});
       console.log(e.target.value);

      }
      handleContractValueChange(e){
        this.setState({currency: e.target.value});
       console.log(e.target.value);

      }
      handleClientNameChange(e){
        this.setState({clientname: e.target.value});
       console.log(e.target.value);

      }
      handleTemplateNameChange(e){
      this.setState({templatename: e.target.value});
       console.log(e.target.value);
       let data = {
          name : e.target.value,
        };
        TemplateAction._getSingleTemplate(data);
     }

     handleEditorChange(){
      console.log("varma");
      let singletemplate = TemplateStore._getSingleTemplate() || {};
      console.log("inside editor", singletemplate);
      this.setState({singletemplate});
      this.setState({editorContent: singletemplate.templates.html});
     }
    
    handleOrgNameChange(e){
        this.setState({orgName: e.target.value});
       console.log(e.target.value);

      }

      _createContractDetails(e){
        e.preventDefault();
        
        let data = {
          contractId: this.state.contractId,
          name : this.state.contractname,
          title : this.state.contracttitle,
          orgName : this.state.orgName,
          templateName : this.state.templatename,
          clientName : this.state.clientname,
          html:   this.state.editorContent
         };
        
        ContractAction._createContractDetails(data);
        
     } 

     onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

    handleImageUpload(file) {
   
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
       this.setState({
          picture: response.body.secure_url
        });
       
      }
    });

  }


      


render() {
        return (
            <div> 
       
            <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
              <div className="title-block">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center">
                                <h3 className="title mr-auto"> Create/Edit Contract </h3>
                                
                                <div>
                                <button type="submit" className=" ml-2 mr-0 btn btn-primary" onClick={this.updateEditorData}> Insert into Contract </button>
                                <button type="submit" className=" ml-2 mr-0 btn btn-primary" onClick={this._createContractDetails}> Save </button>
                                <Link to="/contractlist" type="submit" className=" ml-2 mr-0 btn btn-primary"> Close </Link>
                                
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <form name="item">
                        <div className="card card-block">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className=" form-control-label text-xs-right"> Contract ID: </label>
                                        <div className="col-sm-8 ml-2">
                                        <input type="text" className="form-control box_ip" placeholder="Contract ID" onChange={this.handleContractIdChange} name='' value={this.state.contractId}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Created Date: </label>
                                        <div className="col-sm-8 ml-2">
                                           <input type="text" className="form-control box_ip" placeholder="Created Date" value={this.state.date}/>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Last Edited Date: </label>
                                        <div className=" col-sm-8 ml-2">
                                             <input type="text" className="form-control box_ip" placeholder="Last Edited Date" />
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                            
                                    <div className="form-group row">
                                         
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Title: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Contract Title" onChange={this.handleContractTitleChange} name='' value={this.state.contracttitle} />
                                        </div>
                                    
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Name: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Contract Name" onChange={this.handleContractNameChange} name='' value={this.state.contractname} />
                                        </div>
                                     </div>   
                                    <div className="form-group row">
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Client Name:</label>
                                    <div className="col-sm-4">
                                        <select className="c-select form-control box_ip" onChange={this.handleClientNameChange} value={this.state.clientname}>
                                            <option value='-1' disabled>Select Client</option>
                                            {this.state.clientdetails.clients.map((el,i) => <option key={i} value={el.name}>{el.name}</option>)}
                                            
                                        </select>
                                    </div>
                                
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Select Template:</label>
                                    <div className="col-sm-4">
                                        <select className="c-select form-control box_ip" onChange={this.handleTemplateNameChange} value={this.state.templatename}>
                                            <option value='-1' disabled>Select Template</option>
                                            {this.state.templatelist.templates.map((el,i) => <option key={i} value={el.name}>{el.name}</option>)} 
                                            
                                            
                                        </select>
                                    </div>
                                    </div>   
                                    <div className="form-group row">
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Select Organization:</label>
                                    <div className="col-sm-4">
                                        <select className="c-select form-control box_ip" onChange={this.handleOrgNameChange} value={this.state.orgName}>
                                            <option value='-1' disabled>Select Organization</option>
                                            {this.state.organizationlist.organizations.map((el,i) => <option key={i} value={el.name}>{el.name}</option>)}
                                                                                   </select>
                                    </div>
                            
                                        <label className="col-sm-2 form-control-label text-xs-right"> SGD </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Currency" id="Subscription Amount" onChange={this.handleSubscrtiptionAmountChange} name='Subscription Amount' value={this.state.subscriptionamount}/>
                                        </div>
                                        </div>   
                              
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Agent Name: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Agent Name" 
                                            id="Agent Name" onChange={this.handleAgentNameChange} name='Agent Name' value={this.state.agentname}/> 
                                        </div>
                                    
                                        <label className="col-sm-2 form-control-label text-xs-right"> NRIC/Passport Number: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="NRIC/Passport Number" id="NRIC/Passport Number" onChange={this.handlePassportNumberChange} value={this.state.passportnumber} /> </div>
                                        </div>   
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> No of Preference Shares: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="No of Shares" id="No of Preference Shares" onChange={this.handleSharesCountChange} value={this.state.sharescount} /> </div>
                                    
                                        <label className="col-sm-2 form-control-label text-xs-right"> Monthly Profit pay by Company: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Monthly Profit pay" id="Monthly Profit pay by Company" onChange={this.handleMonthlyProfitPayChange} value={this.state.monthlyprofitpay} /> </div>
                                        </div> 
                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Value: </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control box_ip" placeholder="Contract Amount" id="Contract Value" onChange={this.handleContractValueChange} value={this.state.currency} /> 
                                        </div>
                                         <label className="col-sm-2 form-control-label text-xs-right"> Contract Start Date: </label>
                                        <div className="col-sm-4">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.contractstartDate}
                                            onChange={this.handleContractStartDateChange}
                                            id="Contract Start Date"
                                        />
                                        </div>
                                      
                                        </div>  
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract End Date: </label>
                                        <div className="col-sm-4">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.contractendDate}
                                            onChange={this.handleContractEndDateChange}
                                            id="Contract End Date"
                                        />
                                        </div>
                                        <label className="col-sm-2 form-control-label text-xs-right"> First Pay out Date: </label>
                                        <div className="col-sm-4">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.firstpayoutDate}
                                            onChange={this.handleFirstPayoutDateChange}
                                            id="First Pay out Date"
                                        />
                                        </div>

                                       
                                    </div> 
                                           <div className="form-group row">
                                       

                                        

                                        <label className="col-sm-2 form-control-label text-xs-right"> Last Pay out Date: </label>
                                        <div className="col-sm-4">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.lastpayoutDate}
                                            onChange={this.handleLastPayoutDateChange}
                                            id="Last Pay out Date"
                                        />
                                        </div>


                                        <label className="col-sm-2 form-control-label text-xs-right"> Subscription Amount Payback Date: </label>
                                        <div className="col-sm-4">
                                            <DatePicker
                                            className = "form-control"
                                            selected={this.state.subscriptionamountpayDate}
                                            onChange={this.handleSubscriptionamountPayDateChange}
                                            id="Subscription Amount Payback Date"
                                        />
                                        </div>

                                        </div>    
                                    
                                         
                                       <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Editor: </label>
                                        <div className="form-group col-sm-10">
                                       
                                           <CKEditor id="currentCKEditor" activeClass="editor" content={this.state.editorContent}  events={{"instanceReady": this.ckeditorInstanceReady, onChange : this.handleEditorChange }}/>
                                       </div>
                                       </div>
                                           
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Agent Signature: </label>
                                        <div style= {{backgroundColor: '#f1f1f1'}}>
                                            <SignaturePad clearButton="true" />
                                            </div>

                                        <label className="col-sm-2 form-control-label text-xs-right"> Client Signature: </label>
                                            <div style= {{backgroundColor: '#f1f1f1'}}>
                                            <SignaturePad clearButton="true" />
                                            </div>
                                       
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Uploaded File: </label>
                                        <div className="col-sm-4">
                                            <div className="images-container">
                                                <div className="image-container">
                                                    <a href="#" title="">
                                                    <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div></a>
                                                </div>
                                                <div className="image-container">
                                                    <a href="#" title="">
                                                    <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div></a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-2">
                                            
                                        </div>
                                        <div className="col-sm-4">
                                            {/*<a className="btn btn-primary ml-0 mr-2" href="#" data-toggle="modal" data-target="#modal-media">Upload Docs</a>*/}
                                            <div className="col-sm-8 d-flex justify-content-end">
                                        <div className="images-container">
                                            <div className="FileUpload" >
                                              <Dropzone
                                                onDrop={this.onImageDrop.bind(this)}
                                                multiple={false}
                                                accept="image/*">
                                                <div>Drop an image or click to select a file to upload.

                                                  <a className="btn btn-primary ml-0 mr-2" href="">Upload Docs</a>
                                                </div>
                                              </Dropzone>
                                            </div>

                                            <div>
                                              {this.state.picture === '' ? null :
                                              <div>
                                                <p>{this.state.uploadedFile.name}</p>
                                                <img src={this.state.picture} />
                                              </div>}
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                              
                                
                                
                            </div>
                        
                    </form>
                
                <div className="modal fade" id="modal-media">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Media Library</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="modal-body modal-tab-container">
                                <ul className="nav nav-tabs modal-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#gallery" data-toggle="tab" role="tab">Gallery</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#upload" data-toggle="tab" role="tab">Upload</a>
                                    </li>
                                </ul>
                                <div className="tab-content modal-tab-content">
                                    <div className="tab-pane fade" id="gallery" role="tabpanel">
                                        <div className="images-container">
                                            <div className="row">
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade active in" id="upload" role="tabpanel">
                                        <div className="upload-container">
                                            <div id="dropzone">
                                                <form action="/" method="POST" enctype="multipart/form-data" className="dropzone needsclick dz-clickable" id="demo-upload">
                                                    <div className="dz-message-block">
                                                        <div className="dz-message needsclick"> Drop files here or click to upload. </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Insert Selected</button>
                            </div>
                        </div>
                        
                    </div>
                  
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

export default ContractDetails;





 