import db from "../database.mjs";

// Functions that are used to query the database

// get album by its id (primary key)
export const getAlbumById = (req, res) => {
  // album id stored in request from the URL parameters
  const album_id = req.params.album_id;

  // SQL query to get album by its id
  const q = "SELECT * FROM album WHERE album_id=?";

  // query the database, (err, data) is a callback function that 
  // is called when the query is done, with the error from the request
  // and the data gotten from the request
  db.query(q, [album_id], (err, data) => {
    // unexperted error
    if (err) return res.status(500).json(err);
    
    // if no album is gotten from query
    if (data.length === 0) {
      return res.status(404).json({ message: "Album not found" });
    };


    // album info, IDs are unique so only one album is gotten -> data[0] 
    return res.json(data[0]);
  });
};


// get album by album_primary_artist_id
export const getAlbumsByArtist = (req, res) => {
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

export const getAlbumTitleByArtist = (req, res) => {
  const artist_id = req.params.artist_id;
  const q = "SELECT album_title FROM album WHERE album_primary_artist_id=?";

  db.query(q, [artist_id], (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found for this artist" });
    };
    return res.json(albums);
  });
};

export const getAlbumLikeByPersonID = (req, res) => {
  const album_id = req.params.album_id;
  const listener_id = req.params.listener_id;
  const q = `
    SELECT album_id 
    FROM album, album_like, listener
    WHERE album.album_id = album_like.album_id 
    AND album_like.listener_id = listener.listener_id
    AND listener.listener_id = ?
  `;

  db.query(q, [listener_id], (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No albums found" });
    };
    return res.json(albums);
  });
}