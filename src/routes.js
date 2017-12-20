import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import loginPage from './components/login/login.component.jsx';  //eslint-disable-line import/no-named-as-default
import dashboard from './components/dashboard';
import clientList from './components/client/clientlist.component.jsx';
import ClientDetails from './components/client/clientdetails.jsx';
import TemplateList from './components/template/templatelist.jsx';
import TemplateDetails from './components/template/templatedetails.jsx';
import ContractList from './components/contract/contractlist.jsx';
import ContractDetails from './components/contract/contractdetails.jsx';
import FormList from './components/forms/formlist.jsx';
import FormDetails from './components/forms/formdetails.jsx';
import Home from './components/Home/home.jsx';
import Report from './components/report/report.jsx';
import PreviewClientDetails from './components/client/previewclientdetails.jsx';
import PreviewContract from './components/contract/previewContract.jsx';
import PreviewTemplate from './components/template/previewTemplate.jsx';
// import Panda from './panda.jsx';

export default (
        <Route component={App}>
            <Route path="/" >
                <IndexRoute component={loginPage} />
            </Route>
            {/* <Route path="/panda" component={Panda} /> */}
            <Route path="/dashboard" component={dashboard} >
            
                <Route path="/home" component={Home} />
                 <Route path="/report" component={Report} />
                <Route path="/clients" component={clientList} />
                <Route path="/clientdetails" component={ClientDetails} />
                <Route path="/templatelist" component={TemplateList} />
                <Route path="/templatedetails" component={TemplateDetails} />
                <Route path="/contractlist" component={ContractList} />
                <Route path="/contractdetails" component={ContractDetails} />
                <Route path="/formlist" component={FormList} />
                <Route path="/formdetails" component={FormDetails} />
                <Route path= "/previewclientdetails" component={PreviewClientDetails}/>
                <Route path= "/previewContract" component={PreviewContract}/>
                <Route path= "/previewTemplate" component={PreviewTemplate}/>
            </Route>
        </Route>
    );
