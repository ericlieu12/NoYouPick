import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
 import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-homenomap',
  templateUrl: './homenomap.component.html',
  styleUrls: ['./homenomap.component.scss'],
 
})
export class HomenomapComponent implements OnInit {

  userChats$;
 
  


  
    signOut() {
      this.auth.signOut();
    }
    createRoomAlert(netflixCode)
    {
      
      var url = this.router.url;
       Swal.fire({
    title: "Name",
    text: "What would you like your name to be? Ignore for a random name.",
     input: 'text',
  inputLabel: 'Name',
   
  showCancelButton: true,
  inputValidator: (value) => {
    
     this.auth.anonymousLoginMovie(0, 0, value, url, netflixCode)
  }
    });
     
    }
  
  constructor(
    public auth: AuthService, 
    public cs: ChatService, 
    private router:Router,
    private http:HttpClient,
    private titleService: Title,
    private metaTagService: Meta) {

  }
 showInstructions() {
 
   Swal.fire({
    title: "How To!",
    html: "<img src ='/assets/logohor.png'> <br> Choose your genre!",
    footer: '<a href = "https://noyoupick.io/privacy">Privacy Policy</a>',
    });}

ngOnInit() {
	 var url = this.router.url;
  url = url.substring(1);
  this.titleService.setTitle("NoYouPick - "+ url.charAt(0).toUpperCase() + url.slice(1));
   this.metaTagService.updateTag({ name: 'description', content: 'NoYouPick - Tinder, but for food, movies, and places! ' +url.charAt(0).toUpperCase() + url.slice(1) });
 }}




