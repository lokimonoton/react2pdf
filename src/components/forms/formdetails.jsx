import React from 'react';
import { Link} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class FormDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
           

        };
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

      
    render() {
        return (
            <div> 
            <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
            	<div className="title-block">
                        <h3 className="title"> Share Holder Form 
                            <span className="sparkline bar" data-type="bar"></span>
                        </h3>
                    </div>
                    <form name="item">
                        <div className="card card-block">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className=" form-control-label text-xs-right"> Contract ID: </label>
                                        <div className="col-sm-8 ml-2">
                                        <input type="text" className="form-control box_ip" placeholder="Contract ID" />

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Created Date: </label>
                                        <div className="col-sm-8 ml-2">
                                           <input type="text" className="form-control box_ip" placeholder="Created Date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Last Editor Date: </label>
                                        <div className=" col-sm-8 ml-2">
                                             <input type="text" className="form-control box_ip" placeholder="Last Edited Date" />
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Subscription Amount: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="Currency" onChange={this.handleSubscrtiptionAmountChange} name='Subscription Amount' value={this.state.subscriptionamount}/></div>
                                    </div>

                                    <div className="form-group row d-flex align-items-center">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Start Date: </label>
                                        <div className="col-sm-3">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.contractstartDate}
                                            onChange={this.handleContractStartDateChange}
                                        />
                                        </div>

                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract End Date: </label>
                                        <div className="col-sm-3">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.contractendDate}
                                            onChange={this.handleContractEndDateChange}
                                        />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Agent Name: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="Agent Name" onChange={this.handleAgentNameChange} name='Agent Name' value={this.state.agentname}/> </div>
                                    </div>


                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> NRIC/Passport Number: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="NRIC/Passport Number" onChange={this.handlePassportNumberChange} value={this.state.passportnumber}/> </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> No of Preference Shares: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="No of Shares" onChange={this.handleSharesCountChange} value={this.state.sharescount}/> </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Monthly Profit pay by Company: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="Monthly Profit pay" onChange={this.handleMonthlyProfitPayChange} value={this.state.monthlyprofitpay}/> </div>
                                    </div>
                                    <div className="form-group row d-flex align-items-center">
                                        <label className="col-sm-2 form-control-label text-xs-right"> First Pay out Date: </label>
                                        <div className="col-sm-3">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.firstpayoutDate}
                                            onChange={this.handleFirstPayoutDateChange}
                                        />
                                        </div>

                                        <label className="col-sm-2 form-control-label text-xs-right"> Last Pay out Date: </label>
                                        <div className="col-sm-3">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.lastpayoutDate}
                                            onChange={this.handleLastPayoutDateChange}
                                        />
                                        </div>
                                    </div>
                                   
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Subscription Amount Payback Date: </label>
                                        <div className="col-sm-3">
                                            <DatePicker
                                            className = "form-control box_ip"
                                            selected={this.state.subscriptionamountpayDate}
                                            onChange={this.handleSubscriptionamountPayDateChange}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Value: </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control box_ip" placeholder="Contract Amount" onChange={this.handleContractValueChange} value={this.state.currency}/> </div>
                                    </div>
                                    
                                    
                                
                                
                            </div>
                        </div>
                        </div>
                    </form>
              
             </div>
        )
    }
}

export default FormDetails;





 