const Authserver = {}

const bq = require('../helpers/bcryptjs')




Authserver.auth = async (data) => {
    try {
        const insertar = await db.query('select * from serverusers where name_server=?', [data.name_server]);
        const pass = bq.verifyPassword(data.password_server, insertar[0].password_server)

        if (insertar === 'error') {
            console.log('ERROR');
        } else {
            return pass;
        }
    } catch (e) {
        console.error(e)
    }
}

module.exports = Authserver;