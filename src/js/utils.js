'use strict';

/**
 * 
 * @param {Array<HTMLElement>} $elements - An array of DOM element to attach the event listner to.
 * @param {string} eventType - The type of event to listen for (e.g., 'click', 'mouseover').
 * @param {Function} callback - The function to be executed when the event occurs.
 */

const addEventOnElements = function ($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}

/**
 * Generate a greeting message based on the current hour of the day.
 * 
 * @param {number} currentHour - The current hour (0-23) to determine the approproate greeting.
 * @returns {string} A greeting message with a salutation corresponding to the time of day.
 */

const getGreetingMsg = function (currentHour) {
    const /** {string} */ greeting =
        currentHour < 5 ? 'Night' :
            currentHour < 12 ? 'Morning' :
                currentHour < 15 ? ' Noon' :
                    currentHour < 17 ? 'Afternoon' :
                        currentHour < 20 ? 'Evening' :
                            'Night';

    return `Good ${greeting}`;
}

let /** {HTMLElement | undefined} */ $lastActiveNavItem;

/**
 * Activates a navigation item by adding the 'active' class and deactivates the previously active item.
 */
const activeNotebook = function () {
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active'); // this: $navItem
    $lastActiveNavItem = this;  // this: $navItem
}

/**
 * Make a DOM element editable by aetting the 'contenteditable' attribute to true and focusing on it.
 * 
 * @param {HTMLElement} $element - The DOM element to make editable.
 */

const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();

}

/**
 * Generate a unique ID based on the current timestamp.
 * 
 @returns {string} A string representation of the current timestamp.
 */
const generateID = function () {
    return new Date().getTime().toString();
}


/**
 * Finds a notebook in database by its ID.
 * 
 * @param {Object} db - The database containing the notebook.
 * @param {string} notebookId - The ID of the notebook to find.
 * @returns {Object | undefined} The found notebook objectm or undefined if not found.
 */
const findNotebook = function (db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
}



/**
 * Finds the index of a notebook in an arrat of notebook based on it's ID.
 * 
 * @param {Object} db -The object conaining an array of notebooks.
 * @param {string} notebookId - The ID of the notebook to find.
 * @returns {number} The index of the found notebook, or -1 if not found.
 */
const findNotebookIndex = function (db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
}


export {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex
}