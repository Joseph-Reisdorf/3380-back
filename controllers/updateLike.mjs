import db from "../database.mjs";

export const updateLike = (albumId) => {
    const q = `
    UPDATE Online_Music_Library.album AS a
    INNER JOIN (
        SELECT album_id, COUNT(*) AS album_like_count 
        FROM Online_Music_Library.album_like
        GROUP BY album_id
    ) AS f ON a.album_id = f.album_id
    SET a.album_like_count = f.album_like_count;
    `;

    db.query(q, [albumId], (err, data) => {
        if (err) throw err;
    });
};