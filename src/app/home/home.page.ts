import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  luminosidad: number = 0;
  isDay: boolean = true;

  constructor(private database: Database) {}
  
  ngOnInit() {
    this.accessFirebaseData();
  }

  accessFirebaseData() {
    const luzRoute = ref(this.database, "/sensor/luz");
    object(luzRoute).subscribe(async value => {
      this.luminosidad = value.snapshot.val();
      this.updateProgress(this.luminosidad);
      await this.notifyDayOrNight();
    });
  }

  updateProgress(value: number) {
    const circularProgress = document.querySelector('.circular-progress') as HTMLElement;
    const progressValue = document.querySelector('.progress-value') as HTMLElement;

    progressValue.textContent = `${value}%`;
    circularProgress.style.background = `conic-gradient(#FFE503 ${value * 3.6}deg, #ededed 0deg)`;
  }

  async notifyDayOrNight() {
    const threshold = 50; // Define un umbral de luminosidad para distinguir día y noche
    if (this.luminosidad >= threshold && !this.isDay) {
      this.isDay = true;
      await this.sendLocalNotification("Es de día", "El nivel de luminosidad indica que ahora es de día.");
    } else if (this.luminosidad < threshold && this.isDay) {
      this.isDay = false;
      await this.sendLocalNotification("Es de noche", "El nivel de luminosidad indica que ahora es de noche.");
    }
  }

  async sendLocalNotification(title: string, body: string) {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: new Date().getTime() // Usar un ID único basado en la hora actual
        }
      ]
    });
  }
}
