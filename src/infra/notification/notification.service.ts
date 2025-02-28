import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class NotificationService {
  private static ONESIGNAL_API_URL =
    'https://onesignal.com/api/v1/notifications'

  private static APP_ID = process.env.ONESIGNAL_APP_ID
  private static API_KEY = process.env.ONESIGNAL_API_KEY

  static async sendPushNotification(
    userId: string,
    title: string,
    message: string,
  ) {
    try {
      const response = await axios.post(
        this.ONESIGNAL_API_URL,
        {
          app_id: this.APP_ID,
          include_external_user_ids: [userId], // Agora funciona com OneSignal.login()
          headings: { en: title },
          contents: { en: message },
        },
        {
          headers: {
            Authorization: `Basic ${this.API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('📨 Notificação enviada:', response.data)
    } catch (error) {
      console.error('❌ Erro ao enviar push notification:', error)
    }
  }
}
