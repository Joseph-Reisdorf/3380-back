When this project is cloned into a local directory the installaion process is simple.

Make sure you have an updated version of npm and node on your machine.

Then navigate into the 3380-back directory and type 'npm i' to install the necessary packages.

It is also essential that you set up your local env variables. This includes creating a file called .env.local to run locally. 
Create the file in this directory and put in the following info. 
  `
  REACT_APP_FRONT_URL=http://localhost:3000
  
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD='X9f3ph$q'
  DB_NAME=Online_Music_Library
  
  SALT_ROUNDS=10
  JWT_SECRET='secretkey12E3fp#'
  `

The info for this file depends on the name of the database you set up. 

Finally, you can start the server from the command line using 'npm run start' or 'npm run start-server-nodemon'.

