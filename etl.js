const axios = require('axios');

(async () => {
    try {
        // const {data: {token}} = await axios.post('http://localhost:3000/auth/register', {
        //     userName: 'organatik1233',
        //     password: '11111asdasd1'
        // });
        //
        // console.log(token);

        const {data} = await axios.get('http://localhost:3000/auth',{} );

        console.log(data);
    } catch (e) {
        console.log(e)
    }
})();