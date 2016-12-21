import {Component} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http'
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';


@Injectable()
@Component({
	moduleId: module.id,
    selector: 'form-cmp',
    templateUrl: './forms.component.html'
})

export class FormComponent {
	customers:Object;
	years:Object;
	months:Object;
	revenues:Object;
	year_id:string;
    customer_id:string;
    month_id:string;
    revenue_type:string;
    revenue_offshore:string;
    revenue_onsite:string;
    edit_revenue_offshore:string;
    edit_revenue_onsite:string;
    cummilate_offshore:string;
    cummilate_onsite:string;
    incdec_offshore:string;
    incdec_onsite:string;
    editMonthId:string;
	http:Http;
	edit:boolean;
	revenuetable:boolean;
	constructor(http: Http) {
        this.years = [];
        this.customers=[1];
        this.months=[2];
        this.revenues=[3];
        this.year_id='';
        this.customer_id='';
        this.month_id='';
        this.revenue_type='';
        this.revenue_offshore='';
        this.revenue_onsite='';
      
        //this.editMonthId='';
        this.http=http;
        http.get('http://localhost:81/master/revenue.php?action=years').map((res: Response) => res.json()).subscribe(res => this.years = res);
        http.get('http://localhost:81/master/revenue.php?action=customers').map((res: Response) => res.json()).subscribe(res => this.customers = res);       
    }
   

      
  	 addRevenue(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('year_id', this.year_id);
        urlSearchParams.append('customer_id', this.customer_id);
        urlSearchParams.append('month_id', this.month_id);
        urlSearchParams.append('revenue_type', this.revenue_type);
        urlSearchParams.append('revenue_offshore', this.revenue_offshore);
        urlSearchParams.append('revenue_onsite', this.revenue_onsite);
        urlSearchParams.append('cummilate_offshore', this.cummilate_offshore);
        urlSearchParams.append('cummilate_onsite', this.cummilate_onsite);
        urlSearchParams.append('incdec_offshore', this.incdec_offshore);
        urlSearchParams.append('incdec_onsite', this.incdec_onsite);
        
        
        let body = urlSearchParams.toString()
       // console.log(this.hcc_id);
        return this.http.post('http://localhost:81/master/revenue.php?action=addRevenue', body, {headers:headers})
            .subscribe((response: Response) => {
                // login successful if there's a jwt token in the response
                //console.log(response);
                var body = response.json();
                //console.log(body);
               // this.resetHccObject();
                //this.updatemonth();
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
   
     revenueview(): void{
    	this.revenuetable=true;
    	this.edit=false;
    	this.editMonthId='';
    	this.http.get('http://localhost:81/master/revenue.php?action=months').map((res: Response) => res.json()).subscribe(res => this.months = res);
    	this.http.get('http://localhost:81/master/revenue.php?action=revenues&year_id='+this.year_id+'&customer_id='+this.customer_id).map((res: Response) => res.json()).subscribe(res => this.revenues = res);
    }
    editRow(revenue:any):void{
        console.log(revenue.id_revenue);
        this.editMonthId='';
        this.edit=true;
        this.edit_revenue_offshore='';
        this.edit_revenue_onsite='';
        this.editMonthId=revenue.id_revenue;
        this.edit_revenue_offshore=revenue.revenue_offshore;
        this.edit_revenue_onsite=revenue.revenue_onsite;
      }
     
    saveRow(id:string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id_revenue', id);
        urlSearchParams.append('year_id', this.year_id);
        urlSearchParams.append('customer_id', this.customer_id);
        urlSearchParams.append('month_id', this.month_id);
        urlSearchParams.append('revenue_type', this.revenue_type);
        urlSearchParams.append('revenue_offshore', this.edit_revenue_offshore);
        urlSearchParams.append('revenue_onsite', this.edit_revenue_onsite);
        urlSearchParams.append('cummilate_offshore', this.cummilate_offshore);
        urlSearchParams.append('cummilate_onsite', this.cummilate_onsite);
        urlSearchParams.append('incdec_offshore', this.incdec_offshore);
        urlSearchParams.append('incdec_onsite', this.incdec_onsite);
        let body = urlSearchParams.toString()
        console.log(this.month_id);
        return this.http.post('http://localhost:81/master/revenue.php?action=editRevenue', body, {headers:headers})
            .subscribe((response: Response) => {
                this.edit=false;
                this.editMonthId='';
                this.edit_revenue_offshore='';
                this.edit_revenue_onsite='';
                // login successful if there's a jwt token in the response
                //console.log(response);
                var body = response.json();
                //console.log(body);
                //this.resetHccObject();
                this.revenueview();
            });
      }
     





}
