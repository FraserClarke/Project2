# 15-16 Project #2 w/Awesome-Sauce

## ⋘ ──── ∗⋅◦∘◈\[[SourcE-commerce](https://murmuring-bastion-13699.herokuapp.com/)\]◈∘◦⋅∗ ──── ⋙

by [MissNG-Git](https://github.com/MissNG-Git) | [FraserClarke](https://github.com/FraserClarke/) | [ffakih5](https://github.com/ffakih5) | [MushtaqSafie](https://github.com/MushtaqSafie)

A collaboration project proudly brought to you by Team **Awesome-Sauce**, _[SourcE-commerce](https://murmuring-bastion-13699.herokuapp.com/)_ is an application that will help business owners track inventory & sales performance as well as provide an e-commerce storefront for customers! This app will run in the browser, [Heroku Platform](https://www.heroku.com/) recommended, and features dynamic HTML via the use of handlebars, styling with CSS and data stored & retrieved using MySQL and Sequelize.

Technologies utilized include...

- HTML, CSS, Javascript
- [Bootstrap CSS](https://getbootstrap.com/)
- [GoogleFonts](https://fonts.google.com/)
- [FontAwesome](https://fontawesome.com/)
- [GitBash](https://gitforwindows.org/)
- [Node Environment](https://nodejs.org/en/about/)
- [Express.js Framework](https://expressjs.com/)
- [MySQL Database](https://www.mysql.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Handlebars](https://handlebarsjs.com/)
- [Highcharts](https://www.highcharts.com/)
- [Heroku Platform](https://www.heroku.com/)
- [Crypto package](https://www.npmjs.com/package/crypto-js)
- [Body Parser package](https://www.npmjs.com/package/body-parser)
- [Cookie Parser package](https://www.npmjs.com/package/cookie-parser)

To view a copy of our Presentation, please **[CLICK HERE](https://github.com/MissNG-Git/SourcE-commerce/tree/main/public)**!
_(available in .pdf & .pptx)_

## ≫ ──── ≪•◦ OBJECTIVES ◦•≫ ──── ≪

```
On one hand...
+ AS A business owner
+ I WANT TO be able to track my inventory & sales performance
+ SO THAT I can better manage different aspects of my business based on items ordered in my ‘storefront’

On the other hand...
+ AS AN online shopper
+ I WANT to be able to see product info (ie name & price)
+ SO THAT I can shop for items I want

```

## ≫ ──── ≪•◦ MOCK-UP ◦•≫ ──── ≪

The following images show the web application's appearance & functionality:

<p float="left">
    <img src="/public/img/bApp_Sales.png" alt="Business - Sales Dashboard" width="350" style="margin-right: 10px;" />
    <img src="/public/img/bApp_Inv.png" alt="Business - Inventory" width="280" style="margin-right: 10px;" />
    <img src="/public/img/cApp.png" alt="Customer - Storefront" width="350" style="margin-right: 10px;" />
</p>
<p float="left">
    <img src="/public/img/appRes.png" alt="Mobile Responsive" width="200" style="margin-right: 10px;" />
</p>

### ≫ ──── ≪•◦ CODE FUNCTIONALITY ◦•≫ ──── ≪

- Application directs user to a login landing page with the option to create an account.

- Application successfully directs user to the account creation page when "Create account" is selected or user attempts login with an email (also the username) that doesn't already exist in the database.

- Upon clicking submit on account creation, information entered into the form will update the back-end database. User will automatically be directed either to the `Sales Dashboard` or `Storefront` depending on whether they have ticked the Business Owner ☑.

- Application allows user to log in if account has already been created and directs user to the `Sales Dashboard` (if the account type is a Business Owner) or the `Storefront` (if the account type is a Customer).

- When directed to the `Sales Dashboard`, a line graph displaying Sales Performance data for the week populates on the page via Highcharts.js as well as on the subsequent sales table.

- When `Inventory` is selected from the sidebar, user is directed to a page where user can add items into their inventory (_create to database_) and have it displayed in the lower section of the page (_read from database_).

- Items added to the `Inventory` will be editable (_update database_) & removable (_delete from database_).

- When directed to the `Storefront`, items will populate from database data added from `Inventory` & show each item displayed as dynamically generated cards.

- When a customer adds an item, the product will update in the cart within the sidebar and calculate the order total above the "Checkout" button.

- Once a customer selects "Place Order", the total from the sale will be stored to generate the Sales Performance data as a line graph for the Business Owner (_update database_).

- All files within application has been successfully required/associated in order to dynamically generate into .handlebars.

- Application has been successfully deployed to Heroku and can be visited [here](https://murmuring-bastion-13699.herokuapp.com/)!

### ≫ ──── ≪•◦ USABILITY ◦•≫ ──── ≪

1. Navigate to deployed application page on [Heroku](https://murmuring-bastion-13699.herokuapp.com/m)
2. If you are a new client, select "Create account" from the Login page to register your details into our database
3. If you are a returning client, simply enter your login details.
4. As a Business Owner, you will be able to access your `Sales Dashboard` and your `Inventory`:
   > - Your `Sales Dashboard` will display a line graph detailing the Sales Performance data for the week, complimented by the sales table below the graph
   > - Your `Inventory` will allow you to manage your stock with the capabilities to...
   >
   > 1. Add items to your inventory with a product name, description & cost
   > 2. Added items will display on the lower half of the `Inventory` page and will be added to the customer's `Storefront` for browsing
   > 3. Edit an added item (_WIP_)
   > 4. Delete an added item (_WIP_)
5. As a Customer, you will be able to access the `Storefront` where...
   > - You will be able to view all the available products for 'sale' and see the name, description & cost of each item
   > - You will be able to add an item to your cart which will update within the sidebar
   > - You will be able to remove an item from your cart (_WIP_)
   > - You will be able to see the total of all the items in your cart prior to 'checkout' (_WIP_)
6. Click on log out in the sidebar to log out of your account and be directed back to the Login page. (_WIP_)

### ≫ ──── ≪•◦ FUTURE DEVELOPMENTS ◦•≫ ──── ≪

RE: (_WIP_) & Prospective Improvements...
We hope to implement these additional features in the near future:

- Account Management to allow users to update personal details
- Allow user to add custom photo at account creation (to be displayed in sidebar)
- Edit an Inventory item
- Delete an Inventory item which will also delete item from `Storefront`
- Edt quantity of added cart item
- Remove an item from cart
- Log out functionality
- Exporting capabilities for Businesses:
  > - Sales Data
  > - Inventory Data
- Improved app integration where inventory count (stock level) is updated when customers place an order in storefront
- Search function to locate specific items (customer) or sales data from date range (business)
- Allow business clients to manage multiple Storefronts
