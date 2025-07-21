import { TEvent } from '../types';

const validateInput = (
    event: Omit<TEvent, 'id' | 'category'>,
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (!event.title || event.title.trim() === '') {
        errors.push('Title cannot be empty');
    }
    if (!event.date || !/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
        errors.push('Date must be valid (YYYY-MM-DD format)');
    }
    if (!event.time || !/^\d{2}:\d{2}$/.test(event.time)) {
        errors.push('Time must be valid (HH:MM format)');
    }

    return { isValid: errors.length === 0, errors };
};
export default validateInput;
