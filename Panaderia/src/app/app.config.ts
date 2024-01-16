import { ApplicationConfig, LOCALE_ID } from '@angular/core'
import { provideRouter } from '@angular/router'
import localeES from '@angular/common/locales/es'

import { routes } from './app.routes'
import { registerLocaleData } from '@angular/common'

registerLocaleData(localeES)
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: LOCALE_ID, useValue: 'es-ES' }],
}
