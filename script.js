// Объявляем переменные, определяем контейнеры
import { primeBoxes, primeModules, imagesMap, devicesList } from "/values.js";

const boxContainer = document.getElementById('boxContainer');
const dynamicBoxImage = document.getElementById('dynamicBoxImage');
const dongleCheckBoxLabel = document.getElementById('dongleCheckBoxLabel');
const dongleCheckBox = document.getElementById('dongleCheckBox');
const extenderCheckBoxLabel = document.getElementById('extenderCheckBoxLabel');
const extenderCheckBox = document.getElementById('extenderCheckBox');
const modulesContainer = document.getElementById('modulesContainer');
const totalConsumptionSpan = document.getElementById('totalConsumption');
const totalAlarmSpan = document.getElementById('totalAlarmConsumption');
const batteryValueSpan = document.getElementById('batteryValue');

// Добавляем выбор базового бокса:
if (boxContainer.children.length===0) {
    const {wrapper, select}= createSelect(true);
    boxContainer.appendChild(wrapper);
    updateChosenDevice(devicesList.chosenBox, select.options[select.selectedIndex].value, primeBoxes);
    updateSpecialCheckboxVisibility(select.options[select.selectedIndex].value);
    updateTotals()
}

// Добавляем выбор модулей:
const moduleMappings = [
    { property: devicesList.firstModule, maxLength: 0 },
    { property: devicesList.secondModule, maxLength: 1 },
    { property: devicesList.thirdModule, maxLength: 2 },
    { property: devicesList.fourthModule, maxLength: 3 }
];

for (const { property, maxLength } of moduleMappings) {
    if (modulesContainer.children.length === maxLength) {
        const { wrapper, select } = createSelect(false);
        updateChosenDevice(property, select.options[select.selectedIndex].value, primeModules);
        modulesContainer.appendChild(wrapper);
        updateTotals();
    }
}
// if (modulesContainer.children.length===0) {
//     const {wrapper, select}= createSelect(false);
//     updateChosenDevice(devicesList.firstModule, select.options[select.selectedIndex].value, primeModules);
//     modulesContainer.appendChild(wrapper);
//     updateTotals();
// }
// if (modulesContainer.children.length===1) {
//     const {wrapper, select}= createSelect(false);
//     updateChosenDevice(devicesList.secondModule, select.options[select.selectedIndex].value, primeModules);
//     modulesContainer.appendChild(wrapper);
//     updateTotals();
// }
// if (modulesContainer.children.length===2) {
//     const {wrapper, select}= createSelect(false);
//     updateChosenDevice(devicesList.thirdModule, select.options[select.selectedIndex].value, primeModules);
//     modulesContainer.appendChild(wrapper);
//     updateTotals();
// }
// if (modulesContainer.children.length===3) {
//     const {wrapper, select}= createSelect(false);
//     updateChosenDevice(devicesList.fourthModule, select.options[select.selectedIndex].value, primeModules);
//     modulesContainer.appendChild(wrapper);
//     updateTotals();
// }

// Функция создания дропа с отображением значения
function createSelect(isBox) {
    const wrapper= document.createElement('div');
    wrapper.className='select-wrapper';

    const select= document.createElement('select');

    const dataSource= isBox ? primeBoxes: primeModules;

    // Заполняем селект данными из массива объектов
    dataSource.forEach(item => {
        const option= document.createElement('option');
        option.textContent = item.name;
        option.value = item.index; // используем index как значение
        option.setAttribute('data-description', item.description);
        option.setAttribute('data-baseConsumption', item.baseConsumption);
        option.setAttribute('data-alarmConsumption', item.alarmConsumption);
        option.setAttribute('data-inputs', item.inputs);
        option.setAttribute('data-outputs', item.outputs);
        select.appendChild(option);
    });

    // Элемент для отображения описания устройства
    const descriptionDisplay= document.createElement('div');
    descriptionDisplay.className ='description-display';
    descriptionDisplay.textContent = select.options[select.selectedIndex].dataset.description;

    // Элемент для отображения базового потребления устройства
    const valueDisplay= document.createElement('span');
    valueDisplay.className ='value-display';
    valueDisplay.textContent = "Потребление в дежурном/тревожном режиме "+ select.options[select.selectedIndex].dataset.baseconsumption + "-" + select.options[select.selectedIndex].dataset.alarmconsumption + "мАч" ;

    // Элемент для отображения всех входов и выходов устройства
    const IOsDisplay= document.createElement('div');
    IOsDisplay.className ='IOs-display';


    // Рисуем строки для всех входов и выходов устройства
    if (isBox) {
        updateIos(devicesList.chosenBox, primeBoxes, IOsDisplay )
    } else {
        updateIos(select.options[select.selectedIndex].value, primeModules, IOsDisplay )
    }

    // Обработчик изменения селекта
    select.addEventListener('change', () => {
        // Меняем текстовые описания
        descriptionDisplay.textContent = select.options[select.selectedIndex].dataset.description;
        valueDisplay.textContent = "Потребление в дежурном/тревожном режиме "+ select.options[select.selectedIndex].dataset.baseconsumption + "-" + select.options[select.selectedIndex].dataset.alarmconsumption + "мАч" ;

        // Обновляем переменную и изображение
        if (boxContainer.firstChild===wrapper) {
            updateChosenDevice("chosenBox", select.options[select.selectedIndex].value);
            updateImage(devicesList.chosenBox, dynamicBoxImage)
            updateIos(devicesList.chosenBox, primeBoxes, IOsDisplay)
            updateSpecialCheckboxVisibility(select.options[select.selectedIndex].value);
        } else {
            updateIos(select.options[select.selectedIndex].value, primeModules, IOsDisplay )
        }

        updateTotals()
    });

    wrapper.appendChild(select);
    wrapper.appendChild(descriptionDisplay);
    wrapper.appendChild(valueDisplay);
    wrapper.appendChild(IOsDisplay);

    return {wrapper, select, descriptionDisplay, valueDisplay, IOsDisplay};
}

