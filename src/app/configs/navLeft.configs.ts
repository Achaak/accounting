import { RoutesConfig } from './routes.configs'

export default {
  contacts: [
    {
      label: "Contact",
      nav: [
        {
          label: "Liste des clients",
          link: RoutesConfig.routes.contactsClientsList
        }, {
          label: "Liste des contacts",
          link: RoutesConfig.routes.contactsList
        }, {
          label: "Liste des contacts réguliés",
          link: RoutesConfig.routes.contactsRegularList
        }, {
          label: "Ajouter un contact",
          link: RoutesConfig.routes.contactsNew
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