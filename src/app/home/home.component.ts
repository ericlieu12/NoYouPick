import {
    Router
} from '@angular/router';
import {
    Component,
    OnInit
} from '@angular/core';
import {
    AuthService
} from '../auth.service';
import {
    ChatService
} from '../chat.service';
import {
    MouseEvent as AGMMouseEvent
} from '@agm/core';
import {
    HttpClient
} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
    Title,
    Meta
} from '@angular/platform-browser';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

    zoom: number = 11;
    // https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91
    // initial center position for the map
    lat: number = 34;
    lng: number = -74;
    radius: number = 2500;


    radiusChange($event) {
        this.changedRadius($event.value);
    }


    changedRadius(num) {

        this.circles.pop();
        var newradius = num;
        if (newradius < 8048)
            this.circles.push({
                radiusmiles: (Math.round(100 * num / 1609)) / 100,
                radius: num

            });
        else
            this.circles.push({

                radiusmiles: (Math.round(100 * 5000 / 1609)) / 100,
                radius: 8047

            });
    }
    signOut() {
        this.auth.signOut();
    }
    createRoomAlert() {

        var url = this.router.url;
        Swal.fire({
            title: "Name",
            text: "What would you like your name to be? Ignore for a random name.",
            input: 'text',
            inputLabel: 'Name',

            showCancelButton: true,
            inputValidator: (value) => {

                this.auth.anonymousLogin(this.markers[0], this.circles[0].radius, value, url)
            }
        });

    }
    getUserLocation() {
        // get Users current position

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(data => {
                this.lat = data.coords.latitude;
                this.lng = data.coords.longitude;
                this.zoom = 11;
                this.markers.pop();
                this.markers.push({

                    lat: data.coords.latitude,
                    lng: data.coords.longitude,

                })
            });
        }
    }
    clickedMap($event: AGMMouseEvent) {
        this.markers.pop();
        this.markers.push({

            lat: $event.coords.lat,
            lng: $event.coords.lng,

        });
    }
    circles: circle[] = [{
        radius: 2500,
        radiusmiles: (Math.round(250000 / 1609)) / 100
    }]


    markers: marker[] = [{
        lat: 34,
        lng: -74,


    }]
    constructor(
        public auth: AuthService,
        public cs: ChatService,
        private router: Router,
        private http: HttpClient,
        private titleService: Title,
        private metaTagService: Meta) {

    }
    showInstructions() {
        if (window.innerWidth > 550) {
            Swal.fire({
                title: "How To!",
                html: "<img src ='/assets/mapdemo.png' height='200', width = '200'> <br> 1. Change location of restaurants shown! <br> (using the map) <br> <br> <img src ='/assets/sliderdemo.png' height='10', width = '200'> <br>2. Change radius of restaurants shown! <br> (using the slider)<br><br> <img src ='/assets/createdemo.png' height='40', width = '200'> <br>3. Click Create Room!",
                footer: '<a href = "https://noyoupick.io/privacy">Privacy Policy</a>',
            });
        } else {
            Swal.fire({
                title: "How To!",
                html: "<img src ='/assets/mapdemo.png' height='100', width = '100'> <br> 1. Change location of restaurants shown! <br> (using the map) <br> <br> <img src ='/assets/sliderdemo.png' height='10', width = '100'> <br>2. Change the radius of restaurants shown! <br> (using the slider)<br><br> <img src ='/assets/createdemo.png' height='20', width = '100'> <br>3. Click Create Room!",
                footer: '<a href = "https://noyoupick.io/privacy">Privacy Policy</a>',
            });
        }
    }

    ngOnInit() {
        var url = this.router.url;
        url = url.substring(1);
        this.titleService.setTitle("NoYouPick - " + url.charAt(0).toUpperCase() + url.slice(1));
        this.metaTagService.updateTag({
            name: 'description',
            content: 'NoYouPick - Tinder, but for food, movies, and places! ' + url.charAt(0).toUpperCase() + url.slice(1)
        });
        this.metaTagService.updateTag({
            name: 'description',
            content: 'NoYouPick - Tinder, but for food! Restaurant'
        });
        //grabs user location first based on ip address and then based on their given location( if we have permission )
        
        const promise = new Promise((resolve, reject) => {
            this.http.get < any > ('https://geolocation-db.com/json/').subscribe(

                data => {
                    this.lat = data.latitude;
                    this.lng = data.longitude;
                    this.zoom = 11;
                    this.markers.pop();
                    this.markers.push({

                        lat: data.latitude,
                        lng: data.longitude,

                    })

                },
                error => console.error('There was an error!', error)
            )
            resolve(true);
        });
        promise.then((res) => {
            this.getUserLocation();

        });
    }



}
interface marker {
    lat: number;
    lng: number;
}
interface circle {
    radius: number;
    radiusmiles: number;
}