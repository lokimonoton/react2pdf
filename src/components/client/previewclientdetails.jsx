import React from 'react';
import { Link } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class PreviewClientDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };

    }

render() {
    let data = {name : "siva", DOB: '13/06/1994'};
        return (
            <div > 
            	<div className="title-block">
                        <h3 className="title"> Client Info
                            <span className="sparkline bar" data-type="bar"></span>
                        </h3>
                        
                                   
                    </div>
                    <form name="item">
                        <div className="card card-block">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Client Name: </label>
                                        <div className="col-sm-8 text-right">{data.name}</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Date of Birth: </label>
                                        <div className="col-sm-8 text-right">{data.DOB}</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> IC No: </label>
                                        <div className="col-sm-8 text-right">IC123456</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Nationality: </label>
                                        <div className="col-sm-8 text-right">Singapore</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Residential Status: </label>
                                        <div className="col-sm-8 text-right">Own House</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Martial Status: </label>
                                        <div className="col-sm-8 text-right">Married</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Spouse Name: </label>
                                        <div className="col-sm-8 text-right">Dinna Blue</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> No of Children: </label>
                                        <div className="col-sm-8 text-right">1</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Handphone Number: </label>
                                        <div className="col-sm-8 text-right">+61 1234 2343</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Address: </label>
                                        <div className="col-sm-8 text-right">23, Sheernes Mews, Downtown</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Email ID: </label>
                                        <div className="col-sm-8 text-right">john.may@gmail.com</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Occupation: </label>
                                        <div className="col-sm-8 text-right">Business</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Place of Work(Company): </label>
                                        <div className="col-sm-8 text-right">Singapore</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Accademic Qualification: </label>
                                        <div className="col-sm-8 text-right">MSc, Social Science</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Salary Range: </label>
                                        <div className="col-sm-8 text-right">$100000-$200000</div>
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Profile Pic: </label>
                                        <div className="col-sm-8 d-flex justify-content-end">
                                            <div className="images-container">
                                                <div className="image-container">
                                                    <a href="#" title="" data-toggle="modal" data-target="#modal-media">
                                                    <div className="image" ></div></a>
                                                </div>
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

export default PreviewClientDetails;





 