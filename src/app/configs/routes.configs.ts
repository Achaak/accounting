import { InjectionToken } from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const routesNames = {
  home: 'home',
  auth: 'auth',
  error404: '404',
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    auth: `/${routesNames.auth}`,
    error404: `/${routesNames.error404}`,
  }
};