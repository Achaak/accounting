import { RoutesConfig } from './routes.configs'

export default {
  clients: [
    {
      label: "Clients",
      nav: [
        {
          label: "Liste des clients",
          link: RoutesConfig.routes.clientList
        }, {
          label: "Ajouter un client",
          link: RoutesConfig.routes.clientNew
        }
      ]
    }
  ],
  finances: [
    {
      label: "Factures",
      nav: [
        {
          label: "Liste des factures",
          link: RoutesConfig.routes.billList
        }, {
          label: "Ajouter une facture",
          link: RoutesConfig.routes.billNew
        }
      ]
    }, {
      label: "Taxes",
      nav: [
        {
          label: "Liste des taxes",
          link: RoutesConfig.routes.taxList
        }, {
          label: "Ajouter une taxe",
          link: RoutesConfig.routes.taxNew
        }
      ]
    }
  ]
};