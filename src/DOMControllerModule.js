import { ProjectController } from "./ProjectControllerModule.js";

export function DOMController () {
    const projectListElement = document.querySelector("#projects");
    const projectController = ProjectController();
    
    //Clear DOM display for project list and re append the title element
    const clearProjectListDisplay = () => {
        projectListElement.textContent = "";
    };

    //clear the dom and display elements from ProjectController.js
    // <h1 id="projects-title"><em>//PROJECTS</em></h1>
    // <h3 class="project"><span class="project-indicator">></span>Test Project</h3>
    const refreshDOMDisplay = () => {
        clearProjectListDisplay();
        const currentProjectArray = projectController.getProjectArray();
        const addNewProjectButton = document.createElement("button");

        currentProjectArray.forEach(proj => {
            const projectDiv = document.createElement("div");
            const projectRemoveButton = document.createElement("button");
            const projectElement = document.createElement("button");
            const projectIndicatorElement = document.createElement("div");

            projectDiv.classList.add("project-container");
            projectRemoveButton.textContent = "X";
            projectRemoveButton.classList.add("project-remove-button");
            projectRemoveButton.style.opacity = "0";
            projectIndicatorElement.textContent = " ";
            projectIndicatorElement.classList.add("project-indicator");
            projectElement.textContent = proj.getName();
            projectElement.classList.add("project");
            projectElement.dataset.uniqueId = proj.getUniqueProjectId();
            projectDiv.appendChild(projectRemoveButton);
            projectDiv.appendChild(projectIndicatorElement);
            projectDiv.appendChild(projectElement);
            projectListElement.appendChild(projectDiv);
            bindProjectEvents(projectElement, projectIndicatorElement, projectRemoveButton);
        });
        
    };


    const addNewProjectButtonClicked = () => {
        projectController.addNewProject("Test Projectasdfasfsdfdsfgsdf");
        projectController.addNewProject("Test Project");
        projectController.addNewProject("Hmm");
        refreshDOMDisplay();
    };

    function bindProjectEvents(projectDiv, projectIndicatorElement, projectRemoveButton) {
        projectDiv.addEventListener("mouseover", () => {
            if(document.activeElement === projectDiv) return;
            projectIndicatorElement.textContent = "> ";
            projectDiv.style.fontStyle = "normal";
        });

        projectDiv.addEventListener("mouseout", () => {
            if(document.activeElement === projectDiv) return;
            projectIndicatorElement.textContent = " ";
            projectDiv.style.fontStyle = "normal";
        });

        projectDiv.addEventListener("focus", () => {
            projectIndicatorElement.textContent = "//";
            projectDiv.style.fontStyle = "italic";
            projectRemoveButton.style.opacity = "1";
        });

        projectDiv.addEventListener("focusout", () => {
            projectIndicatorElement.textContent = " ";
            projectDiv.style.fontStyle = "normal";
            projectRemoveButton.style.opacity = "0";
        });

        projectRemoveButton.addEventListener("click", () => {
            console.log("Clicked!");
            projectController.removeProject(projectDiv.dataset.uniqueId);
            refreshDOMDisplay();
        });

        projectRemoveButton.addEventListener("mouseover", () => {
            if(document.activeElement === projectDiv) return;
            projectRemoveButton.style.opacity = "1";
        });

        projectRemoveButton.addEventListener("mouseout", () => {
            if(document.activeElement === projectDiv) return;
            projectRemoveButton.style.opacity = "0";
        });
    }

    addNewProjectButtonClicked();
    return { refreshDOMDisplay };

}