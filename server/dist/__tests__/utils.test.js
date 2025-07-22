"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categorize_event_1 = require("../utils/categorize-event");
describe('Event Categorization', () => {
    // Test Work category
    describe('Work Category', () => {
        test('should categorize as Work when title contains work-related keyword', () => {
            expect((0, categorize_event_1.categorizeEvent)('Team meeting tomorrow')).toBe('Work');
            expect((0, categorize_event_1.categorizeEvent)('Client project discussion')).toBe('Work');
            expect((0, categorize_event_1.categorizeEvent)('Presentation preparation')).toBe('Work');
        });
        test('should categorize as Work when notes contain work-related keyword', () => {
            expect((0, categorize_event_1.categorizeEvent)('Team sync', 'Discussing project deadline')).toBe('Work');
        });
    });
    // Test Personal category
    describe('Personal Category', () => {
        test('should categorize as Personal when title contains personal-related keyword', () => {
            expect((0, categorize_event_1.categorizeEvent)('Birthday party')).toBe('Personal');
            expect((0, categorize_event_1.categorizeEvent)('Family dinner')).toBe('Personal');
            expect((0, categorize_event_1.categorizeEvent)('Friend meetup')).toBe('Personal');
        });
        test('should categorize as Personal when notes contain personal-related keyword', () => {
            expect((0, categorize_event_1.categorizeEvent)('Weekend plans', 'Going on vacation with family')).toBe('Personal');
        });
    });
    // Test Other category (default)
    describe('Other Category', () => {
        test('should categorize as Other when no keywords match', () => {
            expect((0, categorize_event_1.categorizeEvent)('Random event')).toBe('Other');
            expect((0, categorize_event_1.categorizeEvent)('Something to do', 'No specific keywords here')).toBe('Other');
        });
    });
    // Test case sensitivity
    describe('Case Sensitivity', () => {
        test('should be case insensitive', () => {
            expect((0, categorize_event_1.categorizeEvent)('MEETING with team')).toBe('Work');
            expect((0, categorize_event_1.categorizeEvent)('Birthday PARTY')).toBe('Personal');
        });
    });
});
