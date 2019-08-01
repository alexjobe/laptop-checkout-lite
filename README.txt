---------------------------------------------------------------------------------------------------
--------------------------------------- About The Lite Version ------------------------------------
---------------------------------------------------------------------------------------------------

This "lite" version of the Laptop Checkout app does not require a database connection, and instead 
saves data in an embedded database. In place of MongoDB, this version uses NeDB. The NeDB API is a 
subset of MongoDB's, so porting the project is simple. Camo is an ODM for NeDB (similar to Mongoose 
for MongoDB) used to model schemas.

The only difference between the lite version of the app and the main version is the database 
implementation (found in the models and routes directories), though they both implement the same 
API. To update the lite version when changes are made to the main app, make a copy of the main app 
and replace its models and routes directories (and the package.json) with the ones found in the 
lite version.

---------------------------------------------------------------------------------------------------
------------------------------------------ Laptop Checkout ----------------------------------------
---------------------------------------------------------------------------------------------------

This app is built with a MERN stack, a collection of JavaScript-based technologies � MongoDB, 
Express, React, and Node.js � used to develop web applications.

---------------------------------------------------------------------------------------------------
-------------------------------------------- The Backend ------------------------------------------
---------------------------------------------------------------------------------------------------

Node.js is a server environment that executes server-side JavaScript, and Express is a web 
framework for Node.js. MongoDB is a cross-platform document-oriented database program. Classified 
as a NoSQL database program, MongoDB uses JSON-like documents with schema.

---------------------------------------------------------------------------------------------------
-------------------------------------------- The Frontend -----------------------------------------
---------------------------------------------------------------------------------------------------

React is a lightweight JavaScript library for building single-page applications by dividing the UI 
into reusable components. React only deals with the view layer, which provides clean abstraction in 
the MVC (Model-View-Controller) design pattern. In addition, React speeds up DOM manipulation by 
only updating DOM objects that change in its �virtual DOM.� You can find more information about the 
virtual DOM here:

	https://www.codecademy.com/articles/react-virtual-dom

---------------------------------------------------------------------------------------------------
------------------------------------------- How To Install ----------------------------------------
---------------------------------------------------------------------------------------------------

Install NodeJS

	https://nodejs.org/en/download/

Run commands in the �laptop-checkout-production� folder (you may need to update PATH to include 
nodejs):

	npm install
	npm start

---------------------------------------------------------------------------------------------------
------------------------------------------- Database Set-up ---------------------------------------
---------------------------------------------------------------------------------------------------

You do not need to install MongoDB for this version of the app: it will connect to a test database 
on MongoLab. However, eventually you will want to set up a permanent database. The database 
connection is specified in "models/index.js" ('mongodb://localhost/laptop-checkout-api' by default)

How To Install MongoDB Locally:
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition

This app uses Mongoose to model data: schemas are defined under models (laptop.js and checkout.js)

---------------------------------------------------------------------------------------------------
---------------------------------------------- Electron -------------------------------------------
---------------------------------------------------------------------------------------------------

Electron will launch the app in its own window, so there is no need to use a browser. Electron is a 
framework for creating native applications with web technologies like JavaScript, HTML, and CSS.

Electron Packager can be used to create Windows, Mac, and Linux executables. For more information, 
check out:

	https://www.christianengvall.se/electron-packager-tutorial/ 

After you create an executable with Electron Packager, you do not need to install NodeJS. The only 
set-up required is installing MongoDB, either locally or on a server (make sure the connection is
specified *before* creating the executable.)

To disable Electron, open package.json and change "main" to "app.js", and "start" to "node ." Then 
connect to localhost:8080 in a browser. Alternatively, just type �node app.js�. This is required if 
you wish to host the app on a web server.

---------------------------------------------------------------------------------------------------
------------------------------------ Electron Packager Instructions--------------------------------
---------------------------------------------------------------------------------------------------

Running this command in the production folder with Electron Packager will create 32-bit and 64-bit 
Windows applications:

	electron-packager ../laptop-checkout-production laptop-checkout --platform=win32 --arch=all

---------------------------------------------------------------------------------------------------
---------------------------------------- Laptop Checkout API --------------------------------------
---------------------------------------------------------------------------------------------------

The API is defined in the routes and models directories. The entry point for the Node.js app is 
app.js, and routes are defined in the routes directory. You can access the API in the browser by 
typing "/api/laptops" and "/api/checkouts". 

For example, to access a specific laptop, type 'http://localhost:8080/api/laptops/_id', where _id 
is the ObjectId (primary key) for that laptop.

---------------------------------------------------------------------------------------------------
------------------------------------------- For Development ---------------------------------------
---------------------------------------------------------------------------------------------------

The backend and frontend folders are separated for development purposes. The �production� folder 
contains everything in the backend, plus the build folder that is generated by CRA (Create React 
App) when the command �npm run build� is executed in the frontend folder. The live app does not
require everything in the frontend folder: just the build folder it generates (which is served via
Node.js and Express.)

Excluding some minor changes in package.json and app.js, the production folder is the same as the 
backend folder. 

If changes are made to the frontend, just run �npm run build� and copy the build folder it creates 
over to the production folder. If changes are made to the backend, update the production folder
accordingly.

While developing, you must run both the backend and frontend at the same time. Just run the command 
�npm start� in both the backend and frontend folders. By default, the backend can be accessed at 
localhost:8080, and the frontend is at localhost:3000.
