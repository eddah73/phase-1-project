# phase-1-project
AUTHOR: EDDAH CHEPKOECH


ThIS is a simple  application that provides a user interface for registering, logging in, and viewing vacant rooms. The application uses JavaScript, HTML, and CSS to create a dynamic user experience.

The application features  are user registration and login functionality, display of vacant rooms with details such as image, room number, room type, and price, and the ability to book a room, which updates room availability on the server. 

From a technical standpoint, the application is built using JavaScript, HTML, and CSS. It uses the Fetch API for making requests to the server and utilizes local storage for storing user login information. The application also implements event listeners for handling user interactions.

To get started with the application, simply clone the repository to your local machine and open the index.html file in a web browser to access the application. You can then register for an account or log in to an existing one to access the vacant rooms section. From there, you can  book a room by clicking the "Book a room" button.

The application assumes a server is running at http://localhost:3000 that provides the following endpoints: POST /users to create a new user account, GET /users to retrieve the list of users, GET /rooms to retrieve the list of vacant rooms, and PATCH /rooms/:id to update the availability of a room.