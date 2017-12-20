import React from 'react';
import { Link } from 'react-router';
import { Document } from 'react-pdf/build/entry.webpack';
import * as ContractAction from '../../actions/contractAction.jsx';
import ContractStore from '../../store/contractStore.jsx';
import html2canvas from 'html2canvas';
class PreviewContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           singlecontract: {
            contract: {},
           },
           numPages: null,
           pageNumber: 1,
        };
     this._contractStoreChange = this._contractStoreChange.bind(this);
     this.onDocumentLoad = this.onDocumentLoad.bind(this);
    }

    componentWillMount() {
      ContractStore.on('change', this._contractStoreChange);
     }

    componentWillUnmount() {
        ContractStore.removeListener('change', this._contractStoreChange);
     }
   
    componentDidMount() {
    
    }

   _contractStoreChange(type){
        if(type == 'ContractList'){
        let contractlist = ContractStore._getContractDetailsList() || {};
        this.setState({contractlist});
      }
      if(type == 'SingleContract'){
        let singlecontract = ContractStore._getSingleContractDetails() || {};
        this.setState({singlecontract});
        
      }
    }

    onDocumentLoad(numPages){
        console.log("numPages",numPages);
    this.setState({ numPages });
  }
  printDocument() {
    const input = document.getElementById('divToPrint');
    
    html2canvas(input)
      .then((canvas) => {
        
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('l', 'px', [520,120]);
        // pdf.viewerPreferences({'FitWindow': true}, true)
        
        pdf.addImage(canvas, 'JPEG', 0,0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

render() {
    let singlecontract = this.state.singlecontract;
    const { pageNumber, numPages } = this.state;
        return (
            <div>
                 <div className="sidebar-overlay" id="sidebar-overlay"></div>
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div className="mobile-menu-handle"></div>
                
                    <div className="title-block">
                        <h3 className="title"> Preview Contract</h3>
                    </div>

                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card sameheight-item">
                                <div className="card-block">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <a href="#contractPrev" className="nav-link active" data-target="#contractPrev" data-toggle="tab" aria-controls="contractPrev" role="tab">Contract Preview</a>
                                        </li>
                                        
                                    </ul>
                                    
                                    <div className="tab-content tabs-bordered">
                                        <div className="tab-pane active p-4" id="contractPrev">
                                            <div className="row">
                                                <div className="col-md-4">
                                                     <div className="form-group d-flex">
                                                        <label className="form-control-label text-xs-right"> Contract Title: </label>
                                                        <div className="ml-2">{singlecontract.contract.title}</div>
                                                    </div>

                                                    <div className="form-group d-flex">
                                                        <label className="form-control-label text-xs-right"> Contract Name: </label>
                                                        <div className="ml-2">{singlecontract.contract.name}</div>
                                                    </div>

                                                    <div className="form-group d-flex">
                                                        <label className=" form-control-label text-xs-right"> Contract ID: </label>
                                                        <div className="ml-2">{singlecontract.contract.contractId}</div>
                                                    </div>
                                                    <div className="form-group d-flex">
                                                        <label className=" form-control-label text-xs-right"> Contract Version: </label>
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
                                                        <Link to="/contractdetails" className="btn btn-primary ml-2 mr-2" >Edit</Link>
                                                        <button onClick={this.printDocument} className="btn btn-primary ml-2 mr-2">PDF</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div id="divToPrint" className="col-md-10 m-auto pt-5 pb-5">
                                                    <h4>Contract Preview</h4>
                                                    <p>{singlecontract.contract.html}</p>
                                                    {/*<Document
                                                      file=""
                                                      onLoadSuccess={this.onDocumentLoad}>
                                                    </Document>*/}
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

export default PreviewContract;





 