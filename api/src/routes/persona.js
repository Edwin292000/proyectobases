const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/persona', async (req, res) => {
    sql = "SELECT * FROM PERSONA";

    let result = await BD.Open(sql, [], false);
    PERSON = [];
    result.rows.map(p => {
        let personSchema = {
            "ID_PERSONA": p[0],
            "CUI": p[1],
            "NOMBRES": p[2],
            "APELLIDOS": p[3],
            "CUI_PADRE": p[4],
            "CUI_MADRE": p[5],
            "FECHA_NACIMIENTO": p[6],
            "DIRECCION": p[7],
            "ID_DEPARTAMENTO": p[8]
        }

        PERSON.push(personSchema);
    })

    res.json(PERSON);
})

//CREATE
router.post('/persona', async (req, res) => {
    const { CUI,NOMBRES, APELLIDOS, CUI_PADRE, CUI_MADRE,FECHA_NACIMIENTO, DIRECCION, ID_DEPARTAMENTO} = req.body;

    sql = "INSERT INTO PERSONA (CUI,NOMBRES, APELLIDOS, CUI_PADRE, CUI_MADRE,FECHA_NACIMIENTO, DIRECCION, ID_DEPARTAMENTO)" +
    " VALUES(:CUI,:NOMBRES, :APELLIDOS, :CUI_PADRE, :CUI_MADRE,:FECHA_NACIMIENTO, :DIRECCION, :ID_DEPARTAMENTO)";

    await BD.Open(sql, [CUI,NOMBRES, APELLIDOS, CUI_PADRE, CUI_MADRE,FECHA_NACIMIENTO, DIRECCION, ID_DEPARTAMENTO], true);

    res.status(200).json({
        "msg":"Se inserto",
        "NOMBRES": NOMBRES,
        "CUI": CUI
    })
})

//UPDATE
router.put("/updateper", async (req, res) => {
    const { NOMBRE, ID_DEPARTAMENTO } = req.body;

    sql = "UPDATE departamento SET NOMBRE=:NOMBRE WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";

    await BD.Open(sql, [NOMBRE, ID_DEPARTAMENTO], true);

    res.status(200).json({
        "ID_DEPARTAMENTO": ID_DEPARTAMENTO,
        "NOMBRE": NOMBRE,
    })


})


//DELETE
router.delete("/deletedep/:ID_DEPARTAMENTO", async (req, res) => {
    const { ID_DEPARTAMENTO } = req.params;

    //sql = "DELETE FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    sql = "SELECT * FROM departamento WHERE ID_DEPARTAMENTO=:ID_DEPARTAMENTO";
    await BD.Open(sql, [ID_DEPARTAMENTO], true);

    res.json({ "msg": "Usuario Eliminado"+ID_DEPARTAMENTO })
})


module.exports = router;