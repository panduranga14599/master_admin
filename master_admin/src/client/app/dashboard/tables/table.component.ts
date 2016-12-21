import {Component} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http'
//import { Country } from './country';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
@Component({
    moduleId: module.id,
    selector: 'tables-cmp',
    templateUrl: 'tables.component.html'
})
export class TableComponent {
    countries: Object;
    years: Object;
    months: Object;
    clients: Object;
    hccs: Object;
    monthstable:string;
    selectedObject:string;
    selectedmonth:string;
    showGreeting:boolean;
    edit:boolean;
    editHccId:string;
    show:boolean;
    year_id:string;
    customer_id:string;
    month_id:string;
    hcc_id:string;
    resource_type:string;
    head_count:string;
    resource_add:string;
    resource_reduce:string;
    resource_close:string;  
    resources:string;
    edit_resource_add:string;
    edit_resource_reduce:string;
    //hccObject:Object;
    http:Http;
    constructor(http: Http) {
        this.showGreeting=false;
        this.editHccId='';
        this.edit=false;
        this.countries = [];
        this.years=[1];
        this.months=[2];
        this.hccs=[3];
        this.year_id='';
        this.customer_id='';
        this.month_id='';
        this.http=http;
        this.edit_resource_add='';
        this.edit_resource_reduce='';
        //this.hccObject={};  
        this.resetHccObject();
        //this.selectedObject = {};
        http.get('http://localhost:81/master/api.php?action=directors').map((res: Response) => res.json()).subscribe(res => this.countries = res);
        http.get('http://localhost:81/master/api.php?action=years').map((res: Response) => res.json()).subscribe(res => this.years = res);
        http.get('http://localhost:81/master/api.php?action=months').map((res: Response) => res.json()).subscribe(res => this.months = res);
        http.get('http://localhost:81/master/api.php?action=hccs').map((res: Response) => res.json()).subscribe(res => this.hccs = res);

         
         }
    resetHccObject():void{
        this.hcc_id='';
        this.resource_type='';
        this.head_count='';
        this.resource_add='';
        this.resource_reduce='';
        this.resource_close='';
    }
    updateSelectedValue(): void{
        this.showGreeting = true;
        this.http.get('http://localhost:81/master/api.php?action=customers&id='+this.selectedObject).map((res: Response) => res.json()).subscribe(res => this.clients = res);
      }

      
      updatemonth(): void{
        this.show = true;
        this.edit=false;
        this.editHccId='';
        this.http.get('http://localhost:81/master/api.php?action=monthstable&id='+this.selectedmonth).map((res: Response) => res.json()).subscribe(res => this.monthstable = res);
        this.http.get('http://localhost:81/master/api.php?action=resources&dd_id='+this.selectedObject+'&year_id='+this.year_id+'&month_id='+this.month_id+'&customer_id='+this.customer_id).map((res: Response) => res.json()).subscribe(res => this.resources = res);
      }
      editRow(resource:any):void{
        console.log(resource.id_resourcefc);
        this.editHccId='';
        this.edit=true;
        this.edit_resource_add='';
        this.edit_resource_reduce='';
        this.editHccId=resource.id_resourcefc;
        this.edit_resource_add=resource.resource_add;
        this.edit_resource_reduce=resource.resource_reduce;
      }
     
      addHcc(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('hcc_id', this.hcc_id);
        urlSearchParams.append('dd_id', this.selectedObject);
        urlSearchParams.append('month_id', this.month_id);
        urlSearchParams.append('resource_type', this.resource_type);
        urlSearchParams.append('head_count', this.head_count);
        urlSearchParams.append('resource_add', this.resource_add);
        urlSearchParams.append('resource_reduce', this.resource_reduce);
        urlSearchParams.append('resource_close', this.resource_close);
        urlSearchParams.append('year_id', this.year_id);
        urlSearchParams.append('customer_id', this.customer_id);
        let body = urlSearchParams.toString()
        console.log(this.hcc_id);
        return this.http.post('http://localhost:81/master/api.php?action=addHcc', body, {headers:headers})
            .subscribe((response: Response) => {
                // login successful if there's a jwt token in the response
                //console.log(response);
                var body = response.json();
                //console.log(body);
                this.resetHccObject();
                this.updatemonth();
                return body;
                /*if (body.response){
                    let user = response.json();
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user)); 
                    }
                }
                else{
                    return body;
                }*/
            });
      }
      saveRow(id:string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id_resourcefc', id);
        urlSearchParams.append('hcc_id', this.hcc_id);
        urlSearchParams.append('dd_id', this.selectedObject);
        urlSearchParams.append('month_id', this.month_id);
        urlSearchParams.append('resource_add', this.edit_resource_add);
        urlSearchParams.append('resource_reduce', this.edit_resource_reduce);
        urlSearchParams.append('year_id', this.year_id);
        urlSearchParams.append('customer_id', this.customer_id);
        let body = urlSearchParams.toString()
        console.log(this.hcc_id);
        return this.http.post('http://localhost:81/master/api.php?action=editHcc', body, {headers:headers})
            .subscribe((response: Response) => {
                this.edit=false;
                this.editHccId='';
                this.edit_resource_add='';
                this.edit_resource_reduce='';
                // login successful if there's a jwt token in the response
                //console.log(response);
                var body = response.json();
                //console.log(body);
                this.resetHccObject();
                this.updatemonth();
            });
      }
    }



