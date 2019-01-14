
-- Select users_id, listings_id, first_name, last_name, phone, address, price, description from users_listings as ul
-- join users on ul.users_id = users.id
-- join listings on ul.listings_id = listings.id

SELECT * FROM users_listings
JOIN listings ON listings.id= users_listings.listings_id
JOIN users on users.id= users_listings.users_id

WHERE users_id =$1;