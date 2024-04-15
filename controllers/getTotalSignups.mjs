import db from "../database.mjs";

export const getTotalSignups = (req, res) => {
    const { startDate, endDate } = req.body; // Assuming startDate and endDate are provided in the request body

    const getListenerSignupsQuery = `
        SELECT 
            listener.listener_id, 
            listener.listener_username AS username,
            person.person_first_name AS firstName,
            person.person_last_name AS lastName
        FROM 
            Online_Music_Library.listener
        INNER JOIN 
            Online_Music_Library.person
        ON 
            listener.listener_id = person.person_id
        WHERE 
            person.person_registration_date BETWEEN ? AND ?;
    `;

    const getArtistSignupsQuery = `
        SELECT 
            artist.artist_id, 
            artist.artist_display_name AS displayName,
            person.person_first_name AS firstName,
            person.person_last_name AS lastName
        FROM 
            Online_Music_Library.artist
        INNER JOIN 
            Online_Music_Library.person
        ON 
            artist.artist_id = person.person_id
        WHERE 
            person.person_registration_date BETWEEN ? AND ?;
    `;

    db.query(getListenerSignupsQuery, [startDate, endDate], (err, listenerResult) => {
        if (err) {
            console.error('Error retrieving listener signups:', err);
            res.status(500).json({ error: 'Failed to retrieve listener signups' });
            return;
        }

        const totalListeners = listenerResult.length;
        const listenerData = listenerResult.map(listener => ({
            id: listener.listener_id,
            username: listener.username,
            firstName: listener.firstName,
            lastName: listener.lastName
        }));

        db.query(getArtistSignupsQuery, [startDate, endDate], (err, artistResult) => {
            if (err) {
                console.error('Error retrieving artist signups:', err);
                res.status(500).json({ error: 'Failed to retrieve artist signups' });
                return;
            }

            const totalArtists = artistResult.length;
            const artistData = artistResult.map(artist => ({
                id: artist.artist_id,
                displayName: artist.displayName,
                firstName: artist.firstName,
                lastName: artist.lastName
            }));

            res.json({ totalListeners, listenerData, totalArtists, artistData });
        });
    });
};
