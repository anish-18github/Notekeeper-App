'use strict';


/**
 * Impoert module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');
const /** {HTMLElement} */ $notePanel = document.querySelector('[ data-note-panel]');


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
         * @param {Object} notebookData - Data representing the new notebook.
         */
        create(notebookData) {
            const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
        },

        /**
         * Read and display a list of notebooks in the UI.
         * 
         * @param {Array<Object>} notebookList - List of notebook data to display.
         */
        read(notebookList) {
            notebookList.forEach((notebookData, index) => {
                const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarList.appendChild($navItem);
            });
        },

        /**
         * Updates the UI to reflect changes in a notebook.
         * 
         * @param {string} notebookId - ID of the notebook for update.
         * @param {Object} notebookData - New data for the notebook.
         */
        update(notebookId, notebookData) {
            const /** {HTMLElement} */ $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** {HTMLElement} */ $newNotebook = NavItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },


        /**
         * Delete a notebook from the UI.
         * 
         * @param {string} notebookId - ID of the notebook to delete.
         */
        delete(notebookId) {
            const /** {HTMLElement} */ $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** HTMLElement | null */ $activeNavIten = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if ($activeNavIten) {
                $activeNavIten.click();
            } else {
                $notePanelTitle.innerHTML = '';
                // $notePanel.innerHTML = '';
            }

            $deletedNotebook.remove();
        }
    }

}