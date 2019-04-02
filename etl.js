const axios = require('axios');

(async () => {
    try {
        const {data} = await axios.post('http://localhost:3000/auth/login', {
            userName: 'usernadadadasdasdsmadasdasdasdasdadasdasdasasddadasddasdasadasdasdasdadasasdasddasdase123adasdad2324',
            password: 'password12323234',
            seller: true,
        });

        console.log(data, 'data-------------------------------------------');
        // // console.log(data, 'data-------------------------------------------');
        //


        // const res = await axios.get('http://localhost:3000/auth');
        // //
        // console.log(res);

    } catch (e) {
        console.log(e)
    }
})();`1`