module.exports = (userDashboard,userDB,jwt,env,productDB,mongoose)=>{
    function verify(req,res,next){
        let userToken = req.headers.cookie
        if(userToken){
            let token1 = (userToken.slice(5).split(';')[0])
            global.userData = userToken.slice(5).split(';')[1].slice(6)
            // console.log(token1)
            jwt.verify(token1,process.env.seckretKey,(err,decoded)=>{
                
                next()
            })
        }
        else{
            res.send('First you have to regitser yourself ')
        }
    }

    userDashboard.put('/editProfile',async(req,res)=>{
        try {
            
            var edit= userDB.updateOne({user_name:userData},{$set:{
                email:req.body.email,
                user_name:req.body.user_name,
                password:req.body.password,
                Shop_name:req.body.Shop_name,
                Phone_number:req.body.Phone_number
            }})
            .then((doc)=>{
                res.status(200).json({
                    message:"Profile has been updated ",
                    profile : doc
                })
            })

        } catch (error) {
            res.status(500).json({
                err:error
            })
        }
    })

    userDashboard.get('/get',verify,async(req,res)=>{
        try {
            await userDB.findOne({user_name:userData})
            .then((doc)=>{
                res.status(200).json({
                    profile:doc
                })
            })
        } catch (error) {
            
        }
    })
    
    // seller  can  add   their  product 
    userDashboard.post('/post',verify,async(req,res)=>{
        try {
            await userDB.findOne({user_name:userData})
            .then((data)=>{
                let product = new productDB({
                    productId:req.body.productId,
                    productName:req.body.productName,
                    price:req.body.price,
                    stock:req.body.stock,
                    created_at:new Date(),
                    created_by:userData,
                    description:req.body.description

                })
                product.save()
                .then((doc)=>{
                    res.status(200).json({
                        message:"product has been successfully accepted ",
                        product:doc
                    })
                })
                .catch((err)=>{
                    res.send(err)
                })
            })
        } catch (error) {
            res.send(error)
        }
    })

    // seller  can  edit  their  name 
    userDashboard.put('/editProduct/:productName',verify,async(req,res)=>{
        try {
            let productName = req.params.productName
            userDB.find({user_name:userData})
            .then((data)=>{
                let updated_product = productDB.updateOne({productName:req.params.productName},{$set:{
                    productId:req.body.productId,
                    productName:req.body.productName,
                    price:req.body.price,
                    stock:req.body.stock,
                    created_at:new Date(),
                    created_by:userData,
                    description:req.body.description
                }})
                .then((data)=>{
                    res.status(200).json({
                        message:"Your product data has been updated ",
                        updatedData:data
                    })
                })
            })
            .catch((err)=>{
                res.send('product not found ')
            })

        } catch (error) {
            res.send(error)
        }
    })

    // seller can delete their product 
    userDashboard.delete('/delete/:productName',async(req,res)=>{
        try {
            let productName = req.params.productName
            await userDB.find({user_name:userData})
            .then((data)=>{
                let deleteData = productDB.deleteOne({productName:req.params.productName})
                .then((data)=>{
                    res.status(200).json({
                        message:' product data has been deleted '
                    })
                })
                .catch((err)=>{
                    res.send(err)
                })
            })
            .catch((err)=>{
                res.send('Product not found ')
            })
        } catch (error) {
            res.send(error)
        }
    })
}