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
  billNew:    'bill/new',
  billUpdate: 'bill/update/:id',
  billList:  "bill/list",
  billInfo:  'bill/info/:id',

  contacts:              'contacts',
  contactsNew:           'contacts/new',
  contactsUpdate:        'contacts/update/:id',
  contactsInfo:          'contacts/info/:id',
  contactsList:          'contacts/list',
  contactsClientsList:   'contacts/clients/list',
  contactsRegularList: 'contacts/regular/list',
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    auth: `/${routesNames.auth}`,
    error404: `/${routesNames.error404}`,

    finances:   `/${routesNames.finances}`,
    taxNew:     `/${routesNames.taxNew}`,
    taxUpdate:  `/${routesNames.taxUpdate}`,
    taxList:    `/${routesNames.taxList}`,
    billNew:    `/${routesNames.billNew}`,
    billUpdate: `/${routesNames.billUpdate}`,
    billList:   `/${routesNames.billList}`,
    billInfo:   `/${routesNames.billInfo}`,

    contacts:              `/${routesNames.contacts}`,
    contactsNew:           `/${routesNames.contactsNew}`,
    contactsUpdate:        `/${routesNames.contactsUpdate}`,
    contactsInfo:          `/${routesNames.contactsInfo}`,
    contactsClientsList:   `/${routesNames.contactsClientsList}`,
    contactsList:          `/${routesNames.contactsList}`,
    contactsRegularList: `/${routesNames.contactsRegularList}`,
  }
};