// Обновление переменной в зависимости от выбранного устройства
function updateChosenDevice(varName, value) {
    devicesList[varName] = value;
}

// Обновление изображения в зависимости от выбранного устройства
function updateImage(deviceIndex, imageVariable) {
    const image = imagesMap[+deviceIndex];
    imageVariable.src = image ? image : '';
}

// Обновление видимости специального чекбокса в зависимости от прибора
function updateSpecialCheckboxVisibility(deviceIndex) {
    const firstSelectWrapper= boxContainer.children[0];
    if (!firstSelectWrapper) return;

    const firstSelect = firstSelectWrapper.querySelector('select');

    if (firstSelect && deviceIndex ==="7453") {
        dongleCheckBoxLabel.style.display='block';
        extenderCheckBox.checked=false;
        extenderCheckBoxLabel.style.display='none';
    } else if (firstSelect && (deviceIndex ==="8452" || deviceIndex ==="8752")) {
        dongleCheckBox.checked=false;
        dongleCheckBoxLabel.style.display='none';
        extenderCheckBoxLabel.style.display='block';
    } else {
        extenderCheckBox.checked=false;
        extenderCheckBoxLabel.style.display='none';
        dongleCheckBox.checked=false;
        dongleCheckBoxLabel.style.display='none';
    }
}

// Обновление входов - выходов доступных для настройки при выборе устройства
// function updateIos(deviceType, options, targetContainer) {
//     const foundElement = options.find(box => box.index === +deviceType);
//     targetContainer.innerHTML=""
//
//     if (foundElement) {
//         const { inputs, outputs } = foundElement;
//
//         if (inputs.length!==0 || outputs.length!==0) {
//             // Создаем заголовок для таблицы входов - выходов
//             const headerRow = document.createElement('div');
//             headerRow.className = "header-row"
//
//             // Создаем блоки заголовков таблицы
//             const discHeader = document.createElement('div');
//             const nameHeader = document.createElement('div');
//             const consumptionHeader = document.createElement('div');
//             const alarmHeader = document.createElement('div');
//             const qtyHeader = document.createElement('div');
//
//             // Добавляем их в строку
//             headerRow.appendChild(discHeader);
//             discHeader.innerText = "Вход/выход прибора"
//             discHeader.className = "headerSpan"
//             headerRow.appendChild(nameHeader);
//             nameHeader.innerText = "Название устройства"
//             nameHeader.className = "headerSpan"
//             headerRow.appendChild(consumptionHeader);
//             consumptionHeader.innerText = "Потребление Деж. мАч"
//             consumptionHeader.className = "headerSpan"
//             headerRow.appendChild(alarmHeader);
//             alarmHeader.innerText = "Потребление Авар. мАч"
//             alarmHeader.className = "headerSpan"
//             headerRow.appendChild(qtyHeader);
//             qtyHeader.innerText = "Количество"
//             qtyHeader.className = "headerSpan"
//
//             targetContainer.appendChild(headerRow)
//         }
//
//         inputs.forEach(input => addNewRow(targetContainer, input));
//         outputs.forEach(output => addNewRow(targetContainer, output));
//     }
// }
function updateIos(deviceType, options, targetContainer) {
    const foundElement = options.find(box => box.index === +deviceType);
    targetContainer.innerHTML = "";

    if (!foundElement || (foundElement.inputs.length === 0 && foundElement.outputs.length === 0)) {
        return;
    }

    const { inputs, outputs } = foundElement;

    // Создаем заголовок для таблицы
    const headerRow = document.createElement('div');
    headerRow.className = "header-row";

    // Массив данных для заголовков
    const headers = [
        { text: "Вход/выход прибора", className: "headerSpan" },
        { text: "Название устройства", className: "headerSpan" },
        { text: "Потребление Деж. мАч", className: "headerSpan" },
        { text: "Потребление Авар. мАч", className: "headerSpan" },
        { text: "Количество", className: "headerSpan" }
    ];

    // Создаем и добавляем заголовки
    headers.forEach(header => {
        const headerElement = document.createElement('div');
        headerElement.className = header.className;
        headerElement.textContent = header.text;
        headerRow.appendChild(headerElement);
    });

    targetContainer.appendChild(headerRow);

    // Добавляем строки с данными
    inputs.forEach(input => addNewRow(targetContainer, input));
    outputs.forEach(output => addNewRow(targetContainer, output));
}

