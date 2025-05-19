import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Evenement, EventService } from '../services/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lignetemps',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './lignetemps.component.html',
  styleUrl: './lignetemps.component.css'
})
export class LignetempsComponent implements OnInit{

  events: Evenement[] = [];
  favEvents: Evenement[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getFavEvents().subscribe((data) => {
      this.favEvents = data;
    });
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;

      this.events.forEach(event => {
      this.eventService.getEventImage(event.id).subscribe(image => {
          event.image = image.url;
        });
        console.log(event)
      });
    });
  }

  isFavori(eventId: number): boolean {
    return this.favEvents.some(fav => fav.id === eventId);
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
