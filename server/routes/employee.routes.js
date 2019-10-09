const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const employee = require('../controllers/employee.controller');
const user = 'me';

router.post('/authenticate', (req, res) => {
    if (req.body.user == user){
        //res.json({success: true, message:'OK'});
        const token = jwt.sign({user}, req.app.get('my_secret_key'));

        res.json({
            success: true,
            message: 'enjoy your Token',
            token
        });
    } else {
        res.json({success: true, message:'User Not Found'});
    }
});

// Middleware
router.use((req,res,next) => {
    const token = req.body.token || req.headers['authorization'];
    if (token){
        jwt.verify(token, req.app.get('my_secret_key'), (err, decoded) => {
            if (err){
                return res.json({
                    success: false,
                    message: 'authentication failed'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'The Token does not exist'
        })
    }
});

router.get('/', employee.getEmployees);
router.post('/', employee.createEmployee);
router.get('/:id', employee.getEmployee);
router.put('/:id', employee.editEmployee);
router.delete('/:id', employee.deleteEmployee);

module.exports = router;