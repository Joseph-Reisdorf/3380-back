import db from "../database.mjs";

// Functions that are used to query the database

// get album by its id (primary key)
export const getAlbumById = (req, res) => {
  const album_id = req.params.album_id;

  const q = `
    SELECT a.*, t.* 
    FROM album a 
    JOIN album_song ast ON a.album_id = ast.album_song_album_id 
    JOIN track t ON ast.album_song_track_id = t.track_id 
    WHERE a.album_id = ?`;

  db.query(q, [album_id], (err, data) => {
    if (err) return res.status(500).json(err);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Album not found" });
    };

    const albumWithTracks = {
      album_id: data[0].album_id,
      album_primary_artist_id: data[0].album_primary_artist_id,
      album_title: data[0].album_title,
      album_release_date: data[0].album_release_date,
      album_description: data[0].album_description,
      album_cover_art: data[0].album_cover_art,
      album_genre: data[0].album_genre,
      tracks: data.map(track => ({
        track_id: track.track_id,
        track_primary_artist_id: track.track_primary_artist_id,
        track_name: track.track_name,
        track_file: track.track_file
      }))
    };

    return res.json(albumWithTracks);
  });
};

// get album by album_primary_artist_id
export const getAlbumByArtist = (req, res) => {
  const artist_id = req.params.artist_id;
  const q = "SELECT * FROM album WHERE album_primary_artist_id=?";

  db.query(q, [artist_id], (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found for this artist" });
    };
    return res.json(albums);
  });
};


// get all albums
export const getAlbums = (req, res) => {
  const q = "SELECT * FROM album";

  db.query(q, (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found" });
    };
    return res.json(albums);
  });
};

export const getAlbumLikeCountByArtist = (req, res) => {
  const artist_id = req.params.artist_id;
  const q = "SELECT album_id, album_title, album_like_count FROM album WHERE album_primary_artist_id=?";

  db.query(q, [artist_id], (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found for this artist" });
    };
    return res.json(albums);
  });
};
