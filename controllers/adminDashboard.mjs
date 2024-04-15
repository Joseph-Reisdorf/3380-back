import db from "../database.mjs";


    export const delArtists = (req, res) => {
        const artistId = req.params.artist_id; // Get artist ID from URL params
    
        // Delete follow records query
        const deleteFollowQuery = `DELETE FROM follow WHERE artist_id = ?`;
    
        // Delete artist and associated albums query
        const deleteArtistAndAlbumsQuery = `
            DELETE artist, album
            FROM artist
            LEFT JOIN album ON artist.artist_id = album.album_primary_artist_id
            LEFT JOIN person ON artist.artist_id = person.person_id
            WHERE artist.artist_id = ?;
        `;
    
        // Execute the query to delete follow records
        db.query(deleteFollowQuery, [artistId], (err1, data1) => {
            if (err1) {
                console.error("Error deleting follow records:", err1);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            // Execute the query to delete artist and associated albums
            db.query(deleteArtistAndAlbumsQuery, [artistId], (err2, data2) => {
                if (err2) {
                    console.error("Error deleting artist and associated albums:", err2);
                    return res.status(500).json({ error: "Internal server error" });
                }
    
                return res.json({ data1, data2 });
            });
        });
    };

    export const delListeners = (req, res) => {
    const listenerId = req.params.listener_id; // Get listener ID from URL params

    // Delete listener query
    const deleteListenerQuery = 
        `DELETE listener, person
         FROM listener
         LEFT JOIN person ON person.person_id = listener.listener_id
         WHERE listener.listener_id = ?
    `;

    // Execute the query to delete the listener
    db.query(deleteListenerQuery, [listenerId], (err, data) => {
        if (err) {
            console.error("Error deleting listener:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
};

export const showArtistReport = (req, res) => {
    const { startMonth, endMonth } = req.params;

    const artistJoinMonthQuery = `
    SELECT artist_id, artist_display_name, artist_registration_date
    FROM artist
    WHERE artist_registration_date BETWEEN ? AND ?;
    ;
    `;

    db.query(artistJoinMonthQuery, [startMonth, endMonth], (err, data) => {
        if (err) {
            console.error("Error fetching artists for the specified month range:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
};

export const showListenerReport = (req, res) => {
    const { startMonth, endMonth } = req.params;

    const listenerJoinMonthQuery = `
    SELECT listener.listener_id, listener.listener_username, person.person_registration_date
    FROM listener
    JOIN person ON listener.listener_id = person.person_id
    WHERE person.person_registration_date BETWEEN ? AND ?
    AND listener.listener_is_artist = 'l';
    ;
    `;

    db.query(listenerJoinMonthQuery, [startMonth, endMonth], (err, data) => {
        if (err) {
            console.error("Error fetching listener for the specified month range:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
};

export const generateArtistTable = (req, res) => {
    const monthJoinArtist = `SELECT
    CASE
        WHEN month_number = 1 THEN 'January'
        WHEN month_number = 2 THEN 'February'
        WHEN month_number = 3 THEN 'March'
        WHEN month_number = 4 THEN 'April'
        WHEN month_number = 5 THEN 'May'
        WHEN month_number = 6 THEN 'June'
        WHEN month_number = 7 THEN 'July'
        WHEN month_number = 8 THEN 'August'
        WHEN month_number = 9 THEN 'September'
        WHEN month_number = 10 THEN 'October'
        WHEN month_number = 11 THEN 'November'
        WHEN month_number = 12 THEN 'December'
    END AS registration_month,
    COUNT(*) AS new_artists_count
FROM (
    SELECT
        YEAR(artist_registration_date) AS registration_year,
        MONTH(artist_registration_date) AS month_number,
        DATE_FORMAT(artist_registration_date, '%Y-%m-01') AS truncated_date
    FROM
        artist
    WHERE
        artist_registration_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
) AS subquery
GROUP BY
    registration_year,
    month_number
ORDER BY
    registration_year ASC,
    month_number ASC;
    `;
    db.query(monthJoinArtist, (err, data) => {
        if (err) {
            console.error("Error fetching artist join month count:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
}

  
