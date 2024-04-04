import db from "../database.mjs";

export const addPlaylist = (req, res) => {
    const { listener_id, name, tracks } = req.body;

    const playlistReleaseDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current timestamp

    const insertPlaylistQuery = "INSERT INTO playlist (playlist_listener_id, playlist_release_date, playlist_name) VALUES (?, ?, ?)";
    const values = [listener_id, playlistReleaseDate, name];

    db.query(insertPlaylistQuery, values, (err, playlistResult) => {
        if (err) {
            console.error('Error adding playlist:', err);
            res.status(500).json({ error: 'Failed to add playlist' });
            return;
        }

        const playlistId = playlistResult.insertId;

        // Insert into playlist_song table for each track
        for (const trackId of tracks) {
            const insertPlaylistSongQuery = 'INSERT INTO playlist_song (playlist_song_playlist_id, playlist_song_track_id) VALUES (?, ?)';
            db.query(insertPlaylistSongQuery, [playlistId, trackId], (err) => {
                if (err) {
                    console.error('Error adding playlist song:', err);
                    // Rollback transaction if any error occurs
                    db.query('DELETE FROM playlist WHERE playlist_id = ?', [playlistId], () => {
                        res.status(500).json({ error: 'Failed to add playlist' });
                    });
                    return;
                }
            });
        }

        res.json({ message: 'Playlist added successfully', playlistId });
    });
};
