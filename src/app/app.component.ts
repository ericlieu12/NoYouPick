import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ChatService } from './chat.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
   public auth: AuthService,
   public cs: ChatService, 
   private metaService: Meta) {}

ngOnInit() {
    
    this.metaService.addTags([
      {name: 'keywords', content: 'NoYouPick!, noyoupick, noyoupick io, tinder food, food, tinder but for food, movies, and places'},
      {name: 'description', content: 'NoYouPick simply aims to solve the problem of not knowing where to eat, watch, or hangout. Whether you are with a hungry group of friends or a significant other, NoYouPick provides an easy experience for figuring it out together, Tinder style! Instead of having others say the dreaded "No, you pick", just use us!'},
      
    ]);
  }
  

}