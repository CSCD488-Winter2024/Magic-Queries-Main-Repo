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


## How to update the database from the employee side
Changes should be made to the card spreadsheets, same as before. Make sure you are filling out the spreadsheets in a way that the filereader script can read. The ordering and naming of columns should stay consistent with how you've been doing it, unless you choose to update the code so it can be read a different way. 


## How to make changes to the code:
We recommend using Visual Studio Code or GitHub Codespaces when working on the code.

To edit the website and see changes live using Astro:
  - Make sure your working directory is in .../workspaces/Magic-Queries-Main-Repo
  - Type "npm run dev" into the console
  - Click the link to open the webpage if it doesn't automatically open

For more documentation on Astro, check here: https://docs.astro.build/en/getting-started/
For more documentation on Tailwind CSS, check here: https://tailwindcss.com/docs/installation 

Make sure you push your changes to the main branch of the Magic Queries repo (or whatever repo you're deploying from) if you want the website to reflect those changes. 

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
