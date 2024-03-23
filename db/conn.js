import { Sequelize } from "sequelize";
import { config } from "dotenv";
config(); 

const { USER, PASSWORD, DATABASE, HOST, DIALECT } = process.env; 


const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST, 
    dialect: DIALECT
}); 


// try {
//     sequelize.authenticate(); 
//     console.log("Successfully connected"); 
// } catch(e) {
//     console.log("Connection failure"); 
//     console.log(e);
// }


export default sequelize; 