# shopers: MVC app for browsing nearby shops
shopers is an MVC app that enables you to look for nearby shops and like or dislike them

This application is based on node's Express Js and the rendering engine ejs,
check it out on [shopers](https://sleepy-mesa-12188.herokuapp.com/)

## Running Locally

### Installing Node.js and npm

This application has been tested on Node.js 8.9 and npm 6 - these packages should
be available for download [here](https://nodejs.org/en/) - choose the "Current"
version for download.

### Installing Node.js modules

Once you have Node and npm installed and this repository downloaded, you'll need
to install the application's dependencies. Do this with:

    npm install

For development you'll probably want to install the following modules globally:

    npm install -g gulp-cli nodemon

### Setting up the database

This is no needs for installing the MongoDB module, the app is using the mlabs free database
check it out [here](https://mlab.com/)

### Running the application

To run the application in development mode:
	
	npm run watch

To run the application simulating production settings:

    NODE_ENV=production
    npm start

## Running in Heroku

To run the deployed app:

[here](https://sleepy-mesa-12188.herokuapp.com/)

## Technical spec

### Front-end

The front-end is progressively enhanced, the app views are separate,
with javascript disabled the app will work normally, and with javascript 
enabled the app will become a single page app, this technique covers almost 
all the cases and works well with the SEO

The app uses native javascript for client-side and ejs for the views rendering

### Back-end

The back-end uses the node's express and uses MongoDB's mongoose for the database handling

### Progressive web application

The app is PWA, it works offline, fast and reliable

![PWA lighthouse audit](https://github.com/shutsugan/shopers/blob/master/audit.png)

The app is fully interactable offline,
in offline mode, the user can like and dislike the shops
the interaction will be preserved, once the app enters online 
mode the interaction will sync to the service 

## Functional spec

- As a User, you can sign up using your email & password, from here [here](https://sleepy-mesa-12188.herokuapp.com/signup)
- As a User, you can sign in using your email & password, from here [here](https://sleepy-mesa-12188.herokuapp.com/login)
- As a User, you can display the list of shops sorted by distance, you can also sort by name
- As a User, you can like a shop, so it can be added to your preferred shops
	- The liked shops won't be displayed on the main page

### Bonus point

- As a User, you can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours
- As a User, you can display the list of preferred shops 
	- When loged in you can display the list of preferred shops from [here](https://sleepy-mesa-12188.herokuapp.com/favorit)
- As a User, you can remove a shop from your preferred shops list

## License

MIT