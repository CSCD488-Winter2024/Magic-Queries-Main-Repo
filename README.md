## Repository
All source code can be found in: https://github.com/CSCD488-Winter2024/Magic-Queries-Main-Repo


## Prerequisites
  - Node Package Manager (NPM)
  - Astro
  - Tailwind CSS

When modifying the code in Visual Studio or Codespaces, you will also need these extensions. They can be installed through the visual studio extensions marketplace for free.
  - Astro extension
  - Tailwind CSS IntelliSense

To make use of the database, you will also need a Firebase account and a working API key.


## How to make changes:
We recommend using Visual Studio Code or GitHub Codespaces when working on the code.

To edit the website and see changes live using Astro:
  - Make sure your working directory is in .../workspaces/Magic-Queries-Main-Repo
  - Type "npm run dev" into the console
  - Click the link to open the webpage if it doesn't automatically open

For more documentation on Astro, check here: https://docs.astro.build/en/getting-started/
For more documentation on Tailwind CSS, check here: https://tailwindcss.com/docs/installation 


## Website structure

*dist:* Files necessary for deploying to Netlify and using Netlify features like the contact-form

*node_modules:* Packages used by NPM. Packages should be installed, updated, or removed using the terminal when possible.

*public:* Normally this would contain the HTML that users see when viewing the site. However, since we use Astro, we put those files in .../src/pages instead.

*src:* Contains most of the site content.
 
 - *components:* Code that is reused by Astro. Components are useful for things like footers, headers, etc., which are used in multiple places. https://docs.astro.build/en/basics/astro-components/
 
 - *layouts:* Components that are used for UI structures. We used Layout.astro to set some styles, like the font type, for the whole site.
 
 - *pages:* The actual pages that users see. Index.astro serves as the home/search page for the site.
 
 - *scripts:* All of our javascript goes here.


## Functionality

- Use the search bar to lookup cards by name
- Use the filters on the side to refine your search
- Add cards to your cart. You can't add more than the total quantity in stock
- Click the shopping cart to view each order item along with the total estimated price
- Checkout from cart to fill the email form with your order details. Submit the form on the same page








<br><br><br><br><br><br><br><br>
--------------------------------------------------------------------------------------
# Default Astro README

## License

See [LICENSE.txt](https://github.com/CSCD488-Winter2024/Magic-Queries-Main-Repo/blob/main/LICENSE.txt)

# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
