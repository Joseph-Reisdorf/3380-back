import multer from 'multer';
import db from "../database.mjs";

const upload = multer();

export const addAlbum = (req, res) => {
    const { album_primary_artist_id, album_title, album_description, album_genre, track_name } = req.body;

    if (!album_primary_artist_id || !album_title || !album_genre) {
        return res.status(400).json({ error: "Missing required album fields" });
    }

    const parsedGenre = parseInt(album_genre, 10);
    if (isNaN(parsedGenre)) {
        return res.status(400).json({ error: "Invalid album genre" });
    }

    const parsedArtistId = parseInt(album_primary_artist_id, 10);
    if (isNaN(parsedArtistId)) {
        return res.status(400).json({ error: "Invalid Artist ID" });
    }

    const maxAlbumIdQuery = "SELECT MAX(album_id) AS max_album_id FROM album";
    db.query(maxAlbumIdQuery, (maxIdErr, maxIdResult) => {
        if (maxIdErr) {
            console.error("Error fetching max album_id:", maxIdErr);
            return res.status(500).json({ error: "Error adding album" });
        }

        const nextAlbumId = maxIdResult[0].max_album_id + 1 || 1;

        const values = [nextAlbumId, album_primary_artist_id, album_title, album_description, parsedGenre];
        const insertAlbumQuery = "INSERT INTO album (album_id, album_primary_artist_id, album_title, album_description, album_genre) VALUES (?)";

        db.query(insertAlbumQuery, [values], (insertAlbumErr) => {
            if (insertAlbumErr) {
                console.error("Error adding album:", insertAlbumErr);
                return res.status(500).json({ error: "Error adding album" });
            }

            const maxTrackIdQuery = "SELECT MAX(track_id) AS max_track_id FROM track";
            db.query(maxTrackIdQuery, (maxTrackIdErr, maxTrackIdResult) => {
                if (maxTrackIdErr) {
                    console.error("Error fetching max track_id:", maxTrackIdErr);
                    return res.status(500).json({ error: "Error adding track" });
                }

                const nextTrackId = maxTrackIdResult[0].max_track_id + 1 || 1;

                const insertQueries = [];

                req.files.forEach((file, index) => {
                    const trackName = track_name[index];
                    const trackValues = [nextTrackId + index, album_primary_artist_id, trackName, file.buffer];
                    const insertTrackQuery = "INSERT INTO track (track_id, track_primary_artist_id, track_name, track_file) VALUES (?)";
                    insertQueries.push({ query: insertTrackQuery, values: trackValues });
                });

                insertQueries.forEach(queryObj => {
                    db.query(queryObj.query, [queryObj.values], (insertTrackErr) => {
                        if (insertTrackErr) {
                            console.error("Error adding track:", insertTrackErr);
                            return res.status(500).json({ error: "Error adding track" });
                        }
                    });
                });

                res.json({ album_id: nextAlbumId, message: "Album and tracks uploaded successfully" });
            });
        });
    });
};

export const uploadTracks = upload.array('track', 100);
