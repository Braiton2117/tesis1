import { Router } from "express";
import {
    getRegistros, 
    getregistrosxid,
    postRegistro,
    putRegistro,
    patchRegistro,
    deleteRegistro
} from '../controladores/registrosCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/registros', getRegistros)  //select
router.get('/registros/:id',getregistrosxid)  //select x id
router.post('/registros',postRegistro)  //insert
router.put('/registros/:id',putRegistro)  //update
router.patch('/registros/:id',patchRegistro)  //update
router.delete('/registros/:id',deleteRegistro)  //delete

export default router