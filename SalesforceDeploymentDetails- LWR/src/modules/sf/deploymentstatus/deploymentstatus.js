import { LightningElement } from 'lwc';
import { sfGet } from './service.js';

export default class DeploymentStatus extends LightningElement {

    baseUrl;
    sid;
    data = [];
    deploymentId = '';
    deploymentResult = {};
    
    columns = [
        { label: 'Name', fieldName: 'fullName' },
        { label: 'Component Type', fieldName: 'componentType' },
        { label: 'Error Message', fieldName: 'problem' },
        { label: 'is New', fieldName: 'created' ,type: 'boolean'}
    ];

    connectedCallback(){
        const params = new URLSearchParams(window.location.search);

        //get the params from URL
        this.sid = params.get('sid');  //salesforce access_token or session id
        this.baseUrl = 'https://'+params.get('domain'); // domain url of Salesforce Instance. Used for Making API Calls
        this.deploymentId = params.get('deploymentId'); // Current Deployment ID
        this.getDeploymentStatus();
    }

    async getDeploymentStatus(){
            let endPoint = this.baseUrl +'/services/data/v56.0/metadata/deployRequest/'+this.deploymentId+'?includeDetails=true';
            let response = await sfGet(endPoint,this.sid);
            let resp= await response.json();
            console.log(resp);
            this.deploymentResult = resp.deployResult;
            this.data = resp.deployResult.details.allComponentMessages;
    }
}