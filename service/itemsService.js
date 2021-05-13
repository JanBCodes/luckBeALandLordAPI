
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
    
    const item = new itemModel(newItem);

    item.save()
    .then(item => {

        res.status(200).json({
            message : `A new item was successfully created`,
            results : item
        })

    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })

    }) 

};



exports.deleteAnItem = (req,res)=>{

    const bodyName = req.params.name

    console.log(bodyName)
 
    itemModel.findOneAndDelete({ name: `${bodyName}`}) 

    .then(item => {

        console.log(item)
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
exports.updateAnItem = (req,res)=>{

    const updatedDate = req.body;

    const bodyName = req.params

    console.log(bodyName)
    console.log(updatedDate)

    itemModel.findOneAndUpdate(bodyName,updatedDate,{new:true})
    .then(item => {
        if(item)
        {
            res.status(200).json({
                message : `Item with the name (${bodyName}) was updated successfully `,
                data : item
            })

        }
        else
        {
            res.status(404).json({
                message : `Item with the name : ${bodyName} not found`,
            })
        }

    })
    .catch(err => {

        res.status(500).json({
            message : `Error  ${err}`
        })
    }) 
};
