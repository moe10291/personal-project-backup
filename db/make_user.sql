INSERT INTO users
(
    first_name, last_name, email, username, password, phone, lisc
)

VALUES 
(
    $1, $2, $3, $4, $5, $6, $7
)

RETURNING*;