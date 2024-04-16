import db from "../database.mjs";

export const getNotifications = (req, res) => {
    const artist_id = req.params.artist_id;
  //const q = "SELECT * FROM artist WHERE notify_artist = 1 AND artist_id=?";
  const q = "SELECT * FROM artist WHERE notify_artist = 1";
  db.query(q, [artist_id], (err, albums) => {
    if (err) return res.status(500).json(err);
    if (albums.length === 0) {
      return res.status(404).json({ message: "No notification" });
    };
    return res.json(albums);
  });
};
export const getNotificationsByArtistId = (req, res) => {
  const artist_id = req.params.artist_id;
//const q = "SELECT * FROM artist WHERE notify_artist = 1 AND artist_id=?";
const q = "SELECT notify_artist FROM artist WHERE artist_id =?";
db.query(q, [artist_id], (err, albums) => {
  if (err) return res.status(500).json(err);
  if (albums.length === 0) {
    return res.status(404).json({ message: "No notification" });
  };
  return res.json(albums);
});
};