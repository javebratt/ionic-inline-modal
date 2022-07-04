import { Component, ViewChild } from '@angular/core';
import { IonModal, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;
  message = `Click Open to show the modal.`;
  presentingElement = this.ionRouterOutlet.nativeEl;
  constructor(private readonly ionRouterOutlet: IonRouterOutlet) {}

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }

  confirm() {
    const person: Person = {
      name: 'Jorge Vergara',
      age: 36,
    };
    this.modal.dismiss(person, 'confirm');
  }

  onWillDismiss(modalEvent: Event) {
    const customModalEvent = modalEvent as ModalCustomEvent;
    if (customModalEvent.detail.role === 'dismiss') {
      this.message = `User dismissed the modal, so nothing do to here.`;
    }
    if (customModalEvent.detail.role === 'confirm') {
      const { name, age } = customModalEvent.detail.data;
      this.message = `User confirmed their details, their name is ${name}, and they are ${age} years old.`;
    }
  }
}

interface Person {
  name: string;
  age: number;
}

interface ModalCustomEvent extends CustomEvent {
  target: HTMLIonModalElement;
  detail: {
    data: Person;
    role: string;
  };
}
