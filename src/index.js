import "./styles.css";
import "./fonts.css";
import { ProjectController } from "./ProjectControllerModule.js";
import { DOMController } from "./DOMControllerModule.js";

const testDOMController = DOMController();
testDOMController.refreshDOMDisplay();