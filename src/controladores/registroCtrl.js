import {conmysql} from '../db.js'
export const getRegistros=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from mediciones ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar mediciones"})
        }
    }
    


export const getregistrosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from registros where id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Mediciones no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postRegistro=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {fecha, temperatura}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into mediciones (fecha, temperatura) values(?,?)',
            [fecha, temperatura])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putRegistro=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {fecha, temperatura}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update registros set fecha=?, temperatura=? where id=?',
            [fecha, temperatura, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'medicion no encontrado'
        })
        const[rows]=await conmysql.query('select * from mediciones where id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchRegistro=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {fecha, temperatura}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update registros set fecha=IFNULL(?,fecha), temperatura=IFNULL(?,temperatura) where id=?',
            [fecha, temperatura, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Medicion no encontrado'
        })
        const[rows]=await conmysql.query('select * from mediciones where id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteRegistro=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from registros where id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar la medicion"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "medicion eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}