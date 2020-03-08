import { Projects } from '../database/models';


export default class ProjectController {
    /**
     * @description - this method add a new project
     * @param {Object} req 
     * @param {Object} res 
     */
    static async createProject(req, res) {
        const { user_id } = req.params;
        const { name, description } = req.body;
        try {
            const project = await Projects.create({
                user_id, name, description
            });
            res.status(200).json({
                status: 200,
                message: 'Project Created',
                project
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error',
                error
            })
        }
    }

    /**
     * @description - This method get all user's projects
     * @param {Oject} req 
     * @param {Oject} res 
     */
    static async getUserProject(req, res){
        const { user_id } = req.params;
        try {
            const userProjects = await Projects.findAll({
                where: { user_id }
            });
            res.status(200).json(userProjects);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    

}
