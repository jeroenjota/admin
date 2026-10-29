# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


## Recommended IDE Setup
* [VS Code](https://code.visualstudio.com/)
* [Vetur Extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
* [Volar Extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (Recommended for Vue 3 projects)
* [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)   


## Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).   
See [Vue Configuration Reference](https://v3.vuejs.org/guide/installation.html#vue-cli).
## Project Structure
```
.
├── public/                 # Static assets
├── src/                    # Source files
│   ├── assets/             # Assets (images, fonts, etc.)
│   ├── components/         # Vue components
│   ├── pages/              # Vue pages
│   ├── router/             # Vue router configuration
│   ├── store/              # Vuex store Configuration
│   ├── App.vue             # Main Vue component
│   └── main.js             # Entry point
├── .env                    # Environment variables
├── index.html              # Main HTML file
├── package.json            # NPM package configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```
## Available Scripts  
In the project directory, you can run:  
### `npm install`  
Installs the dependencies.  
### `npm run dev`  
Runs the app in development mode.  
Open [http://localhost:5173](http://localhost:5173) to view it
  in the browser. 
The page will reload if you make edits.  
You will also see any lint errors in the console.  
### `npm run build`  
Builds the app for production to the `dist` folder.  
### `npm run serve`  
Serves the production build from the `dist` folder.  
### `npm run lint`  
Lints and fixes files.

## Learn More  
To learn more about Vue, Vite, and related technologies, take a look at the following resources:  
- [Vue 3 Documentation](https://v3.vuejs.org/)  
- [Vite Documentation](https://vitejs.dev/)  
- [Vue Router Documentation](https://router.vuejs.org/)  
- [Vuex Documentation](https://vuex.vuejs.org/)     


## Stay Updated  
For the latest updates and news about Vue and Vite, consider following their official blogs and social media channels.  
- [Vue.js Blog](https://blog.vuejs.org/)  
- [Vite Blog](https://vitejs.dev/blog/)  
- [Vue.js Twitter](https://twitter.com/vuejs)  
- [Vite Twitter](https://twitter.com/vite_js)     
## Contributing  
Contributions are welcome! If you find a bug or want to suggest a feature, please open an issue or submit a pull request on the project's GitHub repository.        


# Tours Admin Site
This is the admin site for managing tours in the Jota Tours application. It allows administrators to create, edit, delete, and reorder tours.
## Features
- List all tours
- Create new tours
- Edit existing tours
- Delete tours
- Reorder tours via drag-and-drop

## Systeembeheer: synchroniseren naar productie

Gebruik de Systeem-pagina met de lokaal draaiende adminmodule en API:

- **Database dry-run**: toont de aantallen rijen lokaal en in productie, zonder wijzigingen (deployscript optie 5). Dit controleert geen foto-bestanden of inhoudelijke verschillen.
- **Database + foto's synchroniseren**: voert `../scripts/deploy-jota.sh content` uit, dezelfde actie als optie 3. Eerst worden uploadbestanden overgezet, daarna de database.
- **Alleen database synchroniseren**: voert de databaseactie uit, dezelfde actie als optie 4.

Typ `SYNC_PRODUCTION_DB` en bevestig de actie. Tijdens de uitvoering zijn de knoppen geblokkeerd; resultaat en uitvoer verschijnen op de pagina.

Alleen `tours`, `photos`, `tour_categories` en `tour_photos` worden vervangen door de lokale inhoud. De tabel met categorieën zelf en gebruikersaccounts worden niet gesynchroniseerd. Het script maakt vooraf een back-up van de betrokken productietabellen. Bestanden worden gekopieerd zonder verwijderingen op productie; bestaande bestanden met dezelfde naam kunnen worden bijgewerkt. Bij een fout kunnen bestanden of tabellen al gedeeltelijk zijn overgezet: controleer het log voordat je opnieuw synchroniseert.

De lokale API moet toegang hebben tot het deployscript, Docker/MariaDB, `rsync` en werkende SSH-toegang zonder interactieve prompts naar de server uit dat script. Database- en contentsynchronisatie via de API zijn geblokkeerd bij `NODE_ENV=production`.

## Technologies Used
- Vue 3
- Vite
- Vue Router
- Vuex
- Fetch API for backend communication
## Getting Started
### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)
### Installation
1. Clone the repository:
   ```bash
   git Clone

## TODO
    git clone
    A Lot of stuff