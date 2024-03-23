import { DataTypes } from "sequelize"; 
import db from "../db/conn.js"; 

export const Task = db.define("Task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false 
    }
});



 