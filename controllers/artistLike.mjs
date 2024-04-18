import db from "../database.mjs";

export const unlikeArtist = (req, res) => {
  const { artist_id, person_id } = req.params;


  const q = `DELETE FROM artist_like
       WHERE artist_like_artist_id = ? AND artist_like_listener_id = ?`;
  
  db.query(q, [artist_id, person_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    res.send('Unliked artist');
  });

};

export const likeArtist = (req, res) => {
  const { artist_id, person_id } = req.params;

  const q = `INSERT INTO artist_like (artist_like_artist_id, artist_like_listener_id)
       VALUES (?, ?)`;

  db.query(q, [artist_id, person_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    res.send('Liked artist');
  });
};

export const getLikedArtists = (req, res) => {
  const id = req.params.person_id;
  console.log(id);
  const q = `
    SELECT artist_id, artist_display_name
    FROM artist, artist_like
    WHERE artist.artist_id = artist_like.artist_like_artist_id
    AND artist_like_listener_id = ?
  `;


  db.query(q, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');

    }
    if (results.length === 0) {
      return res.status(404).send('No liked artists');
    }
    res.json(results);
  });
};

export const getArtistLikesCount = (req, res) => {
  const id = req.params.artist_id;
  const q = `
    SELECT COUNT(artist_like_artist_id) as likes
    FROM artist_like
    WHERE artist_like_artist_id = ?
  `;

  db.query(q, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    res.json(results[0]);
  });
}
