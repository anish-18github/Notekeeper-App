'use strict';


/**
 * Impoert module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');


/**
 * The client object manages interaction with user interface to create, read, update and delete notebooks ans notes,
 * It provides function for performing these operations and updating the UI accordingly.
 * 
 * @namespace
 * @property {Object} notebook - Functions for managing notebooks in the UI.
 * @property {Object} note - Functions for managing notes in the UI.
 */
export const client = {

    notebook: {

        /**
         * Creates a new notebook in the UI, based on provided notebook data.
         * 
         * @param {Object} notebokData - Data representing the new notebook.
         */
        create(notebokData) {
            const /** {HTMLElement} */ $navItem = NavItem(notebokData.id, notebokData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebokData.name;
        }
    }

}