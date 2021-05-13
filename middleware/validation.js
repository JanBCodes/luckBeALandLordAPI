exports.validateIncomingData = (req,res,next)=>{

    console.log(req.body);

    const errors = [];

    if(req.body.name=="")
    {
        errors.push("Sorry this Name is already in use, ")
    }

    if(req.body.lastName=="")
    {
        errors.push("You must enter a lastname")
    }

    if(req.body.email=="")
    {
        errors.push("You must enter an email")
    }

    if(errors.length == 0)
    {
        next();
    }
    else
    {
        res.status(400).json({
            message: "You have errors in your data",
            errors
        })
    }
   
}