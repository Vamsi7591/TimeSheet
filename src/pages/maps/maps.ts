
import { Component, NgZone } from "@angular/core";
import { NavController, Platform } from 'ionic-angular';
import {
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapsLatLng,
    GoogleMapsMarker,
    GoogleMapsMarkerOptions,
    Geolocation,
    NativeGeocoder,
    NativeGeocoderReverseResult} from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-maps',
    templateUrl: 'maps.html'
})
export class MapsPage {

    private map: GoogleMap;
    _latitude: any = 0;
    _longitude: any = 0;

    constructor(
        private _navController: NavController,
        private platform: Platform,
        private _zone: NgZone) {

        this.platform.ready().then(() => this.onPlatformReady());
    }

    private onPlatformReady(): void {
        console.log("onPlatformReady");
    }

    closeMap() {
        this._navController.pop();
    }

    ngAfterViewInit() {
        // Geolocation.getCurrentPosition().then((resp) => {
        //     this._latitude = resp.coords.latitude
        //     this._longitude = resp.coords.longitude
        // }).catch((error) => {
        //     console.log('Error getting location', error);
        // });

        // var subscription = Geolocation.watchPosition()
        //     .filter((p) => p.coords !== undefined) //Filter Out Errors
        //     .subscribe(position => {
        //         this._latitude = position.coords.latitude;
        //         this._longitude = position.coords.longitude;
        //         console.log(position.coords.longitude + ' ' + position.coords.latitude);
        //         alert(position.coords.longitude + ' ' + position.coords.latitude);
        //     });

        GoogleMap.isAvailable().then(() => {

            this.map = new GoogleMap('map_canvas');

            this.map.clear();
            this.map.setDebuggable(true);

            this.map.one(GoogleMapsEvent.MAP_READY)
                .then((data: any) => {
                    // alert("GoogleMap.onMapReady(): " + JSON.stringify(data));

                    this._zone.run(() => {
                        // let myPosition = new GoogleMapsLatLng(this._latitude, this._longitude);//38.9072, -77.0369
                        // console.log("My position is", myPosition);
                        // this.map.animateCamera({ target: myPosition, zoom: 10 });
                        this.map.getMyLocation().then(res => {
                            console.log('Give it to me' + res.latLng);

                            // alert("GoogleMap.onMapReady(): " + JSON.stringify(res.latLng));
                            let myPosition = new GoogleMapsLatLng(res.latLng.lat, res.latLng.lng);

                            var addr = 'Your current location.';

                            NativeGeocoder.reverseGeocode(res.latLng.lat, res.latLng.lng)
                                .then((result: NativeGeocoderReverseResult) => {
                                    addr = "Your address is \n " + result.city + " in " + result.countryName;
                                    // alert(addr);
                                    console.log("The address is\n " + result.city + " in " + result.countryName);
                                })
                                .catch((error: any) => console.log(error));


                            this.map.animateCamera({ target: myPosition, zoom: 14, tilt: 30 });
                            this.map.refreshLayout();
                            this.map.addGroundOverlay(true);

                            if (res.latLng.lat != 0) {

                                let markerOptions: GoogleMapsMarkerOptions = {
                                    position: myPosition,
                                    title: addr
                                };

                                this.map.addMarker(markerOptions)
                                    .then(
                                    (marker: GoogleMapsMarker) => {
                                        // marker.setDraggable(true);

                                        marker.setTitle(addr);
                                        marker.showInfoWindow();

                                    });

                                this.map.setAllGesturesEnabled(true);
                            }
                        });
                    });
                });
        });
    }


    private onMapReady(): void {
        alert('Map ready');
        //this.map.setOptions(mapConfig);
    }
}