// Функция добавления новой строки стороннего устройства
function addNewRow(rowsContainer, stringName) {
    // Создаем контейнер для всей строки
    const rowDiv = document.createElement('div');
    rowDiv.className = 'input-row';

    // Создаем заголовок для всей строки
    const rowTitle = document.createElement('div');
    rowTitle.textContent = stringName;
    rowTitle.className = 'row-title';
    rowDiv.appendChild(rowTitle);

    // Функция для создания блока с меткой и input
    function createLabeledInput(labelText, inputType, placeholder, defaultValue, min= null, max= null) {
        const container = document.createElement('div');
        container.className = 'input-container';

        // const label = document.createElement('div');
        // label.textContent = labelText;
        // label.className = 'input-label';

        const input = document.createElement('input');
        input.type = inputType;
        input.placeholder = placeholder;
        input.defaultValue = defaultValue
        if (inputType === "number") input.className = 'input-number';
        if (inputType === "text") input.className = 'input-text';

        if (min !== null) input.min = min;
        if (max !== null) input.max = max;

        // container.appendChild(label);
        container.appendChild(input);

        return container;
    }

    // Создаем блоки с метками и инпутами
    const nameField = createLabeledInput('Устройство', 'text', 'Устройство', "Название устройства");
    const consumptionField = createLabeledInput('Потребление Деж. мАч', 'number', 'Потребление Деж. мАч', 0);
    const alarmField = createLabeledInput('Потребление Авар. мАч', 'number', 'Потребление Авар. мАч', 0);
    const qtyField = createLabeledInput('Количество', 'number', 'Количество', 0, 0, 100);

    // Добавляем их в строку
    rowDiv.appendChild(nameField);
    rowDiv.appendChild(consumptionField);
    rowDiv.appendChild(alarmField);
    rowDiv.appendChild(qtyField);

    // Добавляем строку в контейнер
    rowsContainer.appendChild(rowDiv);

    // Добавляем обработчики событий для обновления сумм при изменении значений
    consumptionField.addEventListener('input', updateTotals);
    alarmField.addEventListener('input', updateTotals);
    qtyField.addEventListener('input', updateTotals);
}

// Получение данных выбранного селекта для функции пересчета
function getSelectedOptionData(select) {
    const selectedOption = select.options[select.selectedIndex];
    const name = selectedOption.name;
    const description = selectedOption.getAttribute('data-description');
    const baseConsumption = +selectedOption.getAttribute('data-baseConsumption');
    const alarmConsumption = +selectedOption.getAttribute('data-alarmConsumption');
    const inputs = selectedOption.getAttribute('data-inputs');
    const outputs = selectedOption.getAttribute('data-outputs');

    return { name, description, baseConsumption, alarmConsumption, inputs, outputs };
}

// Функция пересчета данных
function updateTotals() {
    let totalConsumption = 0;
    let totalAlarmConsumption = 0;
    let batteryValue;
    // Суммируем потребление всех селектов
    const selects= document.querySelectorAll('select');
    selects.forEach((sel,index) => {
        const dataObj=getSelectedOptionData(sel);
        totalConsumption+= dataObj.baseConsumption;
        totalAlarmConsumption+= dataObj.alarmConsumption;
    });

    // Собираем все чекбоксы и следим за изменениями в них
    const checkboxes = checkboxesContainer.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateTotals();
        });
    });

    // Суммируем данные из чекбоксов
    checkboxes.forEach(cb => {
        if (cb.checked) {
            totalConsumption+= parseInt(cb.getAttribute('data-consumption'),10);
            totalAlarmConsumption+= parseInt(cb.getAttribute('data-alarm'),10);
        }
    });

    // Суммируем данные из строк, введенных вручную
    const rows = document.querySelectorAll('.input-row');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const consumptionVal = (parseInt(inputs[1].value) * parseInt(inputs[3].value)) || 0;
        const alarmVal = (parseInt(inputs[2].value) * parseInt(inputs[3].value)) || 0;
        totalConsumption+= consumptionVal;
        totalAlarmConsumption+= alarmVal;
    });

    batteryValue = ((totalConsumption*24) + (totalAlarmConsumption)) /1000;
    // Обновляем отображения:
    totalConsumptionSpan.textContent= totalConsumption;
    totalAlarmSpan.textContent= totalAlarmConsumption;
    batteryValueSpan.textContent = batteryValue.toString();
}


