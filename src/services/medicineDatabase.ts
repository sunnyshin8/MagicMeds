import * as XLSX from 'xlsx';
import * as path from 'path';

// Define interfaces for our data structures
export interface MedicineDetail {
  name: string;
  description: string;
  symptoms: string[];
  sideEffects: string[];
  contraindications: string[];
  dosageForm: string;
}

export interface AgeReference {
  medicine: string;
  ageGroup: string;
  dosage: string;
  frequency: string;
  specialInstructions?: string;
}

class MedicineDatabase {
  private static instance: MedicineDatabase | null = null;
  private medicineDetails: MedicineDetail[] = [];
  private ageReferences: AgeReference[] = [];
  private lastLoadTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.loadData();
  }

  public static getInstance(): MedicineDatabase {
    if (!MedicineDatabase.instance) {
      MedicineDatabase.instance = new MedicineDatabase();
    }
    return MedicineDatabase.instance;
  }

  private loadData() {
    // Check if cache is still valid
    const now = Date.now();
    if (this.lastLoadTime && now - this.lastLoadTime < this.CACHE_DURATION) {
      return;
    }
    this.lastLoadTime = now;
    try {
      // Read medicine details from embedded data for now
      // TODO: Replace with actual Excel file reading once data is ready
      this.medicineDetails = [
        {
          name: "Acetaminophen",
          description: "Pain reliever and fever reducer",
          symptoms: ["fever", "headache", "muscle aches", "pain"],
          sideEffects: ["liver damage (at high doses)", "mild nausea"],
          contraindications: ["liver disease", "alcohol abuse"],
          dosageForm: "tablet, liquid"
        },
        {
          name: "Ibuprofen",
          description: "NSAID pain reliever, fever reducer, and anti-inflammatory",
          symptoms: ["pain", "fever", "inflammation", "headache", "arthritis"],
          sideEffects: ["stomach upset", "heartburn", "dizziness"],
          contraindications: ["stomach ulcers", "bleeding disorders", "kidney disease"],
          dosageForm: "tablet, capsule, liquid"
        },
        {
          name: "Diphenhydramine",
          description: "Antihistamine for allergy relief and sleep aid",
          symptoms: ["allergies", "hay fever", "common cold", "insomnia"],
          sideEffects: ["drowsiness", "dry mouth", "blurred vision"],
          contraindications: ["glaucoma", "enlarged prostate"],
          dosageForm: "tablet, liquid, capsule"
        }
      ];

      // Add age references data
      this.ageReferences = [
        {
          medicine: "Acetaminophen",
          ageGroup: "adults",
          dosage: "325-650 mg",
          frequency: "Every 4-6 hours as needed",
          specialInstructions: "Do not exceed 3000 mg in 24 hours"
        },
        {
          medicine: "Acetaminophen",
          ageGroup: "children 6-11",
          dosage: "10-15 mg/kg",
          frequency: "Every 4-6 hours as needed",
          specialInstructions: "Do not exceed 5 doses in 24 hours"
        },
        {
          medicine: "Ibuprofen",
          ageGroup: "adults",
          dosage: "200-400 mg",
          frequency: "Every 4-6 hours",
          specialInstructions: "Take with food"
        },
        {
          medicine: "Ibuprofen",
          ageGroup: "children 6-11",
          dosage: "5-10 mg/kg",
          frequency: "Every 6-8 hours",
          specialInstructions: "Take with food, max 4 doses per day"
        },
        {
          medicine: "Diphenhydramine",
          ageGroup: "adults",
          dosage: "25-50 mg",
          frequency: "Every 4-6 hours",
          specialInstructions: "May cause drowsiness"
        }
      ];

    } catch (error) {
      console.error('Error loading medicine database:', error);
      throw new Error('Failed to load medicine database');
    }
  }

  findMedicinesForSymptoms(symptoms: string[]): MedicineDetail[] {
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
    return this.medicineDetails.filter(medicine => 
      medicine.symptoms.some(symptom => 
        normalizedSymptoms.some(s => symptom.toLowerCase().includes(s))
      )
    );
  }

  getDosageByAgeGroup(medicineName: string, ageGroup: string): AgeReference | undefined {
    return this.ageReferences.find(ref => 
      ref.medicine.toLowerCase() === medicineName.toLowerCase() &&
      ref.ageGroup.toLowerCase() === ageGroup.toLowerCase()
    );
  }

  getAllSymptoms(): string[] {
    const symptomsSet = new Set<string>();
    this.medicineDetails.forEach(medicine => {
      medicine.symptoms.forEach(symptom => {
        symptomsSet.add(symptom.toLowerCase().trim());
      });
    });
    return Array.from(symptomsSet);
  }
}

// Export the MedicineDatabase class
export { MedicineDatabase };