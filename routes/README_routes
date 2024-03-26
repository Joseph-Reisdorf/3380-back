Naming convention: file_purpose_route.mjs
    Ex: login_route, artist_route, debug_person_route


The syntax of these files should be fairly simple.


Lets imagine the route route_file_route.mjs. 
    * To use this in the app, you must import it in main
        index.mjs contains: 
            import routeFile from "./routes/route_file_route.mjs";

            AND -- dont actually write this line please lmao, its literally saying "and"

            app.use("/<route_prefix_url>", routeFile);

    * Notice that all routes defined in this file will be accessed with the <route_prefix_url> at the beginning

    * Then in the route_file_route.mjs will always follow this structure:
    >  import express from "express"; 
    >  import { controllerFile, controllerFile2 } from "../controllers/controllerFile.mjs";
    >  
    >  const router = express.Router();
    >
    >  router.post('/', controllerFile);
    >  router.post('/<example_url_route>', controllerFile2);
    >
    >  export default router;

    To understand this better lets look at what the code is doing.

    - You will always import express and the controllers you need, this should be 
    relatively intuitive. Make sure to follow naming conventions for controllers 
    and the routes for ease of reading.

    - Then you need to create the router: const router = express.Router();

    - Then use that router object to make GET or POST requests. If you do not understand these read the page linked below. We will likely not use any other types of requests than GET and POST. 
    - https://www.w3schools.com/tags/ref_httpmethods.asp
        
        - Example
          >  router.get("/", controllerFile);
          >  router.post("/subroute", controllerFile2);
          
          * This would create a two file paths. Assuming index.mjs uses the route it as above ( with app.use("/<route_prefix_url>", routeFile); ) then the paths created for the backend are:
            domain.com/<route_prefix_url>            -> for the "/" (empty) router.get
            domain.com/<route_prefix_url>/subroute   -> for the "/subroute" router.get

    - **********LASTLY BUT VERY IMPORTANTLY***********
    
      Export the file with: export default router;
    



