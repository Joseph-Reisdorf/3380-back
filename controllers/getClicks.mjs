import db from "../database.mjs";

export const getClicks = (req, res) => {
    const { listen_to_listener_id, listen_to_track_id } = req.query;
    const q = "SELECT * FROM listen_to WHERE listen_to_listener_id = ? AND listen_to_track_id = ?";
  
    db.query(q, [listen_to_listener_id, listen_to_track_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};

export const showAlbumReport = (req, res) => {
    const { startMonth, endMonth, albumTitle } = req.params;
    const listenerId = req.params.listenerId;

    let albumClickMonthQuery = `
    SELECT l.listen_to_listener_id, t.track_name, l.listen_to_id, l.listen_to_datetime, p.person_email, lis.listener_username
    FROM listen_to l
    INNER JOIN track t ON l.listen_to_track_id = t.track_id
    INNER JOIN listener lis on l.listen_to_listener_id = lis.listener_id
    INNER JOIN person p on l.listen_to_listener_id = p.person_id
    INNER JOIN artist ar ON t.track_primary_artist_id = ar.artist_id
    INNER JOIN album_song a_s ON t.track_id = a_s.album_song_track_id
    INNER JOIN album a ON a_s.album_song_album_id = a.album_id
    WHERE ar.artist_id = ? 
    AND l.listen_to_datetime BETWEEN ? AND ?`;

if (albumTitle) {
    albumClickMonthQuery += ` AND a.album_title = ?`;
}


    db.query(albumClickMonthQuery, [listenerId, startMonth, endMonth, albumTitle], (err, data) => {
        if (err) {
            console.error("Error fetching albums for the specified month range:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
};

export const generateAlbumTable = (req, res) => {
    const monthClickAlbum = `SELECT
    CASE
        WHEN listen_month_number = 1 THEN 'January'
        WHEN listen_month_number = 2 THEN 'February'
        WHEN listen_month_number = 3 THEN 'March'
        WHEN listen_month_number = 4 THEN 'April'
        WHEN listen_month_number = 5 THEN 'May'
        WHEN listen_month_number = 6 THEN 'June'
        WHEN listen_month_number = 7 THEN 'July'
        WHEN listen_month_number = 8 THEN 'August'
        WHEN listen_month_number = 9 THEN 'September'
        WHEN listen_month_number = 10 THEN 'October'
        WHEN listen_month_number = 11 THEN 'November'
        WHEN listen_month_number = 12 THEN 'December'
    END AS datetime,
    COUNT(*) AS new_plays_count
FROM (
    SELECT
        YEAR(listen_to_datetime) AS listen_year,
        MONTH(listen_to_datetime) AS listen_month_number,
        DATE_FORMAT(listen_to_datetime, '%Y-%m-01') AS truncated_date
    FROM
        listen_to
    WHERE
        listen_to_datetime >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
) AS subquery
GROUP BY
    listen_year,
    listen_month_number
ORDER BY
    listen_year ASC,
    listen_month_number ASC;
    `;
    db.query(monthClickAlbum, (err, data) => {
        if (err) {
            console.error("Error fetching album click month count:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.json({ data });
    });
}