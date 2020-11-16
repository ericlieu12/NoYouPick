import { AppComponent } from './../app.component';
import {Component, ViewChild, ViewChildren, QueryList, OnInit} from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HostListener } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from '../keyframes';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  Direction,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
 import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]
})
export class PlacesComponent implements OnInit {
  room$: Observable<any>;
  index: number;
  roomID: string;
  choices: number[];
  users : [String];
  isFinished: boolean;
  scalevalue : number;
  scalevalue2 : number;
  direction: boolean;
  host: {'window:beforeunload':'signOut'}
   @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<any>;
  stackConfig: StackConfig;
  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private clipboard: Clipboard,
    private titleService: Title,
    private metaTagService: Meta
  ) {
 
  this.stackConfig = {
      allowedDirections: [
        Direction.LEFT,
        Direction.RIGHT,
      ],
      throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
        this.scalevalue = Math.min(Math.max((Math.abs(offsetX) + 900) / 1000, 0.9), 1);
        
        const xConfidence = Math.min(Math.abs(offsetX) * 1.8 / targetElement.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(offsetY) * 1.8/ targetElement.offsetHeight, 1);

        return Math.max(xConfidence, yConfidence);
      },
      
    };

  
  }
  showMatch(data)
  {
    var pricestring = "";
    if (data.price = "$")
    {
      pricestring = "Cheap cost"
    }
    if (data.price = "$$")
    {
      pricestring = "Alright cost"
    }
     if (data.price = "$$$")
    {
      pricestring = "Kinda expensive"
    }
     if (data.price = "$$$")
    {
      pricestring = "Very expensive"
    }
     Swal.fire({
      title: "IT'S A MATCH!",
      html: "<img src ='" + data.image_url + "' height='200', width = '200'> <br>" +data.name + "<br>" + data.location.address1 + "<br>" +  data.location.city + ","+ data.location.state + "<br>" + data.phone, 


      
      
    });
  }
  gotoYelp() {
  
          window.location.href='http://www.yelp.com/';
     
  
}

  showYelpInfo(data) {

    var pricestring = "";
    if (data.price = "$")
    {
      pricestring = "Cheap cost"
    }
    if (data.price = "$$")
    {
      pricestring = "Alright cost"
    }
     if (data.price = "$$$")
    {
      pricestring = "Kinda expensive"
    }
     if (data.price = "$$$")
    {
      pricestring = "Very expensive"
    }
     Swal.fire({
      
      html: "<img src ='" + data.image_url + "' height = '200'></a><br><span style='font-size:24px'>" + data.name + "</span><br><li>" +data.rating + " stars from " + data.review_count + " reviews</li><li><b>" + pricestring +"</b></li><li>"+
      data.location.address1 + "</li>"+  data.location.city + ","+ data.location.state + "</li><li>" + data.phone , 

      footer: "<a href='http://www.yelp.com/' target='blank'>Powered by <img src = '/assets/yelp.png' height = '40'></a>"
      
      
      
    });
  }


