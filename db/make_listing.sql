INSERT INTO listings
(
price, address, beds, bath, area_sqft, description, lat, long
)
VALUES(
$1, $2, $3, $4, $5, $6, $7, $8
)

RETURNING id;



-- SELECT * FROM users_listings
-- JOIN listings ON listings.id= users_listings.listings_id
-- JOIN users on users.id= users_listings.users_id

-- WHERE users_id =$11;
-- INSERT INTO users_listings
-- (users_id, listings_id)
-- VALUES ($9, $10)

-- SELECT * FROM users_listings
-- JOIN listings ON listings.id= users_listings.listings_id
-- JOIN users on users.id= users_listings.users_id

-- WHERE users_id =$1;



-- INSERT INTO users_listings
-- (
--     users_id, listings_id
-- )

-- VALUES
-- (
--     $1, $2
-- );

-- SELECT * FROM listings as l
-- JOIN users_listings as ul ON l.id = ul.listings_id
-- WHERE ul.users_id = $1