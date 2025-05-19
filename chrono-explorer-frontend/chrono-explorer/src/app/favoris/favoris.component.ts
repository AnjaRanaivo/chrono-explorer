import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { Evenement, EventService } from '../services/event.service';

@Component({
  selector: 'app-favoris',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent {
events: Evenement[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getFavEvents().subscribe((data) => {
      this.events = data;

      this.events.forEach(event => {
      this.eventService.getEventImage(event.id).subscribe(image => {
          event.image = image.url;
        });
        console.log(event)
      });
    });
  }

  filters = {
    date: '',
    lieu: '',
    civilisation: '',
    theme: ''
  };

  get filteredEvents() {
    console.log(this.filters.date)
    console.log(this.events)
    return this.events.filter(event =>
      (!this.filters.date || event.date.toString().includes(new Date(this.filters.date).toISOString().split("T")[0])) &&
      (!this.filters.lieu || event.lieu.toLowerCase().includes(this.filters.lieu.toLowerCase())) &&
      (!this.filters.civilisation || event.civilisation.toLowerCase().includes(this.filters.civilisation.toLowerCase())) &&
      (!this.filters.theme || event.theme.toLowerCase().includes(this.filters.theme.toLowerCase()))
    );
  }

}