showMatchInfo(data) {
  Swal.fire({
    position: 'bottom',
    title: data.name,
    html: "<li>" + data.rating + " stars from " + data.review_count + " reviews</li><li>"+
    data.location.address1 + "</li>"+  data.location.city + ","+ data.location.state + "</li><li>" + data.phone ,     
    
  });
}
getStaticMapsUrl(lat, lng, radius)
{
  if (window.outerWidth >= 700)
  {
    var mapwidth = 595;
  }
  else
  {
    mapwidth = window.outerWidth * .85;
  }

 var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=12.5&size=" + Math.floor(mapwidth) + "x" + Math.floor(window.outerHeight*.4) +"&"
  var circlepoints:any[] = [];
  var deg;
    for (deg = 0; deg <= 360; deg += 5) {
        var rad = deg * (Math.PI/180);
        var lat_rad = lat * (Math.PI/180);
        var lng_rad = lng * (Math.PI/180);
         var dist = (radius / 6378137/2);

        var latlng = {lat:0, lng:0};
       var new_lat = Math.asin(Math.sin(lat_rad) * Math.cos(dist) + Math.cos(lat_rad) * Math.sin(dist) * Math.cos(rad));
        var new_lng = lng_rad + Math.atan2(Math.sin(rad) * Math.sin(dist) * Math.cos(lat_rad), Math.cos(dist)
                - Math.sin(lat_rad) * Math.sin(new_lat));

        // convert new lat and lon to degrees
         latlng.lat = new_lat * (180/Math.PI);
        latlng.lng = new_lng * (180/Math.PI);

        circlepoints.push(latlng)
    }
    var i;
    var pathstring ="";
    pathstring = "path=color:red|weight:0|fillcolor:red"
    for (i = 0; i < circlepoints.length; i++)
    {
      pathstring = pathstring + "|" + circlepoints[i].lat +"," + circlepoints[i].lng;
    }
    
      return url + "&markers=color:red|"+lat+","+lng+"|&" + pathstring +"&key=";
    
  }
