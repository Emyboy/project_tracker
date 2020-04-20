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
    static async getAllUsersProjects(req, res){
        const { user_id } = req.params;
        try {
            const userProjects = await Projects.findAll({
                where: { user_id }
            });
            res.status(200).json(userProjects)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /**
     * @description - This gets a single project by id
     * @param {object} req 
     * @param {object} res 
     */
    static async getAUserProject(req, res){
        const { user_id, project_id } = req.params;
        try{
            const project = await Projects.findAll({
                where: {
                    id: project_id,
                    user_id
                }
            });
            if(project.length > 0){
                res.status(200).json({
                    message: 'success',
                    project
                })
            }else {
                res.status(404).json({
                    status: 404,
                    message: 'Projct Not Found',
                })
            }
        } catch (error){
            res.send(error);
        }
    }

    

}
