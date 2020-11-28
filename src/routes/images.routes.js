const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images')
    },
    filename: (req, file, cb)=>{originalname
        var originalname=path.basename(file.originalname);
        cb(null, originalname.substring(0, originalname.indexOf('.')-1)+'-'+Date.now()+path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/foto/alumno/:img', (req, res) => {
    let img=path.join(__dirname, '../../images/'+req.params.img);
    fs.open(img,'r',function(err,fd){
        if (err && err.code=='ENOENT') { 
            res.sendStatus(404);
        }else{
            res.sendFile(img);
        }
    });
});
router.post('/foto/alumno', upload.single('file'), async (req, res) => {
    console.log(req.file);
    return res.send(req.file); 
});

module.exports = router;