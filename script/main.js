let scoreEl = document.getElementById("score");
let livesEl = document.getElementById("lives");
let score = 0;
let lives = 10;

let popUpContent = document.getElementById("popup_content");
let popUpWindow = document.getElementById("popup_window");
let popUpClose = document.getElementById("popup_close");
let popUpBottom;

let dragNdropObject;
let dropTarget;
let dragFrom;

let currentQuestionId = -1;   
let currentQuestionType = 0;
let currentQuestionButton;

let questionType1 = document.getElementById("question_type_1");
let questionType2 = document.getElementById("question_type_2");
let questionType3 = document.getElementById("question_type_3");
let questionType4 = document.getElementById("question_type_4");
let questionType5 = document.getElementById("question_type_5");

// Массив с вопросами
let allQuestions = [
    {
        type: 0, 
        price: 100,
        text: 'На какой свет можно ехать?',
        image: null,
        answers: ['зеленый', 'красный', 'желтый', 'синий'],
        correctAnswer: [0], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 0, 
        price: 100,
        text: 'Сколько у него зубов?',
        image: "content/dog.jpg",
        answers: ['Тридцать два', 'Сорок два', 'Шестьдесят четыре', 'Два миллиона восемьсот двадцать один',],
        correctAnswer: [1], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 0, 
        price: 100,
        text: 'Сколько у него зубов?',
        image: "content/dog.jpg",
        answers: ['Тридцать два', 'Сорок два', 'Шестьдесят четыре', 'Два миллиона восемьсот двадцать один',],
        correctAnswer: [1], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 1, 
        price: 150,
        text: 'Выберите имена ученых:',
        image: null,
        answers: ['Игорь Юрьев', 'Вячеслав Казанцев', 'Иван', 'Денис Саликов', 'Люся Генриховна'],
        correctAnswer: [2,3], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 1, 
        price: 150,
        text: 'Выберите имена ученых:',
        image: null,
        answers: ['Игорь Юрьев', 'Вячеслав Казанцев', 'Иван', 'Денис Саликов', 'Люся Генриховна', 'Алишер Батут'],
        correctAnswer: [2,3], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 1, 
        price: 150,
        text: 'Выберите имена ученых:',
        image: null,
        answers: ['Игорь Юрьев', 'Вячеслав Казанцев', 'Иван', 'Денис Саликов', 'Люся Генриховна', 'Алишер Батут'],
        correctAnswer: [2,3], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 2, 
        price: 200,
        text: 'Вставте пропущенные слова:',
        textDd: "Семен Морозов родился в |. Он разработал свою первую штуку в | году. "+
                    "Благодаря этой разработке, все | мира могут спать спокойно",
        image: null,
        answers: [["Узбекистане", "Ираке", "России"],
                ["1950","3572","824"],
                ["коты","жители","суслики"]],
        correctAnswer: [2,0,1], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 2, 
        price: 200,
        text: 'Вставте пропущенные слова:',
        textDd: "Семен Морозов родился в |. Он разработал свою первую штуку в | году. "+
                    "Благодаря этой разработке, все | мира могут спать спокойно",
        image: null,
        answers: [["Узбекистане", "Ираке", "России"],
                ["1950","3572","824"],
                ["коты","жители","суслики"]],
        correctAnswer: [2,0,1], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 2, 
        price: 200,
        text: 'Вставте пропущенные слова:',
        textDd: "Семен Морозов родился в |. Он разработал свою первую штуку в | году. "+
                    "Благодаря этой разработке, все | мира могут спать спокойно",
        image: null,
        answers: [["Узбекистане", "Ираке", "России"],
                ["1950","3572","824"],
                ["коты","жители","суслики"]],
        correctAnswer: [2,0,1], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
    {
        type: 3, 
        price: 250,
        text: 'Установите соответствие между названием насадки и изображением.',
        image: "content/dragndrop/type_3_0/",
        answers: ["Кольца Рашига","Кольца с крестообразной перегородкой","Кольца Палля","Кольца Лессинга"],
        correctAnswer: [1,2,3,0], // id правильного ответа из поля answers
        answered: null, // какой вариант ответа выбрал пользователь
    },
]; 

// Массив путей для состояния вопроса
let questionsStates = [
    "./content/incorrect.svg",
    "./content/correct.svg"
    ];

// Главный скрипт. Запускается как только полностью загрузится страница
document.addEventListener('DOMContentLoaded', function(){ 

    // Сообщение о загрузке скрипта
    console.log('Script is loaded');

    // Каждой кнопке присваиваем обработчик события Click, 
    // который будет открывать соответствующее модальное окно
    let questionsBtn = document.getElementsByClassName('question');
    for (question of questionsBtn){
        question.addEventListener('click', function(e){
            currentQuestionButton = e.srcElement;
            popUpQuestionOpen(this);
        });
    }
    // DEBUGGING
    
});

// Обработчик события, если нажали на кнопку "Ответить". Собираем ответы, проверяем их, записываем
function submitHandler(e){
    e.preventDefault();

    let answers = getUserAnswers(e);

    if (userHasAnswers(answers)){
        console.log("USER ANSWERS: " + `${answers}`);
        userAnswersHandler(answers);
        popUpQuestionClose();
    }else{
        showErrors(e);
    }
    
}

// Получаем ответы пользователя, в нужном нам формате
function getUserAnswers(el){
    let arr = [];
    let textAnsw = [];
    let trueAnsw = allQuestions[currentQuestionId].answers;

    if (currentQuestionType == 3) {
        let dragZones = el.target.getElementsByClassName("question_type_3_answer_drop_zone");

        for (el of dragZones){
            console.log(el.children[0]);
            if (el.children[0] != null) {
                textAnsw.push(el.children[0].innerHTML);
            }
        }
        
        for (let i = 0; i < trueAnsw.length; i++) arr.push(trueAnsw.indexOf(textAnsw[i]));
        for (let i = 0; i < arr.length; i++) if (arr[i] == -1) arr.pop();
        

        console.log(arr);
        

    }else if (currentQuestionType == 2){

        for (el of el.target.getElementsByClassName("custom-dropdown-input-placeholder")) 
            textAnsw.push(el.innerHTML);

        for (let i = 0; i < trueAnsw.length; i++){
            for (let j = 0; j < trueAnsw[i].length; j++){
                if (textAnsw[i] == trueAnsw[i][j]) arr.push(j);
            }
        }
        
    }else {
        for (el of el.target) if(el.checked) arr.push(parseInt(el.value));
    }

    return arr;
}

// Проверка, ответил ли пользователь НА САМОМ ДЕЛЕ
function userHasAnswers(answers){
    //return allQuestions[currentQuestionId].correctAnswer.length === answers.length;

    if (currentQuestionType == 0 || currentQuestionType == 1 ) {
        return answers.length > 0;
    }else if (currentQuestionType == 2 || currentQuestionType == 3){
        return allQuestions[currentQuestionId].correctAnswer.length === answers.length;
    }
}

function showErrors(e){

    let elToErrors = [];

    if (currentQuestionType == 0 || currentQuestionType == 1 ) {
        for (let i = 0; i < allQuestions[currentQuestionId].answers.length; i++)
                elToErrors.push(document.getElementById(`question_type_${currentQuestionType}_answer_${i}`));
    }else if (currentQuestionType == 2){
        for (let i = 0; i < allQuestions[currentQuestionId].answers.length; i++){
            txtAnswer = document.getElementById(`question_type_${currentQuestionType}_answer_${i}`).childNodes[0].innerHTML
            if (txtAnswer == "Выберите ответ")
                elToErrors.push(document.getElementById(`question_type_${currentQuestionType}_answer_${i}`));
        }
    } else if(currentQuestionType == 3){
        let dragZones = e.target.getElementsByClassName("question_type_3_answer_drop_zone");

        for (el of dragZones) elToErrors.push(el);
    }

    for (el of elToErrors){
        el.setAttribute("class",`${el.className} un_answered`);
    }

    document.getElementById("question_text").innerHTML = 
        allQuestions[currentQuestionId].text +" Выберите ответ!";
}

// Функция установки состояния вопроса: Пройден(1), Не пройден(0).
function setStateToQuestion(el, state) {

    let stateImgDiv = document.createElement("div");
    stateImgDiv.setAttribute("class", "state_marker")

    let stateImg = document.createElement("img");
    stateImg.setAttribute("src", questionsStates[state]);
    stateImgDiv.appendChild(stateImg);

    el.appendChild(stateImgDiv);
}

// Функция открытия модального окна
function popUpQuestionOpen(question){

    // Подготовка к созданию окна. Удаляем тело прошлого модального окна, если есть
    deletePopUpMain()

    currentQuestionId = question.className.split(" ")[1].replace("id", "");
    currentQuestionType = allQuestions[currentQuestionId].type;

    constuctPopUp();

    popUpWindow.setAttribute("class", "popup unclosed");
}

// Функция закрытия модального окна
function popUpQuestionClose(){
    popUpWindow.setAttribute("class", "popup closed");  
}

// Функция конструирования блока с вопросом
function constuctPopUp(){
    let question = allQuestions[currentQuestionId];

    console.log(`CONSTRUCT QUESTION TYPE ${question.type} AND ID ${currentQuestionId}`);

    // Создаем тело модального окна
    popUpWindow.appendChild(createPopUpMain(question));

    popUpBottom = document.getElementById("popup_bottom");
}

// Функция, указывающая пройден ли конкретный вопрос
function questionIsPassed(question){

    if(question.answered != null) return true;
    return false;
    
}

// Функция, обрабатывающая ответ пользователя
function userAnswersHandler(userAnswers){
    let currentQuestion = allQuestions[currentQuestionId];

    // Записываем ответ пользователя в соответствующее поле объекта вопроса
    currentQuestion.answered = userAnswers;
    // Проверяем, верный ли был ответ, ставим соответсвующее изображение на кнопку
    isCorrect = answerIsCorrect(currentQuestion, userAnswers);
    console.log(`IS CORRECT? ${isCorrect}`);

    if (isCorrect) {
        setStateToQuestion(currentQuestionButton, 1);
        score += currentQuestion.price;
    }
    else {
        setStateToQuestion(currentQuestionButton, 0);
    }

    scoreEl.innerHTML = `${score}`;
    lives--;
    livesEl.innerHTML = `${lives}`;
}

// Функция, возвращающее, верный ли был ответ
function answerIsCorrect(question, userAnswers){
    corrects = question.correctAnswer;
    userAnswers = userAnswers;

    if (corrects.toString() === userAnswers.toString()) return true;

    return false;
}

// Функция обработчик события "Взяли объект"
function dragNdropHandler(e){
    console.log("DRAG-N-DROP");
    dragFrom = e.target.parentNode;
    console.log(`FROM ${dragFrom}`);
    
    // Создание точной копии объекта
    dragNdropObject = e.target;
    // e.target.parentNode.appendChild(clone);
    // e.target.remove();
    
    // даём элементу абсолютную позицию, да бы перемещать без нарушения верстки
    // и перемещаем его на позицию курсора
    dragNdropObject.style.position = 'absolute';
    dragMoveAt(e, dragNdropObject);

    // 3, перемещать по экрану
    document.onmousemove = function(e) {
        dragMoveAt(e, dragNdropObject);
    }

    // 4. отследить окончание переноса
    dragNdropObject.onmouseup = function() {
        document.onmousemove = null;
        dragNdropObject.onmouseup = null;
        dragNdropObject.remove();

        // Отслеживаем, где отпустили объект
        document.addEventListener('mouseover', (e) => dropObject(e), {once: true});
        
    }
}

// Функция перемещения объекта и позиционирования его по центру
function dragMoveAt(e, el) {
    el.style.left = e.pageX - el.offsetWidth / 2 + 'px';
    el.style.top = e.pageY - el.offsetHeight / 2 + 'px';
}

// Функция обработчик, отслеживаем где отпустили объект и добавляем его в соотв. drop_zone
function dropObject(e){
    console.log("Функция обработчик, отслеживаем где отпустили объект и добавляем его в соотв. drop_zone");
    if (e.target.tagName == "IMG"){
        console.log("ITS IMG");
        let parents = e.target.parentNode.parentNode;
        dropTarget = parents.getElementsByClassName("question_type_3_answer_drop_zone")[0];

    }else if(e.target.tagName == "DIV" && e.target.className == "question_type_3_answer") {
        console.log("ITS WHITE SPACE");
        dropTarget = e.target.getElementsByClassName("question_type_3_answer_drop_zone")[0];

    }else if(e.target.tagName == "DIV" && 
            (e.target.className == "question_type_3_answer_drop_zone" || 
            e.target.className == "question_type_3_answer_drop_zone un_answered"))
        {
        console.log("ITS DROP SPACE");
        dropTarget = e.target;

    }else if (e.target.tagName == "DIV" && e.target.className == "question_type_3_drag"){
        // e.target.parentNode
        console.log("ITS ANOTHER DROP");
        dropTarget = e.target.parentNode;
    }else{
        // e.target.parentNode
        console.log(e.target);
        console.log("ITS SOMETHERE");
        console.log(dragFrom);
        dropTarget = dragFrom;
    }

    console.log(dropTarget);
    console.log(dropTarget.children.length > 0);

    // Если таргет, куда перетаскиваем объект, уже что то есть, 
    // перемещаем содержимое на место, откуда взяли текущий объект 
    if (dropTarget.children.length > 0) dragFrom.appendChild(dropTarget.children[0]);
    

    dragNdropObject.addEventListener('mousedown', (e) => dragNdropHandler(e));
    dragNdropObject.style = null;
    dropTarget.appendChild(dragNdropObject);

}

// Функция проверки, и очистки дубликатов ответов в drop_zones
function checkDragDuplicates(answers){

    dropZones = answers.getElementsByClassName(`question_type_${currentQuestionType}_answer_drop_zone`);
    
    for (let i = 0; i < dropZones.length; i++){
        let child = dropZones[i].children[0];
        if (child != null){
            if (child.innerHTML == dragNdropObject.innerHTML) {
                console.log("Дубликат удален");
                child.remove();
            }
        }
    }
}
















































// for(let question of questions){
//     veryEasyQuestion1.addEventListener('click', function(){
//         console.log("arr");
//         PopUpWindow.classList.remove('closed');
//         PopUpWindow.classList.add('open');
//         console.log(question)
        
//         let test = document.querySelector('#question_number_1');
//         let testAnswers = document.querySelector('#answers_buttons1');
//         let Povtor = document.querySelector('#check_button_2');
//         let Dalee = document.querySelector('#check_button_3')

//         Povtor.classList = ('disabled_button');
//         Povtor.addEventListener('click' , function(){
//             window.location.reload();
//         });

//         Dalee.classList = ('disabled_button');



//         // rr

//         let i = 1;
//     // Рендер вопросов из списка
//         for (let question of questions){
//             let div = document.createElement('div');
//             test.appendChild(div);
//             let p = document.createElement('p');
//             p.innerHTML = question.text;
//             div.appendChild(p);
//             let form = document.createElement('form');
//             testAnswers.appendChild(form);
//             form.dataset.right = question.right;


//         let j = 0;
//         let a = 0;
//             for (let answer of question.answers) {
//                 let divInp = document.createElement('div');
//                 divInp.classList = ('answer_div');
//                 divInp.setAttribute('id', 'answer_div');
//                 form.appendChild(divInp);
//                 let input = document.createElement('input');
//                 input.type = 'radio';
//                 input.name = i;
//                 input.dataset.answerNum = j++;
//                 divInp.appendChild(input);
//                 let answ = document.createElement('p');
//                 answ.innerHTML = answer;
//                 divInp.appendChild(answ);
//             };
//         };

//         let chekBtn = document.querySelector('#check_button_1');
//             chekBtn.addEventListener('click', function(){
//                 let forms = document.querySelectorAll('#answers_buttons1 form');
//                 for (let form of forms){
//                     form.classList.remove('correct');
//                     form.classList.remove('incorrect');
//                     let inputs = form.querySelectorAll('input');
//                     for (let input of inputs){
//                         if (input.checked){
//                             let disButton = document.querySelector('#check_button_1');
//                             if (input.dataset.answerNum == form.dataset.right){
//                                 arrPoints.push(100)
//                                 let imgCorrect = document.createElement('img');
//                                 imgCorrect.src = './content/correct.svg';
//                                 correctMarkerPlace.appendChild(imgCorrect);
//                                 pointsOfAttemptPlace.innerHTML = pointsOfAttempt - 1;


//                                 disButton.classList.remove('disabled_button');
//                                 Povtor.classList.add('disabled_button');
//                                 Dalee.classList.add('disabled_button');

//                                 form.children[0].classList.add('correct');
//                                 for(let i = 1; i < 4; i++){
//                                     form.children[i].classList.add('incorrect2');
//                                 }
//                                 for(let i = 0; i < 4; i++){
//                                     form.children[i].children[0].disabled = true;
//                                 }
//                             }else{
//                                 let imgCorrect = document.createElement('img');
//                                 imgCorrect.src = './content/incorrect.svg';
//                                 correctMarkerPlace.appendChild(imgCorrect);
//                                 pointsOfAttemptPlace.innerHTML = pointsOfAttempt - 1;

//                                 disButton.classList.remove('disabled_button');
//                                 Povtor.classList.add('disabled_button');
//                                 Dalee.classList.add('disabled_button');
//                                 let wrAns = input.dataset.answerNum
                                
//                                 form.children[wrAns].classList.add('incorrect');

//                                 for(let i = 0; i < 4; i++){
//                                     form.children[i].children[0].disabled = true;
//                                 }
//                             };
//                         break;
//                     };
//                 };
//             };
//         });
//         let arrPoints = [];

//         let pointsOfCorrect= document.querySelector('#points_of_correct_1');
//         chekBtn.addEventListener('click', function(){
//             add = function(arr) {
//                 return arr.reduce((a, b) => a + b, 0);
//             };
            
//             let sumPoints = add(arrPoints);
//             pointsOfCorrect.innerHTML = sumPoints;
//         });
//     });

// };



// closePopUpButton.addEventListener('click', function(){
//     console.log("closed");
//     PopUpWindow.classList.add('closed');
//     PopUpWindow.classList.remove('open');

// });




