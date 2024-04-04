import multer from 'multer';
import db from "../database.mjs";

const upload = multer();

export const addAlbum = (req, res) => {
    const { album_primary_artist_id, album_title, album_description, album_genre, track_name } = req.body;

    if (!album_primary_artist_id || !album_title || !album_genre || !req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Missing required album fields or track files" });
    }

    const parsedGenre = parseInt(album_genre, 10);
    if (isNaN(parsedGenre)) {
        return res.status(400).json({ error: "Invalid album genre" });
    }

    const parsedArtistId = parseInt(album_primary_artist_id, 10);
    if (isNaN(parsedArtistId)) {
        return res.status(400).json({ error: "Invalid Artist ID" });
    }

    const insertAlbumQuery = "INSERT INTO album (album_primary_artist_id, album_title, album_description, album_genre) VALUES (?, ?, ?, ?)";

    db.query(insertAlbumQuery, [album_primary_artist_id, album_title, album_description, parsedGenre], (insertAlbumErr, insertAlbumResult) => {
        if (insertAlbumErr) {
            console.error("Error adding album:", insertAlbumErr);
            return res.status(500).json({ error: "Error adding album" });
        }

        const albumId = insertAlbumResult.insertId;

        const insertTrackQuery = "INSERT INTO track (track_primary_artist_id, track_name, track_file) VALUES (?, ?, ?)";
        const insertAlbumSongQuery = "INSERT INTO album_song (album_song_album_id, album_song_track_id) VALUES (?, ?)";

        req.files.forEach((file, index) => {
            const trackName = track_name[index];

            db.query(insertTrackQuery, [album_primary_artist_id, trackName, file.buffer], (insertTrackErr, insertTrackResult) => {
                if (insertTrackErr) {
                    console.error("Error adding track:", insertTrackErr);
                    return res.status(500).json({ error: "Error adding track" });
                }

                const trackId = insertTrackResult.insertId;

                db.query(insertAlbumSongQuery, [albumId, trackId], (insertAlbumSongErr) => {
                    if (insertAlbumSongErr) {
                        console.error("Error adding album-song association:", insertAlbumSongErr);
                        return res.status(500).json({ error: "Error adding album-song association" });
                    }
                });
            });
        });

        res.json({ album_id: albumId, message: "Album and tracks uploaded successfully" });
    });
};

export const uploadTracks = upload.array('track', 100);
