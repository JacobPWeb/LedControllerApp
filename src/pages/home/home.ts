import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  connected = false;
  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();
  }

  public startScanning(): void {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then(
      (deviceList) => {
        this.unpairedDevices = deviceList;
        this.gettingDevices = false;
      },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then((deviceList) => {
      this.pairedDevices = deviceList;
    },
      (err) => {
        console.log(err);
      });
  }

  private success(data, message: string): void {
    this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  private fail(data, message: string): void {
    this.alertCtrl.create({
      title: 'Failed',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  private basicSuccess(msg) {
    console.log(msg);
  }

  private basicFail(msg) {
    console.log(msg);
  }

  public selectDevice(address: string): void {
    this.bluetoothSerial.connect(address).subscribe((data) => {
      this.success(data, "Device successfully connected");
      this.connected = true;
    }, (err) => {
      this.fail(err, "Device failed to connect");
      this.connected = false;
    });
  }

  public disconnect(): void {
    let alert = this.alertCtrl.create({
      title: 'Disconnect',
      message: 'Are you sure want to disconnect this device?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
            this.connected = false;
          }
        }
      ]
    });
    alert.present();
  }
  public activateMsg(msg: string) {
    this.bluetoothSerial.write(msg + ";").then(this.basicSuccess, this.basicFail);
  }
  public activateMsgColor(msg: string, color: string) {
    this.bluetoothSerial.write(msg + ":" + color).then(this.basicSuccess, this.basicFail);
  }
}
