import db from "../database.mjs";

export const updateFollowCount = (artistId) => {
    const q = `
    UPDATE Online_Music_Library.artist AS a
    INNER JOIN (
        SELECT artist_id, COUNT(*) AS follow_count 
        FROM Online_Music_Library.follow 
        GROUP BY artist_id
    ) AS f ON a.artist_id = f.artist_id
    SET a.follow_count = f.follow_count;
    `;

    db.query(q, [artistId], (err, data) => {
        if (err) throw err;

        console.log(`Follow count updated for artist ID ${artistId}`);
    });
};