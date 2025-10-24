import "./styles.css";
import "./fonts.css";

function Project(name) {
    const taskArray = [];
    const uniqueProjectId = crypto.randomUUID();

    const addNewTask = (name,date) => {
        taskArray.push(Task(name,date));
    };
    
    const removeTask = (taskIdToRemove) => {
        const indexToRemove = taskArray.findIndex(task => task.getUniqueTaskId() === taskIdToRemove);
        if(indexToRemove != -1) {
            console.log(`Removing index ${indexToRemove} of taskArray`);
            taskArray.splice(indexToRemove, 1);
        }
        else {
            console.log("No such Id found in task array!");
        }
    };

    const getTaskArray = () => { return taskArray; };

    const getUniqueProjectId = () => { return uniqueProjectId; };

    const getName = () => { return name; };

    const printTaskArray = () => {
        if(taskArray.length === 0) console.log("Task array is empty!");
        taskArray.forEach(task => {
            console.log(task.getName());
            console.log(task.getUniqueTaskId());
        });
    };

    return { addNewTask, getTaskArray, printTaskArray, removeTask, getUniqueProjectId, getName };
}


function Task(name,date) {
    const uniqueTaskId = crypto.randomUUID();
    
    const getUniqueTaskId = () => { return uniqueTaskId; };
    const getName = () => { return name; };
    const getDate = () => { return date; };
    return { getUniqueTaskId, getName, getDate };
}

function ProjectController() {
    const projectArray = [];

    const addNewProject = (name) => {
        projectArray.push(Project(name));
    };

    const removeProject = (projectIdToRemove) => {
        const indexToRemove = projectArray.findIndex(proj => proj.getUniqueProjectId() === projectIdToRemove);
        if(indexToRemove != -1) {
            console.log(`Removing index ${indexToRemove} of project array.`);
            projectArray.splice(indexToRemove, 1);
        }
        else {
            console.log("No such ID found in project array!");
        }
    };

    const printProjectArray = () => {
        if(projectArray.length === 0) console.log("Project array is empty!");
        projectArray.forEach(proj => {
            console.log(proj.getName());
            console.log(proj.getUniqueProjectId());
        });
    };

    const getProjectArray = () => { return projectArray; };

    return { addNewProject, removeProject, getProjectArray, printProjectArray };
}

const testProjController = ProjectController();
testProjController.printProjectArray();
testProjController.addNewProject("test project");
testProjController.printProjectArray();
const testProjControllerArray = testProjController.getProjectArray();
testProjControllerArray[0].addNewTask("test task", "0/0/0");
testProjControllerArray[0].printTaskArray();

const testProjArray = testProjControllerArray[0].getTaskArray();
testProjControllerArray[0].removeTask(testProjArray[0].getUniqueTaskId());
testProjControllerArray[0].printTaskArray();
testProjController.printProjectArray();
testProjController.removeProject(testProjControllerArray[0].getUniqueProjectId());
testProjController.printProjectArray();
