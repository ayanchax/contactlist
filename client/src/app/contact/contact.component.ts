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

  // dependency injection, that is how we inject the associated service into the component
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    // every time this component is initialized/loaded this oninit method is executed.
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  addContact() {
    const newContact = {
      _id: "",
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
    }
    this.contactService.addContact(newContact).subscribe(data => {
      if (Number(data.msg.split("#")[1]) == 1) {
        this.contacts.push(newContact);
        this.loadContacts();
        this.clearForm();
      }
    })
  }

  private loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  private clearForm() {
    this.first_name = "";
    this.last_name = "";
    this.phone = "";
  }

  removeContact(id: any) {
    if (id) {
      this.contactService.deleteContact(id).subscribe(data => {
        if (Number(data.msg.split("#")[1]) == 1) {
          for (var i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i]._id == id) {
              this.contacts.splice(i, 1);
            }
          }
        }
      })
    }


  }

  getAutoID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

}
