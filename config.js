  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_USER = process.env.DB_USERNAME || 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD || '';
  const DB_NAME = process.env.DB_DATABASE || 'movies_db';


module.exports={
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD
}