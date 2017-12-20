import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';

export default class ClickableRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            },
            clientdetails:  [],
        };

        this.clicked = this.clicked.bind(this); 
        this._clientStoreChange = this._clientStoreChange.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
        
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

    
    

    _handleFormSelection(name){
      let data = {
          name : this.state.cell.row,
        };
        console.log("data",data);
       
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    render() {
        
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <Link to="/previewclientdetails" className=" mr-2">
                        <i className="fa fa-eye"></i> 
                    </Link>


                    <a  className=" mr-2" onClick={this._handleFormSelection}>
                        <i className="fa fa-trash-o"></i>
                    </a>

                </div>
          );
    }
}