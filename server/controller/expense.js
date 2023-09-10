exports.addExpenses = (req,res,next)=>{
    try {
       res.send("addExpenses") 
    } catch (error) {
        next(error)
    }
}