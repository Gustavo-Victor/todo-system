import { Task } from "../models/Task.js"; 

export class TaskController {
    
    static createTask(req, res) {
        res.render("tasks/create"); 
    }

    static async saveTask(req, res) {
        const { title, description } = req.body; 
        const task = { title, description, completed: false };
        await Task.create(task); 
        res.redirect("/tasks"); 
    }

    static async showTasks(req, res) {
        const tasks = await Task.findAll({raw: true});
        
        if(tasks.length < 0) {
            res.render("tasks/all", { empty: true }); 
            return ;
        }

        // const formattedTasks = tasks.map(task => {
        //     if(task.completed == 1) {
        //         task.completed = true;
        //     } else{
        //         task.completed = false; 
        //     }
        //     return task;
        // }) ;

        // console.log(formattedTasks);
        
        res.render("tasks/all", { tasks }); 
    }

    static async showTask(req, res) {
        const { id } = req.params;
        if(!id) {
            res.redirect("/tasks");
            return ;
        }

        const task = await Task.findOne({raw: true, where: { id: id}}); 
        if(!task) {
            res.redirect("/tasks");
            return ;
        }

        const formattedTask = {...task}; 
        formattedTask.createdAt = new Date(formattedTask.createdAt).toLocaleString(); 
        formattedTask.updatedAt = new Date(formattedTask.updatedAt).toLocaleString(); 
        formattedTask.completed = formattedTask.completed == 1 ? "Done" : "To do";
        
        res.render("tasks/single", { task: formattedTask });
    }

    static async editTask(req, res) {
        const { id } = req.params; 
        if(!id) {
            res.redirect("/tasks");
            return ;
        }

        const task = await Task.findOne({raw: true, where: {id: id}}); 

        if(!task) {
            res.redirect("/tasks");
            return ;
        }

        res.render("tasks/edit", { task }); 
    }

    static async updateTask(req, res) {
        const { id, title, description } = req.body; 

        if(!id || !title) {
            res.redirect("/tasks");
            return; 
        }

        const updatedTask = { id, title, description };

        await Task.update(updatedTask, { where: { id: id}});
        res.redirect("/tasks"); 
    }

    static async removeTask(req, res) {
        const { id } = req.body; 

        if(!id) {
            res.redirect("/tasks"); 
            return ;
        }

        await Task.destroy({ where: { id: id}}); 
        res.redirect("/tasks"); 
    }

    static async toggleTask(req, res) {
        const { id, completed } = req.body; 

        if(!id) {
            res.redirect("/tasks"); 
            return ;             
        }

        const task = {
            completed: completed == '0' || 0 ? true : false 
        };

        await Task.update(task, { where: {id: id}}); 
        res.redirect("/tasks");
    }

    
}