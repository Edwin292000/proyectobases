const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/getUsers', async (req, res) => {
    sql = "SELECT * FROM departamento";

    let result = await BD.Open(sql, [], false);
    Users = [];
    result.rows.map(user => {
        let userSchema = {
            "ID_DEPARTAMENTO": user[0],
            "NOMBRE": user[1]
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE

router.post('/addUser', async (req, res) => {
    const { NOMBRE} = req.body;

    sql = "INSERT INTO DEPARTAMENTO (NOMBRE) VALUES(:NOMBRE)";

    await BD.Open(sql, [NOMBRE], true);

    res.status(200).json({
        "NOMBRE": NOMBRE,
    })
})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { NOMBRE, ID_DEPARTAMENTO } = req.body;

    sql = "UPDATE departamento SET NOMBRE=:NOMBRE WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";

    await BD.Open(sql, [NOMBRE, ID_DEPARTAMENTO], true);

    res.status(200).json({
        "ID_DEPARTAMENTO": ID_DEPARTAMENTO,
        "NOMBRE": NOMBRE,
    })


})


//DELETE
router.delete("/deleteUser/:ID_DEPARTAMENTO", async (req, res) => {
    const { ID_DEPARTAMENTO } = req.params;

    //sql = "DELETE FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    sql = "SELECT * FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    await BD.Open(sql, [ID_DEPARTAMENTO], true);

    res.json({ "msg": "Usuario Eliminado"+ID_DEPARTAMENTO })
})


module.exports = router;