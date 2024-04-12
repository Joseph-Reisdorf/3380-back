
// Search.mjs
import db from "../database.mjs";

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length; 

    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, 
                    matrix[i][j - 1] + 1,     
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

export const search = (req, res) => {
    try {
      const searchTerm = req.query.search;
      console.log("Searching");
      const sqlQuery = `
        SELECT 
          *,
          CASE 
            WHEN name = '${searchTerm}' THEN 100 
            WHEN name LIKE '%${searchTerm}%' THEN 80 
            WHEN name LIKE '%${searchTerm}' THEN 60 
            ELSE 0
          END AS score
        FROM (
          SELECT artist_display_name AS name
          FROM artist
          UNION ALL
          SELECT album_title AS name
          FROM album
          UNION ALL
          SELECT track_name AS name
          FROM track
          UNION ALL
          SELECT playlist_name AS name
          FROM playlist
        ) AS combined_results
        WHERE name LIKE '%${searchTerm}%'
        ORDER BY score DESC;
      `;
  
      // Execute SQL query against the database
      db.query(sqlQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        
        // After fetching results, calculate Levenshtein distance for each and filter
        const filteredResults = data.map(result => ({
          ...result,
          levenshtein: levenshteinDistance(result.name, searchTerm)
        })).filter(result => result.score >= 50 || result.levenshtein <= 4);
  
        return res.json(filteredResults);
      });
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };