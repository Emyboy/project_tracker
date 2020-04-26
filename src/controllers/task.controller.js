import { Task } from '../database/models';

export default class {

    /**
     * @description - This method adds a new task to a project
     * @param {object} req 
     * @param {object} res 
     */
    static async addTask(req, res) {
        const { project_id } = req.params;
        try {
            const createdTask = await Task.create({ project_id, ...req.body })
            res.status(200).json({
                message: 'Added',
                task: createdTask
            });
        } catch (error) {
            res.status(400).json({
                message: 'Error Adding Task',
                error
            });
        }
    }

    /**
     * @description - this gets all task for a project
     * @param {object} req 
     * @param {object} res 
     */
    static async getAllProjectTasks(req, res) {
        const { project_id } = req.params;
        try {
            const tasks = await Task.findAll({
                where: { project_id }
            });
            if(tasks.length === 0){
                res.status(404).json({
                    message: "No Task Found",
                    tasks
                })
            }else {
                res.status(200).json(tasks)
            }
        } catch (error) {
            res.status(400).json({
                message: "Error Loading Tasks",
                error
            })
        }
    }

    /**
     * @description - This method edits a task
     * @param {object} req 
     * @param {object} res 
     */
    static async editTask(req, res){
        const { task_id } = req.params;
        try {
            const editedTask = await Task.update(req.body, {
                where: { id: task_id }
            });
            res.status(200).json({
                message: "Saved",
                editedTask
            })
        } catch (error) {
            res.status(400).json({
                message: "Error Saving",
                error
            })
        }
    }

    /**
     * @description - This method delets a task
     * @param {object} req 
     * @param {object} res 
     */
    static async deleteTask(req, res){
        const { task_id } = req.params;
        try {
            const deletedTask = await Task.destroy({
                where: { id: task_id },
            });
            res.status(200).json({
                message: 'Deleted',
                deletedTask
            })
        } catch (error) {
            res.status(400).json({
                message: 'Error Deleted Task',
                error
            });
        }
    }
}
