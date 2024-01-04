import { DataTypes, } from "sequelize";
import { Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import users from "./model/user"
Sequelize
var db:any= {}
// import dynamic
let models :any = []
let tempdb:any={};

// Initialize models
const Database =new Sequelize(
    "database",
    "username",
    "password",
    {
        models: [__dirname + '/model'],
        repositoryMode: true,
        validateOnly: true,
        

    }
  );
models.forEach((model:any)=> {
    const seqModel = model(Database, Sequelize)            // here it is giving the whole model object{model : countries , associat:function} for all the models
    db[seqModel.model.name] = seqModel.model;               // assigning only model property of the object to the db
    tempdb[seqModel.model.name]=seqModel;                   // assigning full model object to tempdb
    console.log("name =",db[seqModel.model.name],'here is tableName and is mapped with object model')
})

// Apply associations
console.log(db);
Object.keys(tempdb).forEach(key => {
    if ('associate' in tempdb[key]) {
      console.log(tempdb[key],"here in side")
        tempdb[key].associate(db)
    }
})

db.sequelize = Database

 export default  db;