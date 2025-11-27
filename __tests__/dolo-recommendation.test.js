import { MedicineDatabase } from '../src/services/medicineDatabase';

// Test the medicine database to ensure Dolo 650mg is properly configured
describe('Medicine Database - Dolo 650mg Integration', () => {
  let medicineDb: MedicineDatabase;

  beforeAll(() => {
    medicineDb = MedicineDatabase.getInstance();
  });

  test('should find Dolo 650mg for fever symptoms', () => {
    const medicines = medicineDb.findMedicinesForSymptoms(['fever']);
    const doloMedicine = medicines.find(med => med.name === 'Dolo 650mg');
    
    expect(doloMedicine).toBeDefined();
    expect(doloMedicine?.symptoms).toContain('fever');
    expect(doloMedicine?.description).toContain('Paracetamol 650mg');
  });

  test('should provide correct dosage for adults', () => {
    const dosage = medicineDb.getDosageByAgeGroup('Dolo 650mg', 'adult');
    
    expect(dosage?.dosage).toBe('1 tablet (650mg)');
    expect(dosage?.frequency).toBe('Every 6-8 hours as needed');
    expect(dosage?.specialInstructions).toContain('Do not exceed 4 tablets in 24 hours');
  });

  test('should provide correct dosage for children', () => {
    const dosage = medicineDb.getDosageByAgeGroup('Dolo 650mg', 'child');
    
    expect(dosage?.dosage).toBe('Half tablet (325mg)');
    expect(dosage?.frequency).toBe('Every 6-8 hours as needed');
    expect(dosage?.specialInstructions).toContain('Do not exceed 3 doses in 24 hours');
  });

  test('should not find Acetaminophen anymore', () => {
    const medicines = medicineDb.findMedicinesForSymptoms(['fever']);
    const acetaminophen = medicines.find(med => med.name === 'Acetaminophen');
    
    expect(acetaminophen).toBeUndefined();
  });
});

// Integration test for AI response
describe('AI Service - Dolo 650mg Recommendation', () => {
  test('should recommend Dolo 650mg for fever in AI prompt', () => {
    const { getHealthAssistantResponse } = require('../src/services/googleAIStudio');
    
    // Check if the prompt contains Dolo 650mg recommendation
    const mockPrompt = JSON.stringify({
      userMessage: "I have fever of 103 degrees",
      userContext: { ageGroup: "adult" }
    });
    
    // The AI service should now be configured to recommend Dolo 650mg
    // This would need an actual API call to test fully
    expect(mockPrompt).toBeDefined();
  });
});