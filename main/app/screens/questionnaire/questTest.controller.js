import utils from '../Utils';
import {Alert} from 'react-native';

exports.questionsData = undefined;
exports.hasPressed = undefined;
exports.hasExit = undefined;

exports.setState = undefined;
exports.state = undefined;
exports.navigateToResults = undefined;
exports.props = undefined;

let progress;
let setTimer;
let timeToReduce;
let score;
let timePerQuest = 0;
let userChoices;
let questionsAmount = 20;
let questionIndex = undefined;
let testResults;
let secondLeft;

const firebase = require("firebase");


exports.initSprint = function (fileData, setState, navigateToResults, props) {

    progress = 1;
    setTimer = 60 * 28;
    timeToReduce = progress / setTimer;
    secondLeft = setTimer;
    this.hasExit = false;
    questionIndex = 0;
    this.hasPressed = false;
    this.props = props;
    score = 0;
    questionsAmount= fileData.length;
    userChoices = new Array(questionsAmount);

    this.questionsData = utils.shuffle(fileData).slice(0, questionsAmount);
    this.setState = setState;
    this.navigateToResults = navigateToResults;

    setTimeout(() => {
        this.setState({progress: 1});
        this._startProgressBar();


    }, 300);

    let shuffledOptions = this._getShuffledOptions();

    testResults = JSON.parse(JSON.stringify(this.questionsData));

    return {
        question: `${(questionIndex + 1)}. ${this.questionsData[questionIndex].quest}`,
        questionFontSize: this.calculateFontSize(this.questionsData[questionIndex].quest),
        a: shuffledOptions.options[0],
        b: shuffledOptions.options[1],
        c: shuffledOptions.options[2],
        d: shuffledOptions.options[3],
        correct: shuffledOptions.correctIndex,
        category: this.questionsData[questionIndex].category,
        img: this.questionsData[questionIndex].img,
        progress: 0,
        timeLeft: "28:00",
        progressColor: 'white',
        score: 0,
        sound: 'volume-up',
        buttonsBackgroundColors: ['transparent', 'transparent', 'transparent', 'transparent']
    };
};


exports.setControllerState = function (state) {
    this.state = state;
};


