
// Used to be Artist.mjs 
import db from "../database.mjs";


export const getArtistById = (req, res) => {
  const artist_id = req.params.artist_id;
  const q = "SELECT * FROM artist WHERE artist_id=?";

  db.query(q, [artist_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: "Artist not found" });
    };

    // consider to change by not extracting data on this end, can be changed on front end like in getAlbum
    const { artist_display_name, artist_email, artist_biography } = data[0];
    const artistInfo = { artist_display_name, artist_email, artist_biography };
    return res.json(artistInfo);
  });
};

export const searchArtistByName = (req, res) => {
  const { artist_display_name } = req.query;
  const q = "SELECT * FROM artist WHERE artist_display_name LIKE ?";

  db.query(q, [`%${artist_display_name}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const getArtists = (req, res) => {
  const q = ` SELECT
                a.*,
                COUNT(l.artist_like_listener_id) AS follower_count
              FROM
                artist a
              LEFT JOIN
                artist_like l ON a.artist_id = l.artist_like_artist_id
              GROUP BY
                a.artist_id`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const getArtistRankingByTracks = (req, res) => {
  const { start_date, end_date } = req.query;
  const q = `
    SELECT 
      CONCAT(person.person_first_name, ' ', COALESCE(person.person_middle_initial, ''), ' ', person.person_last_name) AS full_name,
      person.person_email,
      person.person_birthdate,
      COUNT(track.track_id) AS number_of_tracks
    FROM 
      Online_Music_Library.person
    INNER JOIN 
      Online_Music_Library.artist ON person.person_id = artist.artist_id
    LEFT JOIN 
      Online_Music_Library.track ON artist.artist_id = track.track_primary_artist_id
    WHERE 
      person.person_registration_date BETWEEN ? AND ?
    GROUP BY 
      artist.artist_id
    ORDER BY 
      number_of_tracks DESC;
  `;

  db.query(q, [start_date, end_date], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const getArtistRankingByAlbums = (req, res) => {
  const { start_date, end_date } = req.query;
  const q = `
    SELECT 
      CONCAT(person.person_first_name, ' ', COALESCE(person.person_middle_initial, ''), ' ', person.person_last_name) AS full_name,
      person.person_email,
      person.person_birthdate,
      COUNT(album.album_id) AS number_of_albums
    FROM 
      Online_Music_Library.person
    INNER JOIN 
      Online_Music_Library.artist ON person.person_id = artist.artist_id
    LEFT JOIN 
      Online_Music_Library.album ON artist.artist_id = album.album_primary_artist_id
    WHERE 
      person.person_registration_date BETWEEN ? AND ?
    GROUP BY 
      artist.artist_id
    ORDER BY 
      number_of_albums DESC;
  `;

  db.query(q, [start_date, end_date], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const getArtistRankingByListens = (req, res) => {
  const { start_date, end_date } = req.query;
  const q = `
    SELECT 
      CONCAT(person.person_first_name, ' ', COALESCE(person.person_middle_initial, ''), ' ', person.person_last_name) AS full_name,
      person.person_email,
      person.person_birthdate,
      SUM(COALESCE(listen_to.listen_count, 0)) AS total_listens
    FROM 
      Online_Music_Library.person
    INNER JOIN 
      Online_Music_Library.artist ON person.person_id = artist.artist_id
    LEFT JOIN 
      (SELECT listen_to_track_id, COUNT(*) AS listen_count FROM Online_Music_Library.listen_to GROUP BY listen_to_track_id) AS listen_to 
    ON track.track_id = listen_to.listen_to_track_id
    LEFT JOIN 
      Online_Music_Library.track ON artist.artist_id = track.track_primary_artist_id
    WHERE 
      person.person_registration_date BETWEEN ? AND ?
    GROUP BY 
      artist.artist_id
    ORDER BY 
      total_listens DESC;
  `;

  db.query(q, [start_date, end_date], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

