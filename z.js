const axios = require('axios');

axios
  .get('http://localhost:3001/api/customer/list', {
    params: {
      pageSize: 10,
      currentPage: 1,
    },
  })
  .then(d => d.data)
  .then(v => console.log(v));
