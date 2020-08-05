import { RoutesConfig } from './routes.configs'

export default {
  contacts: [
    {
      label: "Contact",
      nav: [
        {
          label: "Liste des contacts",
          link: RoutesConfig.routes.contactsList
        }, {
          label: "Liste des contacts clients",
          link: RoutesConfig.routes.contactsClientsList
        }, {
          label: "Liste des contacts réguliés",
          link: RoutesConfig.routes.contactsRegularList
        }, {
          label: "Ajouter un contact",
          link: RoutesConfig.routes.contactsNew
        }
      ]
    }, {
      label: "Projects",
      nav: [
        {
          label: "Liste des projets possibles",
          link: RoutesConfig.routes.projectsList
        }, {
          label: "Ajouter un projet possible",
          link: RoutesConfig.routes.projectsNew
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