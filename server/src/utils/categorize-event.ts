type Category = 'Work' | 'Personal' | 'Other';

const categoryKeywords: Record<Category, string[]> = {
    Work: ['meeting', 'project', 'client', 'deadline', 'presentation'],
    Personal: ['birthday', 'family', 'friend', 'vacation', 'holiday'],
    Other: [],
};

export const categorizeEvent = (title: string, notes?: string): Category => {
    const textToCheck = `${title} ${notes || ''}`.toLowerCase();

    const scores: Record<Category, number> = {
        Work: 0,
        Personal: 0,
        Other: 0,
    };

    for (const category in categoryKeywords) {
        const keywords = categoryKeywords[category as Category];
        for (const keyword of keywords) {
            if (textToCheck.includes(keyword)) {
                scores[category as Category]++;
            }
        }
    }
    
    if (scores.Work === 0 && scores.Personal === 0) {
        scores.Other++;
    }
    //extracted category by score
    const eventCategory = Object.entries(scores).reduce((prev, current) => {
        return current[1] > prev[1] ? current : prev;
    })[0] as Category;

    return eventCategory;
};
