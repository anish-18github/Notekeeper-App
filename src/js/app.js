'use strict';

/**
 * Module import
 */

import {
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable
} from "./utils.js";

import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";

/**
 * Toggle sidebar in small screen
 */

const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});

/**
 * Initialize tooltip behavior for all DOM elements with 'data-tooltip' attribute.
 */

const /** {Array<HTMLElement>} */ $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));


/**
 * Show greeting message on homepage
 */

const /** {HTMLElement} */ $greetingElem = document.querySelector('[data-greeting]');
const /** number */ currentHour = new Date().getHours();
$greetingElem.textContent = getGreetingMsg(currentHour);

/**
 * Show current date on homepage
 */

const /** {HTMLElement} */ $currentDateElem = document.querySelector('[data-current-date]');
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ');

/** 
 * Notebook create field 
 */

const/** {HTMLElemet} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const/** {HTMLElemet} */ $addNotebookBtn = document.querySelector('[data-add-notebook]');


const showNotebookField = function () {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>

    <div class="state-layer"></div>
    `;

    $sidebarList.appendChild($navItem);

    const /** {HTMLElement} */ $navItemField = $navItem.querySelector('[data-notebook-field]');

    //Active new crated notebook and deactive the last one.
    activeNotebook.call($navItem);

    //Make notebook field content editable and focus
    makeElemEditable($navItemField);

    //When user press 'Enter' then create boebook.
    $navItemField.addEventListener('keydown', createNotebook)
}

$addNotebookBtn.addEventListener('click', showNotebookField);

/**
 * Create new notebook.
 * Creates a new notebook when the 'Enter' key is pressed while editing a notebook name field.
 * The new notebook is stored in the database.
 * 
 * @param {KeyboardEvent} event - The keyboard event that triggered notebook creation.
 */

const createNotebook = function (event) {
    if (event.key === 'Enter') {

        // Strore new created notebook in database.
        const /** {Object} */notebookData = db.post.notebook(this.textContent || 'Untitled'); // this: navItemField
        this.parentElement.remove();

        // Render navItem
        client.notebook.create(notebookData);
    }
}

/**
 * Render the existing notebook list by retriving data from the database and passing it to the client.
 */

const renderExistedNotebook = function () {
    const /** {Array} */ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
    
}

renderExistedNotebook();