const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * 
  FROM users 
  WHERE email = $1`;
  const value = [`${email}`];
  return pool.query(queryString,value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err)=> {
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT * 
  FROM users 
  WHERE id = $1`;
  const value = [`${id}`];
  return pool
    .query(queryString,value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err)=> {
      return null;
    });
};
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING *`;
  const values = [`${user.name}`,`${user.email}`,`${user.password}`];
  return pool
    .query(queryString,values)
    .then((res) => {
      res.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });


};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.*,properties.*, AVG(property_reviews.rating) AS average_rating
FROM properties 
JOIN reservations ON properties.id = reservations.property_id
JOIN property_reviews ON reservations.id = reservation_id
WHERE reservations.guest_id = $1 AND reservations.end_date > now()::date
GROUP BY reservations.id,properties.id
ORDER BY start_date
LIMIT $2;`;
  const values = [`${guest_id}`,`${limit}`];
  return pool
    .query(queryString,values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (options.city) {
      queryString += ` AND`;
    } else {
      queryString += `WHERE `;
    }
    queryString += `properties.owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    const minPrice = options.minimum_price_per_night * 100;
    const maxPrice = options.maximum_price_per_night * 100;
    queryParams.push(`${minPrice}`);
    queryParams.push(`${maxPrice}`);
    if (options.city || options.owner_id) {
      queryString += ` AND `;
    } else {
      queryString += `WHERE `;
    }
    queryString += `properties.cost_per_night > $${(queryParams.length) - 1} 
    AND properties.cost_per_night < $${queryParams.length}`;
  }
  

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    
    queryString += ` GROUP BY properties.id HAVING `;
    
    queryString += `avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  if (!options.minimum_rating) {
    queryString += ` GROUP BY properties.id `;
  }
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties(title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *
  `;
  const values = [`${property.title}`,`${property.description}`,`${property.owner_id}`,`${property.cover_photo_url}`,
    `${property.thumbnail_photo_url}`,`${property.cost_per_night}`,`${property.parking_spaces}`,
    `${property.number_of_bathrooms}`,`${property.number_of_bedrooms}`,`${property.province}`,
    `${property.city}`,`${property.country}`,`${property.street}`,`${property.post_code}`];
  return pool
    .query(queryString,values)
    .then((res) => {
      res.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
