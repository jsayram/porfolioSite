import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class DataService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    // getContacts() {
    //     return this.http.get('/api/send');
    // }


    createContact(contact) {
       let body = JSON.stringify(contact);
       console.log("inside the createContact method");
       console.log(body);
       return this.http.post('/api/send', body, httpOptions);
   }


}