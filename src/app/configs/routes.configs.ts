import { InjectionToken } from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const routesNames = {
  home: 'home',
  auth: 'auth',
  error404: '404',

  finances:  'finances',
  taxNew:    'tax/new',
  taxUpdate: 'tax/update/:id',
  taxList:   "tax/list",
  bilNew:    'bill/new',
  bilUpdate: 'bill/update/:id',
  billList:  "bill/list",
  billInfo:  'bill/info/:id',

  clients:      'clients',
  clientNew:    'client/new',
  clientUpdate: 'client/update/:id',
  clientList:   'client/list',
  clientInfo:   'client/info/:id',
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    auth: `/${routesNames.auth}`,
    error404: `/${routesNames.error404}`,

    finances:  `/${routesNames.finances}`,
    taxNew:    `/${routesNames.taxNew}`,
    taxUpdate: `/${routesNames.taxUpdate}`,
    taxList:   `/${routesNames.taxList}`,
    bilNew:    `/${routesNames.bilNew}`,
    bilUpdate: `/${routesNames.bilUpdate}`,
    billList:  `/${routesNames.billList}`,
    billInfo:  `/${routesNames.billInfo}`,

    clients:      `/${routesNames.clients}`,
    clientNew:    `/${routesNames.clientNew}`,
    clientUpdate: `/${routesNames.clientUpdate}`,
    clientList:   `/${routesNames.clientList}`,
    clientInfo:   `/${routesNames.clientInfo}`,
  }
};