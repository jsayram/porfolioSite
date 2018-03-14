import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { DataService } from '../../services/data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contacts;
  constructor (private _dataService: DataService, private _flashMessagesService: FlashMessagesService){
  	
  }

  ngOnInit() {
  	// this.getContacts();  // THERE ARE NO CONTACTS TO GET
  }
  

  /*No Need to get the contacts*/
  // getContacts(){
  //  this._dataService.getContacts().subscribe(
  //     data => { this.contacts = data},
  //     err => console.error(err),
  //     () => console.log('done loading contacts')
  //   );
  // }

  onSubmit(value: NgForm){ 
  	console.log(value);  //this holds my form data ready to be sent to the server it works, Its not being sent to nodemailer yet....(03/13)
    let contact = {value: value};
    console.log(contact);
    this._dataService.createContact(contact).subscribe(
       data => {
         // refresh the list
        // this.getContacts();  //no need to refresh the list
         return true;
       },
       error => {
         console.error("Error saving Contact!");
         return Observable.throw(error);
       }
     );
     this._flashMessagesService.show('Thank you, Your Message is on its way!', { cssClass: 'alert-success', timeout: 4000 });
     setTimeout(()=>{ 
       this._flashMessagesService.show('Refreshing Page.....', { cssClass: 'alert-danger', timeout: 2000 });
       setTimeout(()=>{console.log("Time out two")}, 500);
     	window.location.reload();
     	console.log("After Reload");	
     }, 4000);
   }
}
