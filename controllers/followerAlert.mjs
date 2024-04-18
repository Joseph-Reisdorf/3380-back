import db from '../database.mjs';

export const getNewFollowerAlerts = (req, res) => {
    const id = req.params.artist_id;
    
    const sql = `
        SELECT * 
        FROM follower_alert
        WHERE follower_alert_artist_id = ? 
        AND follower_alert_seen = FALSE
    `;
    
    db.query(sql, [id], (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
        }
        if (results.length === 0) {
        return res.status(404).send('No new follower alerts');
        }
        res.json(results);
    });
}

export const markFollowerAlertAsSeen = (req, res) => {
    const id = req.params.follower_alert_id;
    console.log(id);
    const sql = `
        UPDATE follower_alert
        SET follower_alert_seen = TRUE
        WHERE follower_alert_id = ?
    `;
    
    db.query(sql, [id], (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
        }
        res.send('Follower alert marked as seen');
    });
}