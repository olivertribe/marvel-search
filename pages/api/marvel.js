import axios from 'axios';
import md5 from 'md5';
// Building Marvels HASH for API
let baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
const ts = 1; //Marvel requires a number for the timestamp
const limit = process.env.limit; //API result limit
const stringToHash = ts + privateKey + publicKey;
const hash = md5(stringToHash);

export default async (req, res) => {
  const result = await axios(
    baseUrl + 'nameStartsWith=' + req.query.searchText + '&limit=' + limit + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash
  )
  res.statusCode = result.status
  res.json(result.data);
}