getUrl(url)
{
  return "url('" + url +"')";
}
getscale()
{
  return "scale(" + this.scalevalue +")";
}
showError(error){
 if (error == 0)
 {
   Swal.fire({
    title: "Error",
    icon: 'error',
    text: 'Room in progress'
     });
 }
 if (error == 1)
 {
   Swal.fire({
    title: "Error",
    icon: 'error',
    text: 'Lobby is full, cannot join.'
     });
 }
}
   animationState: string;
   startAnimation(state) {


    if (!this.animationState) {
      this.animationState = state;

    }
    
  }

  resetAnimationState(state,max) {
    
    if (this.animationState == 'swipeleft')
    {
      this.changevoteno(max);
    }
     if (this.animationState == 'swiperight')
    {
      this.changevoteyes(max);
    }
    this.animationState = '';
    this.scalevalue = 0.9;
  }
  //calls when leave
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander($event) {
    //this.cs.remove(this.roomID, this.auth.uid, this.auth.displayName);
    //this.auth.signOut();
    
    //return false;
     
  }
  showLogin()
  {
    Swal.fire({
    title: "Name",
    text: "What would you like your name to be? Ignore for a random name.",
     input: 'text',
  inputLabel: 'Name',
   
  showCancelButton: true,
  inputValidator: (value) => {
     this.auth.anonymousLoginno(value);
     
  }
    });

   
  }
  getSwipeSize() {
    return "scale(" + this.scalevalue +")"
  }
  showMap(data) {
    var urlstring = "https://www.google.com/maps/search/?api=1&query=";
    urlstring = urlstring + data.coordinates.latitude + "," + data.coordinates.longitude;
    
    window.open(urlstring);
  }
  showDonate() {
   
    window.open("https://venmo.com/code?user_id=2542583116988416039");
  }
  
  copylink()
  {
    
    this.clipboard.copy("noyoupick.io/places/" + this.roomID)
    console.log("copy requested");
    Swal.fire({
      title: 'Copied Link',
      text: "Share with your friends",
      icon: 'success',
      
      
    });
    
  }
  infoButton()
  {
    
    // console.log("opened info");
    Swal.fire({
      title: 'NoYouPick!',
      text: 'This is the lobby. Wait for the host to start, then begin swiping on your favorite places!',
      icon: 'info',
      imageWidth: 400,
      imageHeight: 200,
    });
    
  }

   waitingButton()
  {
    
    // console.log("opened info");
    Swal.fire({
      title: 'NoYouPick!',
      html: 'Hold up!<br>Your content will be ready shortly!',
      icon: 'info',
      imageWidth: 400,
      imageHeight: 200,
    });
    
  }
  viewpersonowner(uid,name)
  {
    Swal.fire({
      title: name,
      text: "Your fellow picker",
      icon: 'success',
      showCloseButton: true,
      showCancelButton: true,

      confirmButtonText: 'Make Owner',
      cancelButtonText:'Kick',
    }).then((result) => {
      if (result.value) {
        this.cs.makeowner(this.roomID,uid);
        Swal.fire(
          'New Owner',
          name + ' has been made the new owner!',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.cs.remove(this.roomID, uid, name);
        Swal.fire(
          'Kicked',
          name + ' has been kicked!',
          'success'
        )
      }
    })
  }
  viewperson(uid,name)
  {
    Swal.fire({
      title: name,
      text: "Your fellow picker",
      icon: 'success',
     
  })
  }
  changevoteyes(max)
  {  
    
    //checks every 5 indexes. has to be +1 b/c arrays start at 0
    this.choices.push(1);
    if (this.index < (max-1))
    { if ((this.index+1) % 5 == 0)
      {//if this is your 5th, 10th, 15th.. vote, send data to server
        this.updateScores(false);
      }
      
      this.index = this.index + 1;
    this.cards = [this.index];}
      
  else {
    this.isFinished = true;
    if ((this.index+1) % 5 == 0)
      {

        this.updateScores(true);
      }
      else
    {
      var i;
      for (i = max % 5; i < 5; i++)
      {
        this.choices.push(0);
      }
      this.updateScores(true);
    }
    //if max index reached, set room to done

   
  }
  }
  changevoteno(max)
  {  
 
    //checks every 5 indexes. has to be +1 b/c arrays start at 0
    this.choices.push(0);
    if (this.index < (max-1))
    { //if this is your 5th, 10th, 15th.. vote, send data to server
      if ((this.index+1) % 5 == 0)
      {
        this.updateScores(false);
      }
      this.index = this.index + 1;
    this.cards = [this.index];}
      
  else {
    this.isFinished = true;
    if ((this.index+1) % 5 == 0)
      {
        this.updateScores(true);
      }
    else
    {
      var i;
      for (i = max % 5; i < 5; i++)
      {
        this.choices.push(0);
      }
      this.updateScores(true);
    }
    
  }
  }
  startRoom()
  {
    //starts the room
    this.titleService.setTitle("NoYouPick - Lobby In Progress")
    return this.cs.start(this.roomID)
  }
  updateScores(isDone)
  {
    const roomID = this.route.snapshot.paramMap.get('id');
    this.cs.update(roomID, this.index, this.choices, isDone);
    //i honestly dont know how to do this, fuck typescript
    this.choices.pop();
    this.choices.pop();
    this.choices.pop();
    this.choices.pop();
    this.choices.pop();

    return
  }
  getOtherUser(selfName, users) {
    var i;
    if (users.length == 1)
    {
      return "You"
    }
    for (i=0; i< users.length; i++)
    {
      if (selfName != users[i].displayName)
      {
        if (users.length == 2)
    {
      return "You and " + users[i].displayName
    }
        return "You, " + users[i].displayName + ", and others"
      }
    }


  }
  copylinkalert()
  {
     Swal.fire({
      title: 'Welcome!',
      html: 'Share this link! <br> noyoupick.io/places/' + this.roomID,
      icon: 'success',
      
      confirmButtonText: 'Copy Link',
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.clipboard.copy("noyoupick.io/places/" + this.roomID)
        console.log("copy requested");
      }
    })
  }
  ngOnInit() {
 
    this.roomID = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(this.roomID);
    this.index = 0;
    this.choices = [];
    this.room$ = source; 
   this.cards = [0];
   this.isFinished = false;
   this.scalevalue = 0.9;
   this.titleService.setTitle("NoYouPick - Lobby In Progress");
   this.metaTagService.updateTag({ name: 'description', content: 'NoYouPick - Tinder, but for food! Lobby in progress.' });
  }




  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent, max) {
    
    if (event.throwDirection == Direction.LEFT)
    {
        
        
        this.changevoteno(max);
    }
    
    if (event.throwDirection == Direction.RIGHT)
    {
        
        
        this.changevoteyes(max);
    }
    

  }
}