INSERT INTO users_listings (
    users_id, listings_id
)
VALUES (
    $1, $2
);


SELECT * FROM users_listings
JOIN listings ON listings.id= users_listings.listings_id
WHERE users_listings.users_id= $1;