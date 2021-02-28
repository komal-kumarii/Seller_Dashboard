module.exports=(logout,userDB)=>{

    // for logout from the user details
    logout.post('/logout',async(req,res)=>{
        res.clearCookie('token','data')
        // .then((data)=>{
        return res.send('you are  successfully logout ')
        // })
    })
}