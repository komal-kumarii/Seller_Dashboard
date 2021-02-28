module.exports = (homePage,userDB,productDB)=>{
    homePage.get('/homePage',async(req,res)=>{
        try {
            await productDB.find()
            .select('productId productName price created_by description')
            .populate('productId','Shop_name')
            .exec()
            .then((doc)=>{
                res.status(200).json({
                    message:"Welcome to the Homepage ",
                    Details:doc
                })
            })
        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    })
}