/**
 * Shared utilities for Hotel Survey Form
 * Eliminates duplicated HTML patterns by generating repeated structures programmatically.
 */

const RATING_OPTIONS = ['Rất tốt', 'Tốt', 'Bình thường', 'Kém', 'Rất kém'];

/**
 * Creates a rating <select> dropdown with standard options.
 * @param {string} id - Element id
 * @param {string} [defaultValue='Tốt'] - The pre-selected option
 * @returns {HTMLSelectElement}
 */
function createRatingSelect(id, defaultValue = 'Tốt') {
    const select = document.createElement('select');
    select.id = id;

    RATING_OPTIONS.forEach(function (optionText) {
        const option = document.createElement('option');
        option.id = id;
        option.textContent = optionText;
        if (optionText === defaultValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
}

/**
 * Creates a difficulty/experience description fieldset.
 * @param {string} legendText - Text for the <legend>
 * @param {string} labelId - id for the label/input
 * @param {string} inputName - name attribute for the input
 * @returns {HTMLFieldSetElement}
 */
function createExperienceFieldset(legendText, labelId, inputName) {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = legendText;
    fieldset.appendChild(legend);

    const section = document.createElement('section');
    const label = document.createElement('label');
    label.id = labelId;
    label.textContent = 'Trải nghiệm của bạn:';
    section.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = labelId;
    input.name = inputName;
    section.appendChild(input);

    fieldset.appendChild(section);
    return fieldset;
}

/**
 * Creates a table row with radio buttons for amenity rating.
 * @param {string} amenityLabel - Display name of the amenity
 * @param {string} radioGroupName - name attribute for the radio group
 * @returns {HTMLTableRowElement}
 */
function createAmenityRow(amenityLabel, radioGroupName) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.textContent = amenityLabel;
    tr.appendChild(th);

    RATING_OPTIONS.forEach(function () {
        const td = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = 'tiện-nghi';
        radio.name = radioGroupName;
        td.appendChild(radio);
        tr.appendChild(td);
    });

    return tr;
}

/**
 * Creates a labeled form field section.
 * @param {object} config
 * @param {string} config.id - id for the label and input
 * @param {string} config.labelText - Text for the label
 * @param {string} config.inputType - input type (text, number, etc.)
 * @param {string} [config.placeholder] - placeholder text
 * @param {string} [config.name] - input name attribute
 * @param {number} [config.min] - min value (for number inputs)
 * @param {number} [config.max] - max value (for number inputs)
 * @param {boolean} [config.required] - whether input is required
 * @returns {HTMLElement}
 */
function createFormField(config) {
    const section = document.createElement('section');

    const label = document.createElement('label');
    label.id = config.id;
    label.setAttribute('for', config.id);
    label.textContent = config.labelText;
    section.appendChild(label);

    const input = document.createElement('input');
    input.type = config.inputType;
    input.id = config.id;
    if (config.name) input.name = config.name;
    if (config.placeholder) input.placeholder = config.placeholder;
    if (config.min !== undefined) input.min = config.min;
    if (config.max !== undefined) input.max = config.max;
    if (config.required) input.required = true;
    section.appendChild(input);

    return section;
}

/**
 * Creates a gender <select> dropdown.
 * @param {string} id - Element id
 * @param {string[]} options - Array of gender options
 * @returns {HTMLElement}
 */
function createGenderSelect(id, options) {
    const section = document.createElement('section');

    const label = document.createElement('label');
    label.id = id;
    label.setAttribute('for', id);
    label.textContent = 'Giới tính của bạn:';
    section.appendChild(label);

    const select = document.createElement('select');
    select.id = id;
    options.forEach(function (optionText) {
        const option = document.createElement('option');
        option.id = id;
        option.textContent = optionText;
        select.appendChild(option);
    });
    section.appendChild(select);

    return section;
}

/**
 * Creates the amenity rating table header row.
 * @returns {HTMLTableRowElement}
 */
function createAmenityHeaderRow() {
    const tr = document.createElement('tr');
    const emptyTd = document.createElement('td');
    tr.appendChild(emptyTd);

    RATING_OPTIONS.forEach(function (label) {
        const td = document.createElement('td');
        td.textContent = label;
        tr.appendChild(td);
    });

    return tr;
}
