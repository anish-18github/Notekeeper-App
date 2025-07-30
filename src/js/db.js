'use strict';

/**
 * Import module
 */
import { generateID, findNotebook, findNotebookIndex } from "./utils.js";




//DB Object
let /** {Object} */ notekeeperDB = {};

/** 
 * Initialization a local database. I the data exists in local storage, it is loaded.
 * otherwise, a new empty database structure is cerated and stored.
 */
const initDB = function () {
    const /** {JSON | undefined} */ db = localStorage.getItem('notekeeperDB');

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

initDB();

/**
 * Reads and loads the localstorage data in to the global variable 'notekeeperDB
 */
const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}

/**
 * Writes the current state of the global variable 'notekeeperDB' to local storage.
 */
const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}


/**
 * Collection of functions for performing CRUD operations on database.
 * The database state is managed using global variabls and local storage.
 * 
 * @namespace
 * @property {Object} get = Functions for retriving data from the database.
 * @property {Object} post - Functions for adding data to the database.
 * @property {Object} update - Functions for updating data in the database.
 * @property {Object} delete - Functions for deleting data from the database.
 */


export const db = {


    post: {

        /**
         * Add a new notebook to the database.
         * 
         * @function
         * @param {string} name  - The name of the new notebook.
         * @returns {Object} - The newly created notebook object.
         */

        notebook(name) {
            readDB();

            const /** {Object} */ notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);

            writeDB();

            return notebookData;
        }
    },

    get: {


        notebook() {
            readDB();

            return notekeeperDB.notebooks;
        }
    },

    update: {

        /**
         * Updates the name a notebook in the database.
         * 
         * @function
         * @param {string} notebookId - The ID of the notebook to update.
         * @param {string} name - The new name for the notebook.
         * @returns {Object} The updated notebook object.
         */
        notebook(notebookId, name) {
            readDB();

            const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;

            writeDB();

            return notebook;

        }
    },

    delete: {

        /**
         * Delete the notebook from the database.
         * 
         * @function
         * @param {string} notebookId - The ID of the notebook to delete.
         */
        notebook(notebookId) {
            readDB();

            const /** {number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        }
    }
}