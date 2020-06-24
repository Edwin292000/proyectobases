const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/municipio', async (req, res) => {
    sql = "SELECT * FROM MUNICIPIO";

    let result = await BD.Open(sql, [], false);
    MUNI = [];
    result.rows.map(m => {
        let muniSchema = {
            "ID_MUNICIPIO": m[0],
            "NOMBRE": m[1],
            "ID_DEPARTAMENTO": m[2]
        }

        MUNI.push(muniSchema);
    })

    res.json(MUNI);
})

//CREATE
router.post('/municipio', async (req, res) => {
    const { NOMBRE, ID_DEPARTAMENTO} = req.body;

    sql = "INSERT INTO MUNICIPIO (NOMBRE, ID_DEPARTAMENTO) VALUES(:NOMBRE, :ID_DEPARTAMENTO)";

    await BD.Open(sql, [NOMBRE, ID_DEPARTAMENTO], true);

    res.status(200).json({
        "msg:": "Insertado",
        "NOMBRE": NOMBRE,
        "ID_DEPARTAMENTO": ID_DEPARTAMENTO
    })
})

//UPDATE
router.put("/updatemun", async (req, res) => {
    const { NOMBRE, ID_DEPARTAMENTO } = req.body;

    sql = "UPDATE departamento SET NOMBRE=:NOMBRE WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";

    await BD.Open(sql, [NOMBRE, ID_DEPARTAMENTO], true);

    res.status(200).json({
        "ID_DEPARTAMENTO": ID_DEPARTAMENTO,
        "NOMBRE": NOMBRE,
    })


})


//DELETE
router.delete("/deletemun/:ID_DEPARTAMENTO", async (req, res) => {
    const { ID_DEPARTAMENTO } = req.params;

    //sql = "DELETE FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    sql = "SELECT * FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    await BD.Open(sql, [ID_DEPARTAMENTO], true);

    res.json({ "msg": "Usuario Eliminado"+ID_DEPARTAMENTO })
})


module.exports = router;