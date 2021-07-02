import { Component, OnInit } from '@angular/core';
import { ContactService } from "../contact.service";
import { ContactSchema } from "../contact.schema";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService] // contact service is the data provider for this component
})
export class ContactComponent implements OnInit {
  contacts!: ContactSchema[]
  contact!: ContactSchema;
  first_name!: string;
  last_name!: string;
  phone!: string;

  // dependency injection, that is how we inject the associated service into associated component
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {

    // every time this component is initialized/loaded this oninit method is executed.

    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;

    });


  }

}
