import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import 'rxjs/add/operator/map';

/*
  Generated class for the BluetoothConnectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BluetoothConnectorProvider implements OnInit{
  /*private macAddress = "20:16:09:21:88:52";
  constructor(private bluetoothSerial: BluetoothSerial) {
  }
  private success () {

  }
  private failure () {

  }*/
  ngOnInit() {
    // this.bluetoothSerial.connectInsecure(this.macAddress);
    // this.bluetoothSerial.write('hello world').then(this.success, this.failure);
  }

}
