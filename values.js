// Объекты с данными для селектов в виде массивов объектов { name, description, baseConsumption, alarmConsumption, inputs, outputs, index }
const primeBoxes = [
    {
        name: "7453",
        description: "Контроль до 512 радиоканальных извещателей и 300 оповещателей Астра-Прайм через радиорасширители (868 МГц), до 100 безадресных ШС через модули ШС, 4 слота для установки модулей расширения, встроенный источник питания  ",
        baseConsumption:170,
        alarmConsumption:190,
        inputs: ["Шлейф MCU1", "Шлейф MCU2", "Шлейф MCU3", "Шлейф MCU4"],
        outputs: ["Реле MCU1", "Реле MCU2", "Реле MCU3", "ОК MCU4", "ОК MCU5", "ОК MCU6", "Реле БП1", "Реле БП2", "Реле БП3"],
        index:7453
    },
    {
        name: "8652",
        description: "Блок индикации и управления для системы Астра-Прайм, 32 индикатора и кнопок управления, считыватель RFID, встроенный источник питания",
        baseConsumption:70,
        alarmConsumption:95,
        inputs: [],
        outputs: ["Реле БП1", "Реле БП2", "Реле БП3"],
        index:8652
    },
    {
        name: "8452",
        description: "Расширитель беспроводных зон для системы Астра-Прайм, частотный диапазон 868 МГц, обслуживание 70 радиоканальных извещателей и оповещателей, встроенный источник питания",
        baseConsumption:75,
        alarmConsumption:105,
        inputs: [],
        outputs: ["Реле БП1", "Реле БП2", "Реле БП3"],
        index:8452
    },
    {
        name: "8752",
        description: "Блок расширения устройств для системы Астра-Прайм, 4 слота для установки модулей расширения, возможность установки модуля источника питания",
        baseConsumption:75,
        alarmConsumption:105,
        inputs: [],
        outputs: [],
        index:8752
    }
];

const primeModules = [
    {
        name:"Не используется",
        description:"Модуль отсутствует" ,
        baseConsumption:0,
        alarmConsumption:0,
        inputs: [],
        outputs: [],
        index:9999
    },
    {
        name:"8552",
        description:"Модуль интерфейса RS-485 для установки в блоки системы Астра-Прайм, организация кольцевого RS-485" ,
        baseConsumption:11,
        alarmConsumption:13,
        inputs: [],
        outputs: [],
        index:8552
    },
    {
        name:"8352",
        description:"Модуль расширения шлейфов сигнализации для установки в блоки системы Астра-Прайм, 6 программируемых ШС" ,
        baseConsumption:133,
        alarmConsumption:142,
        inputs: ["Шлейф 1", "Шлейф 2", "Шлейф 3", "Шлейф 4", "Шлейф 5", "Шлейф 6"],
        outputs: [],
        index:8352
    },
    {
        name:"8452-06",
        description:"Модуль радиорасширителя для установки в блоки системы Астра-Прайм, частотный диапазон 868 МГц" ,
        baseConsumption:15,
        alarmConsumption:17,
        inputs: [],
        outputs: [],
        index:845206
    },
    {
        name:"8252",
        description:" " ,
        baseConsumption:17,
        alarmConsumption:20,
        inputs: [],
        outputs: [],
        index:8252
    },
    // {
    //     name:"7052-01",
    //     description:"Модуль источника электропитания для установки в корпус блоков Астра-Прайм, выход 12 В/ 2,5 А с защитой от КЗ и перегрузки" ,
    //     baseConsumption:25,
    //     alarmConsumption:30,
    //     inputs: [],
    //     outputs: ["Реле БП1", "Реле БП2", "Реле БП3"],
    //     index:705201
    // }
];

const imagesMap = {
    7453: "7453.jpg",
    8652: "8652.jpg",
    8452: "8452.jpg",
    8752: "8752.jpg"
};

const devicesList = {
    chosenBox: 7453, // переменная, меняющаяся в зависимости от выбранного корпуса
    firstModule: 9999, // первый модуль в корпусе
    secondModule: 9999, // второй модуль в корпусе
    thirdModule: 9999, // третий модуль в корпусе
    fourthModule: 9999 // четвертый модуль в корпусе
}


export { primeBoxes, primeModules, imagesMap, devicesList };