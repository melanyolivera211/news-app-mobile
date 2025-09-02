import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from '@models/article.model';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent {
  @Input() article!: Article;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async openInBrowser() {
    if (this.article.url) {
      await Browser.open({ url: this.article.url });
    }
  }
}
