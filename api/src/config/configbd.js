const oracledb = require('oracledb');

cns = {
    user: "admin",
    password: "u1H45S1Q",
    connectString: "35.225.104.131/proyecto"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;