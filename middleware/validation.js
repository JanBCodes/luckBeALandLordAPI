exports.validateIncomingData = (req,res,next)=>{

    console.log(req.body);

    const errors = [];

    if(req.body.name == "")
    {
        errors.push("Sorry name cannot be blank")
    }

    if(req.body.rarity == "")
    {
        errors.push("Sorry rarity cannot be blank")    
    }

    if(errors.length == 0)
    {
        next();
    }
    else
    {
        res.status(400).json({
            message: "Oops there are some errors in your code ",
            errors
        })
    }
   
}