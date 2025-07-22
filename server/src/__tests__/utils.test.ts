import { categorizeEvent } from "../utils/categorize-event";


describe('Event Categorization', () => {
  // Test Work category
  describe('Work Category', () => {
    test('should categorize as Work when title contains work-related keyword', () => {
      expect(categorizeEvent('Team meeting tomorrow')).toBe('Work');
      expect(categorizeEvent('Client project discussion')).toBe('Work');
      expect(categorizeEvent('Presentation preparation')).toBe('Work');
    });

    test('should categorize as Work when notes contain work-related keyword', () => {
      expect(categorizeEvent('Team sync', 'Discussing project deadline')).toBe('Work');
    });
  });

  // Test Personal category
  describe('Personal Category', () => {
    test('should categorize as Personal when title contains personal-related keyword', () => {
      expect(categorizeEvent('Birthday party')).toBe('Personal');
      expect(categorizeEvent('Family dinner')).toBe('Personal');
      expect(categorizeEvent('Friend meetup')).toBe('Personal');
    });

    test('should categorize as Personal when notes contain personal-related keyword', () => {
      expect(categorizeEvent('Weekend plans', 'Going on vacation with family')).toBe('Personal');
    });
  });

  // Test Other category (default)
  describe('Other Category', () => {
    test('should categorize as Other when no keywords match', () => {
      expect(categorizeEvent('Random event')).toBe('Other');
      expect(categorizeEvent('Something to do', 'No specific keywords here')).toBe('Other');
    });
  });

  // Test case sensitivity
  describe('Case Sensitivity', () => {
    test('should be case insensitive', () => {
      expect(categorizeEvent('MEETING with team')).toBe('Work');
      expect(categorizeEvent('Birthday PARTY')).toBe('Personal');
    });
  });
});
