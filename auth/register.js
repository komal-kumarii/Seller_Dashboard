module.exports=(user,userDB)=>{
    
    user.post('/register',async(req,res)=>{
       try {
        let UserEmail = req.body.email
        let userPassword = req.body.password
        let Phone_number = req.body.Phone_number
        await userDB.find()
        .then((data)=>{
            let newUser = new userDB({
                email:req.body.email,
                user_name:req.body.user_name,
                password:req.body.password,
                Shop_name:req.body.Shop_name,
                Phone_number:req.body.Phone_number

            })
            // console.log(userName.length) 
            if(req.body.Phone_number === undefined || req.body.password ===undefined || req.body.user_name ===undefined || req.body.email===undefined ){
                return res.send('first fill all the  details ')
            }
            if(Phone_number.length>10 || Phone_number.length<10){
                return res.send('please fill your valid phone number ')
            }
            else{
                if(UserEmail.length >0 || UserEmail.length<20 && UserEmail.includes('@')){
                    if(userPassword.length>0 && userPassword.length<9 ){
                        newUser.save()
                        .then((newUser)=>{
                            res.status(200).json({
                                msg:"You are registered now ",
                                Profile:newUser
                            })
                        })
                        .catch((err)=>{
                            res.send(err)
                        })
                    }
                    else{
                        res.send('Password should be 8 charactor long ')
                        console.log('Password should be 8 charactor lo')
                    }
                }
                else{
                    res.send('Invalid users email')
                    console.log('Invalid users email')
                }
            }
            
        })
       } catch (error) {
           res.send(500)
       }
    })


    user.get('/getAllUsers',async(req,res)=>{
        try {
            await userDB.find()
            .then((data)=>{
                res.status(200).json({
                    message:" ### All the sellers are here ###",
                    SellerDetails:data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            res.send(500)
        }
    })
     
}