exports._startProgressBar = function () {
    if (this.hasExit) return;

    setTimeout(() => {
        if (this.hasExit) return;

        if (progress <= 0) {
            this.hasExit = true;
            this.navigateToResults(testResults);
        } else {
            secondLeft -= 1;
            let timeString = (new Date(secondLeft * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0].slice(3, 8);
            this.setState({timeLeft: timeString});

            if (progress < timeToReduce * (setTimer / 5)) {
                this.setState({progressColor: 'red'});
            }

            if (!this.hasPressed)
                this.setState({progress: (progress -= timeToReduce)});
            timePerQuest++;

            this._startProgressBar();
        }
    }, 1000);
};

exports.handleOptionPressed = function (pressedAnswer, refs, state) {
    if (this.hasPressed) {
        return;
    } else {
        this.hasPressed = true;
    }

    this.state = state;
    userChoices[questionIndex] = pressedAnswer;

    testResults[questionIndex].userChoice = pressedAnswer;

    this.colorUserAnswer(refs, state, 1);
    this.showNextQuestion(refs, state, 1000);
};

exports.colorUserAnswer = function (refs, state, timeout) {
    //Color the correct and the wrong answer.
    setTimeout(() => {
        if (this.hasExit) return;

        let pressedAnswer = userChoices[questionIndex];
        if (pressedAnswer == undefined) return;

        let buttonsBackgroundColors = ['transparent', 'transparent', 'transparent', 'transparent'];
        buttonsBackgroundColors[pressedAnswer] = '#fdc05a';
        if (pressedAnswer === state.correct) {
            score++;
        } else {
            score--;
        }
        this.setState({buttonsBackgroundColors: buttonsBackgroundColors, score: score});

    }, (timeout));
};

exports.showPreviousQuestion = function (refs, state, timeout) {

    setTimeout(() => {
        if (state.hasExit) return;

        questionIndex--;
        if (questionIndex === -1) {
            questionIndex = 0;
        }
        let shuffledOptions = this._getShuffledOptions();
        this.setState({
            question: `${(questionIndex + 1)}. ${this.questionsData[questionIndex].quest}`,
            questionFontSize: this.calculateFontSize(this.questionsData[questionIndex].quest),
            a: shuffledOptions.options[0],
            b: shuffledOptions.options[1],
            c: shuffledOptions.options[2],
            d: shuffledOptions.options[3],
            correct: shuffledOptions.correctIndex,
            category: this.questionsData[questionIndex].category,
            img: this.questionsData[questionIndex].img,
            buttonsBackgroundColors: ['transparent', 'transparent', 'transparent', 'transparent']
        });

        this.hasPressed = false;

        try {
            refs.an1.bounceInLeft(500);
            refs.an2.bounceInRight(500);
            refs.an3.bounceInLeft(500);
            // refs.an4.bounceInRight(500);
            refs.an5.bounceInRight(500);
            refs.quest.fadeIn(500);
        } catch (e) {
            //The user has exit
        }

        this.colorUserAnswer(refs, state, 0);

    }, timeout);
};

exports.getRef = function () {
    return firebase.database().ref();
};


exports.showNextQuestion = function (refs, state, timeout) {

    setTimeout(() => {
        if (state.hasExit) return;

        if (questionIndex == questionsAmount - 1) {
            Alert.alert(
                'בטוח סיימת?',
                'תמיד אפשר לשנות את דעתך',
                [
                    {
                        text: 'לא', onPress: () => {
                        this.hasPressed = false;
                    }, style: 'cancel'
                    },
                    {
                        text: 'כן', onPress: () => {

                        this.BChild = this.getRef().child("categories").child("B");
                        this.BChild.push(Date.now());

                        this.navigateToResults(testResults);
                    },
                    },
                ]
            );
            return;
        }

        questionIndex++;
        if (questionIndex === this.questionsData.length) {
            questionIndex = 0;
        }
        let shuffledOptions = this._getShuffledOptions();
        this.setState({
            question: `${(questionIndex + 1)}. ${this.questionsData[questionIndex].quest}`,
            questionFontSize: this.calculateFontSize(this.questionsData[questionIndex].quest),
            a: shuffledOptions.options[0],
            b: shuffledOptions.options[1],
            c: shuffledOptions.options[2],
            d: shuffledOptions.options[3],
            correct: shuffledOptions.correctIndex,
            category: this.questionsData[questionIndex].category,
            img: this.questionsData[questionIndex].img,
            buttonsBackgroundColors: ['transparent', 'transparent', 'transparent', 'transparent'],
            text: ""
        });

        this.colorUserAnswer(refs, state, 0);
        this.hasPressed = false;

        try {
            refs.an1.bounceInLeft(500);
            refs.an2.bounceInRight(500);
            refs.an3.bounceInLeft(500);
            // refs.an4.bounceInRight(500);
            refs.an5.bounceInRight(500);
            refs.quest.fadeIn(500);
        } catch (e) {
            //The user has exit
        }


    }, timeout);
};

exports.calculateFontSize = function (text) {
    return (30 - Math.round(text.length / 7));
};

exports._getShuffledOptions = function () {
    let options = [this.questionsData[questionIndex].a, this.questionsData[questionIndex].b, this.questionsData[questionIndex].c,
        this.questionsData[questionIndex].d];
    let correctIndex = this.questionsData[questionIndex].correct;

    //FIXME:
    // options = utils.shuffle(options);
    //
    // for (let i = 0; i < options.length; i++) {
    //     if (options[i].toString() === correctAns.toString())
    //         correctIndex = i;
    // }

    return {options, correctIndex};
};
