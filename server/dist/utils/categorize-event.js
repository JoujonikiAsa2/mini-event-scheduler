"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEvent = void 0;
const categoryKeywords = {
    Work: ['meeting', 'project', 'client', 'deadline', 'presentation'],
    Personal: ['birthday', 'family', 'friend', 'vacation', 'holiday'],
    Other: [],
};
const categorizeEvent = (title, notes) => {
    const textToCheck = `${title} ${notes || ''}`.toLowerCase();
    const scores = {
        Work: 0,
        Personal: 0,
        Other: 0,
    };
    for (const category in categoryKeywords) {
        const keywords = categoryKeywords[category];
        for (const keyword of keywords) {
            if (textToCheck.includes(keyword)) {
                scores[category]++;
            }
        }
    }
    if (scores.Work === 0 && scores.Personal === 0) {
        scores.Other++;
    }
    //extracted category by score
    const eventCategory = Object.entries(scores).reduce((prev, current) => {
        return current[1] > prev[1] ? current : prev;
    })[0];
    return eventCategory;
};
exports.categorizeEvent = categorizeEvent;
