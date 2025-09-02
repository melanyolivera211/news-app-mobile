import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article } from '@models/article.model';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false,
})
export class PrincipalNewsComponent {
  @Input() article!: Article;

  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        article: this.article,
      },
      cssClass: 'news-modal',
    });

    await modal.present();
  }
}
