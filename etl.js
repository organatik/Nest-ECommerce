const axios = require('axios');

(async () => {
    try {
        const {data} = await axios.post('http://localhost:3000/auth/register', {
            userName: '449',
            password: '321',
            seller: true
        });

        console.log(data)



        // const res = await axios.get('http://localhost:3000/auth', { headers: { Authorization: `Bearer ${token}` } });
        //
        // console.log(res);
    } catch (e) {
        console.log(e)
    }
})();