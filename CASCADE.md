# Cascade Project Instructions

## Architecture
- The project is a **React** application using **Vite** as the build tool.
- The project uses **React Router** for navigation.
- The project uses **Tailwind CSS** for styling.
- The project uses **daisyUI** for component and UI styling.
- File structure is the following:
```
pages/
├── (list of js files where js file is a route on the system (individual pages) where each route loads its specific page component, which should have its own folder in src/pages/)
src/
├── components/
│   ├── (list of reusable components across every page)
├── pages/
│   ├── (list of sub-folders where each sub-folder represents and individual page)
├── Utils/
│   ├── (list of utility functions)
├── App.jsx (main app file, used to define routes and layout)
└── index.css (main css file, used to import tailwind and daisyui)
```

- when creating any new page, create a new sub-folder in the `pages` folder and add a new route in the `App.jsx` file. Also, include the page redirection in the components/Header.jsx file, under the category where the page belongs.
- when creating any new component that can be reused across different pages, create a new file in the `components` folder. If the component only belongs to the page we are working on, we keep it on the respective page folder.
- When creating a new page, we should try to use the ToolPageLayout component if possible.

## Styling Guidelines
- Any new `.jsx` file created in this project should prefer to use **Tailwind CSS** for styling.
- This project uses both **Tailwind CSS** and **daisyUI** for component and UI styling.
- When implementing UI components, consider leveraging both libraries as appropriate.

## General Notes
- Please follow these styling guidelines for all new code and refactors unless otherwise specified.
- If there are updates to the recommended instruction file format, please update this file accordingly.
- We are using **SSG** (Static Site Generation) for the website via Next.js.
- We are using Github as the repository.
- We are using Vercel as the deployment platform. And it is integrated with Github to deploy automatically on push. The main branch is used for the production environment, the rest are used for the preview environment.