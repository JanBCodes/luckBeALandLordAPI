
const itemModel = require("../model/itemsModel.js")

exports.showAllItems = (req, res) => {

    itemModel.find()
    .then(items => {

        res.status(200).json({

            message : `List of all items`,
            total : items.length,
            results : items

        })
    })
    .catch(err => {

        res.status(500).json({

            message : `Error  ${err}`
        })

    })    

};


exports.getASpecificItem = (req,res) => {
   
    const bodyName = req.params.name

    console.log(bodyName)
 
    itemModel.findOne({ name: `${bodyName}`}) 
    .then( item => {

        if(item)
        {
            res.status(200).json({
                message : `Item Details of ${bodyName}`,
                results : item
            })
        }
        else
        {
            res.status(404).json({
                message : `Item  with name : ${bodyName} not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 

};

exports.createAnItem = (req,res)=>{
   
    const newItem  = req.body;

    itemModel.findOne({ name: `${newItem.name}`}) 
    .then( item => {
        console.log(item)

        if(item)
        {
            res.status(403).json({
                message : `Sorry user ${newItem.name} is already in use`,
            })
        }
        else
        {
            const item = new itemModel(newItem);
            item.save()
            .then(item => {
        
                res.status(201).json({
                    message : `A new item was successfully created`,
                    results : item
                })
        
            })
            .catch(err => {
        
                res.status(500).json({
                    message : `Error  ${err}`
                })
        
            }) 
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 
};



exports.deleteAnItem = (req,res)=>{

    const bodyName = req.params.name

// console.log(bodyName)
 
    itemModel.findOneAndDelete({ name: `${bodyName}`}) 

    .then(item => {

        // console.log(item)
        if(item)
        {
            res.status(200).json({
                message :`Item named ${bodyName} was deleted`
            })
        }

        else
        {
            res.status(404).json({
                message : `Item named ${bodyName} was not found`
            })
        }
    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 
};

//-----------------------------------------------
exports.updateAnItem = (req,res) => {

    const updatedData = req.body;
    const identifier = req.params.name;

    // condition - how to find user
    // define replacement data
    // default passes old data 

    itemModel.findOneAndUpdate({name: identifier}, updatedData, {new:true})
    .then(item => {

        // console.log(`Item: ${item}`)
        // console.log(`Params Name: ${identifier}`)
        // console.log(`updatedData: ${updatedData}`)

        if(item)
        {
            res.status(200).json({
                message : `Item with the name ${identifier} was updated successfully `,
                data : item
            })
        }
        else
        {
            res.status(404).json({
                message : `Item with the name : ${identifier} not found`
            })
        }

    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    }) 
};
