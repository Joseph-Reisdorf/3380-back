# Database Query Functions

The files in this folder are designed to query the database and possibly make changes to that data. Functions should be created individually unless they are closely related.

> **Note:** The "..." in the examples is a placeholder and does not literally mean to type "...".

-------------------------------------------------------------

## Example 1

This example demonstrates how to structure a function that queries the database. 

import db from "../database.mjs";

export const descriptiveFunctionName = (req, res) => {
    // Additional code here

    const q = // The SQL query, for example, "SELECT * FROM album WHERE album_id=?"

    // Execute the query
    db.query(q, [/* Replace question marks in 'q' with actual values */], (err, data) => {
        // This is a callback function that handles the query results
    });
}


------------------------------------------------------------

## Example 2:
import db from "../database.mjs";

const descriptiveFunctionName = (rq, res) => {
    ...

    const q = // query, example looks like "SELECT * FROM album WHERE album_id=?"

    db.query(q, [question mark replacements from q], (err, data) =>  {
        // make query
        // this is a callback function used, which captures the details of the request into err and data

    });
}

export default descriptiveFunctionName; // used when only exporting one function from a file