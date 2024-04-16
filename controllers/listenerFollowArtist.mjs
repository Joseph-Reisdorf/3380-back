import db from "../database.mjs";

export const listenerFollowArtist = (req, res) => {
  const { artistId, listenerId } = req.body;

  // Check if the listener has already followed the artist
  const checkFollowQuery = "SELECT * FROM artist_like WHERE artist_like_artist_id = ? AND artist_like_listener_id = ?";
  db.query(checkFollowQuery, [artistId, listenerId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      // If a follow exists, delete it (unfollow)
      const deleteFollowQuery = "DELETE FROM artist_like WHERE artist_like_artist_id = ? AND artist_like_listener_id = ?";
      db.query(deleteFollowQuery, [artistId, listenerId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.status(200).json({ success: true, message: "Unfollowed artist successfully" });
      });
    } else {
      // If no follow exists, insert a new follow
      const insertFollowQuery = "INSERT INTO artist_like (artist_like_artist_id, artist_like_listener_id) VALUES (?, ?)";
      db.query(insertFollowQuery, [artistId, listenerId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.status(200).json({ success: true, message: "Followed artist successfully" });
      });
    }
  });
};
