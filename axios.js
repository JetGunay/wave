import axios from 'axios'

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
// headers.append('Authorization', 'Bearer '+token);
headers.append('Authorization', 'Bearer '+token);

const axiosClient = axios.create({
  baseURL: `https://www.wrike.com/api/v4/`,
  // headers: headers
  headers: {
    Authorization:
      'Bearer '+token,
  },
});

export default axiosClient;
