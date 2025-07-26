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


export {
    addEventOnElements
}