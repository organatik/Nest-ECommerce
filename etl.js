const axios = require('axios');

(async () => {
    try {
        const {data} = await axios.post('http://localhost:3000/auth/register', {
            userName: 'usernadadadsmadasdasdsadasdasdasasdasddasdase123adasdad2324',
            password: 'password12323234',
            seller: true,
            test: 'test',
        });

        console.log(data, 'data-------------------------------------------');
        // console.log(data, 'data-------------------------------------------');



        // const res = await axios.get('http://localhost:3000/auth', { headers: { authorization: `Bearer ${token}` } });
        //
        // console.log(res);

    } catch (e) {
        console.log(e)
    }
})();