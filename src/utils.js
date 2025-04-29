import { RESULTS } from "@/results.js";

export const COLORS = ["#76B900", "#AFAFAF", "#FF5F00", "#0082D1", "#000000"];
const SIZES = [50, 100, 150, 200, 250, 300, 350];

export const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const getRandomSize = () => SIZES[Math.floor(Math.random() * SIZES.length)];

export const getSizes = () => {
    let sizeLeft = getRandomSize();
    let factor = Math.floor(Math.random() * 5) + 2;
    while (sizeLeft * factor > 450) {
        factor--;
        if (factor <= 1) {
            sizeLeft = getRandomSize();
            factor = Math.floor(Math.random() * 5) + 2;
        }
    }
    const sizeRight = sizeLeft * factor;
    return [sizeLeft, sizeRight];
};

export const calculateRatio = (left, right) => (right / left);

// log(perceivedRatio) = x * log(actualRatio)
// x = log(perceivedRatio) / log(actualRatio)
export const calculatePerceptionFactor = (answers) => {
    if (!answers.length) return 0;
    let totalExponent = 0;
    for (const answer of answers) {
        const left = answer.sizeLeft;
        const right = answer.sizeRight;
        const actualRatio = calculateRatio(left, right);
        const perceivedAnswer = answer.answer;
        if (actualRatio > 0 && perceivedAnswer > 0) {
            const exponent = Math.log(perceivedAnswer) / Math.log(actualRatio);
            totalExponent += exponent;
        }
    }
    return Math.round((totalExponent / answers.length) * 100) / 100;
};

export const calculateAccuracyShape = (shape) => {
    // Flatten the array of groups and filter answers based on shape
    const answerShape = RESULTS.flat().filter(answer => answer.shape === shape);
    let total = 0;
    if (answerShape.length > 0) {
        total = calculatePerceptionFactor(answerShape);
    }
    return Math.round(total * 100) / 100;
};

export const calculateAccuracyColor = (color) => {
    // Flatten the array of groups and filter answers based on color
    const answerColor = RESULTS.flat().filter(answer => answer.color === color);
    let total = 0;
    if (answerColor.length > 0) {
        total = calculatePerceptionFactor(answerColor);
    }
    return Math.round(total * 100) / 100;
};

export const calculateAccuracyRatio = (ratio) => {
    const answerRatio = RESULTS.flat().filter(answer => calculateRatio(answer.sizeLeft, answer.sizeRight) === ratio);
    let total = 0;
    if (answerRatio.length > 0) {
        total = calculatePerceptionFactor(answerRatio);
    }
    return Math.max(1, Math.round(total * 100) / 100);
};

export const calculateAccuracyGeneral = () => {
    let total = 0;
    for (let i = 0; i < RESULTS.length; i++) {
        const answer = RESULTS[i];
        total += calculatePerceptionFactor(answer);
    }
    return Math.round((total / RESULTS.length) * 100) / 100;
}


