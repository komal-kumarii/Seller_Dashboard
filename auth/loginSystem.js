
module.exports=(userLogin,userDB,jwt,env)=>{
    userLogin.post('/login',async(req,res)=>{
        try {
            let email = req.body.email
            await userDB.findOne({email:req.body.email})
            .then((data)=>{
                if(data === null){
                    res.send('User Not exist ')
                }
                else{
                   
                    if(data.password === req.body.password){
                        let token = jwt.sign({email:data.email},process.env.seckretKey)
                        res.cookie('token ',token)
                        res.cookie('data ',data.user_name)
                        res.send('token generated')
                        // console.log(token)
                    }
                }
            })
            .catch((err)=>{
                res.send(err)
            })
        } catch (error) {
            res.send(error)
        }
    })
}