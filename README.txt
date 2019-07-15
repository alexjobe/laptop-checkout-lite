

----------------------------------------------------------- Laptop Checkout Lite ----------------------------------------------------------

This "lite" version of the Laptop Checkout app does not require a database connection, and instead saves data in an embedded NeDB
database. The NeDB API is a subset of MongoDB's, so porting the project was simple. The only difference between this lite version of the
app and the main version is the database implementation (found in the /models and /routes directories), though they both implement the
same API. You could implement the API using a different database (such as MySQL or SQLite) if you wished, and the app would function the
same.


-------------------------------------------------------------- How To Install -------------------------------------------------------------


Install NodeJS
	https://nodejs.org/en/download/

Run commands in root folder (you may need to update PATH to include nodejs):
	npm install
	npm start


---------------------------------------------------------------- Electron -----------------------------------------------------------------


Electron will launch the app in its own window, so there is no need to use a browser. Electron is a framework for creating native 
applications with web technologies like JavaScript, HTML, and CSS.

Electron Packager can be used to create Windows, Mac, and Linux executables. For more information, check out:
	https://www.christianengvall.se/electron-packager-tutorial/

After you create an executable with Electron Packager, you do not need to install NodeJS. For this lite version, you do not need to
install MongoDB either.

To disable Electron, open package.json and change "main" to "app.js", and "start" to "node ." Then connect to localhost:3000 in a browser.
This is required if you wish to host the app on a web server.


------------------------------------------------------ Electron Packager Instructions -----------------------------------------------------


Running this command with Electron Packager will create 32-bit and 64-bit Windows applications:

	electron-packager ../laptop-checkout-lite laptop-checkout-lite --platform=win32 --arch=all


---------------------------------------------------------------- Node API -----------------------------------------------------------------


The entry point for the node.js app is app.js, and routes are defined in the /routes directory. You can access the API in the browser by 
typing "/api/laptops" and "/api/checkouts". For example, to access a specific laptop, type "http://localhost:3000/api/laptops/_id", where 
_id is the ObjectId (primary key) for that laptop.