import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from '@models/article.model';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent {
  @Input() article!: Article;
  @Output() cardClick = new EventEmitter<Article>();

  constructor(private modalController: ModalController) {}

  public async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        article: this.article,
      },
      cssClass: 'news-modal',
    });

    await modal.present();
    this.cardClick.emit(this.article);
  }
}
