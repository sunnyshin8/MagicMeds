'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Box,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import AirIcon from '@mui/icons-material/Air';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ClinicianDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Smart Prescription State
  const [prescriptionData, setPrescriptionData] = useState({
    patientId: 'PAT-001',
    age: 42,
    gender: 'Male',
    temperature: 38.9,
    healthIssues: 'High Fever, Cough, Body Pain',
    currentMedicines: '',
    allergies: 'Penicillin',
    previousAdverseReactions: 'Ciprofloxacin - severe nausea',
  });
  const [prescriptionResult, setPrescriptionResult] = useState<any>(null);

  // ICU Risk State
  const [icuRiskData, setIcuRiskData] = useState<{
    temperature: number;
    heartRate: number;
    respiratoryRate: number | undefined; // Optional field
    systolic: number;
    diastolic: number;
    spO2: number;
    ageYears: number;
    healthIssues: string;
    diabetic: boolean;
    hypertensive: boolean;
  }>({
    temperature: 39.8,
    heartRate: 115,
    respiratoryRate: 28,
    systolic: 95,
    diastolic: 65,
    spO2: 92,
    ageYears: 58,
    healthIssues: 'Fever, Pneumonia suspect',
    diabetic: true,
    hypertensive: true,
  });
  const [icuRiskResult, setIcuRiskResult] = useState<any>(null);

  // Medication Interaction State
  const [interactionData, setInteractionData] = useState({
    medications: 'Warfarin 5mg daily, Aspirin 100mg daily, Metformin 500mg twice daily',
    patientAge: 65,
    kidneysFunction: 'mild',
    liverFunction: 'normal',
    allergies: '',
  });
  const [interactionResult, setInteractionResult] = useState<any>(null);

  // Smart Prescription Handler with optimized response time
  const handlePrescriptionSubmit = async () => {
    setLoading(true);
    const startTime = performance.now();
    
    try {
      const payload = {
        patientId: prescriptionData.patientId,
        age: parseInt(prescriptionData.age.toString()),
        gender: prescriptionData.gender,
        temperature: parseFloat(prescriptionData.temperature.toString()),
        healthIssues: prescriptionData.healthIssues.split(',').map(s => s.trim()),
        currentMedicines: prescriptionData.currentMedicines ? prescriptionData.currentMedicines.split(',').map(s => s.trim()) : [],
        allergies: prescriptionData.allergies.split(',').map(s => s.trim()),
        previousAdverseReactions: prescriptionData.previousAdverseReactions.split(',').map(s => s.trim()),
        recentCheckups: [
          { date: '2025-11-14', temperature: 40.2, condition: 'Severe' },
          { date: '2025-11-15', temperature: 39.5, condition: 'Improving' },
        ],
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/clinician/smart-prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Math.round(performance.now() - startTime);
      
      setPrescriptionResult({
        ...data,
        responseTime: `${responseTime}ms`,
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setPrescriptionResult({ error: 'Request timeout - Please try again' });
      } else {
        console.error('Prescription Error:', error);
        setPrescriptionResult({ error: error.message || 'Failed to fetch prescriptions' });
      }
    } finally {
      setLoading(false);
    }
  };

  // ICU Risk Handler with optimized response time
  const handleIcuRiskSubmit = async () => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const payload = {
        temperature: parseFloat(icuRiskData.temperature.toString()),
        heartRate: parseInt(icuRiskData.heartRate.toString()),
        respiratoryRate: icuRiskData.respiratoryRate ? parseInt(icuRiskData.respiratoryRate.toString()) : null,
        bloodPressure: {
          systolic: parseInt(icuRiskData.systolic.toString()),
          diastolic: parseInt(icuRiskData.diastolic.toString()),
        },
        spO2: parseInt(icuRiskData.spO2.toString()),
        ageYears: parseInt(icuRiskData.ageYears.toString()),
        healthIssues: icuRiskData.healthIssues.split(',').map(s => s.trim()),
        diabetic: icuRiskData.diabetic,
        hypertensive: icuRiskData.hypertensive,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/clinician/icu-risk-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Math.round(performance.now() - startTime);

      setIcuRiskResult({
        ...data,
        responseTime: `${responseTime}ms`,
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setIcuRiskResult({ error: 'Request timeout - Please try again' });
      } else {
        console.error('ICU Risk Error:', error);
        setIcuRiskResult({ error: error.message || 'Failed to fetch ICU risk prediction' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Medication Interaction Handler with optimized response time
  const handleInteractionSubmit = async () => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const medsList = interactionData.medications.split(',').map(m => {
        const parts = m.trim().split(' ');
        return {
          name: parts[0],
          dosage: parts.slice(1, -2).join(' '),
          frequency: parts.slice(-2).join(' '),
        };
      });

      const payload = {
        medications: medsList,
        patientAge: parseInt(interactionData.patientAge.toString()),
        kidneysFunction: interactionData.kidneysFunction,
        liverFunction: interactionData.liverFunction,
        allergies: interactionData.allergies ? interactionData.allergies.split(',').map(s => s.trim()) : [],
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/clinician/medication-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Math.round(performance.now() - startTime);

      setInteractionResult({
        ...data,
        responseTime: `${responseTime}ms`,
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setInteractionResult({ error: 'Request timeout - Please try again' });
      } else {
        console.error('Interaction Error:', error);
        setInteractionResult({ error: error.message || 'Failed to fetch medication interactions' });
      }
    } finally {
      setLoading(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'SEVERE':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      case 'WARNING':
      case 'CAUTION':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'NORMAL':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      default:
        return <InfoIcon sx={{ color: 'info.main' }} />;
    }
  };

  const getSeverityColor = (severity: string): 'success' | 'info' | 'warning' | 'error' => {
    switch (severity) {
      case 'CRITICAL':
      case 'SEVERE':
        return 'error';
      case 'HIGH':
      case 'WARNING':
      case 'CAUTION':
        return 'warning';
      case 'NORMAL':
      case 'LOW':
      case 'APPROPRIATE':
        return 'success';
      default:
        return 'info';
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #4facfe 75%, #00f2fe 100%)',
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center'
        }}>
          Clinician Intelligence Dashboard
        </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Smart Prescriptions" id="tab-0" />
          <Tab label="ICU Risk Prediction" id="tab-1" />
          <Tab label="Medication Interactions" id="tab-2" />
          <Tab label="Emergency Response" id="tab-3" />
        </Tabs>
      </Paper>

      {/* TAB 1: Smart Prescriptions */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Card>
              <CardHeader title="Patient Information" />
              <CardContent>
                <TextField
                  fullWidth
                  label="Patient ID"
                  value={prescriptionData.patientId}
                  onChange={e => setPrescriptionData({ ...prescriptionData, patientId: e.target.value })}
                  margin="normal"
                  disabled
                />
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={prescriptionData.age}
                  onChange={e => setPrescriptionData({ ...prescriptionData, age: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Temperature (°C)"
                  type="number"
                  value={prescriptionData.temperature}
                  onChange={e => setPrescriptionData({ ...prescriptionData, temperature: parseFloat(e.target.value) })}
                  margin="normal"
                  inputProps={{ step: "0.1" }}
                />
                <TextField
                  fullWidth
                  label="Health Issues (comma-separated)"
                  value={prescriptionData.healthIssues}
                  onChange={e => setPrescriptionData({ ...prescriptionData, healthIssues: e.target.value })}
                  margin="normal"
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  label="Current Medicines"
                  value={prescriptionData.currentMedicines}
                  onChange={e => setPrescriptionData({ ...prescriptionData, currentMedicines: e.target.value })}
                  margin="normal"
                  multiline
                  rows={2}
                />
                <TextField
                  fullWidth
                  label="Allergies"
                  value={prescriptionData.allergies}
                  onChange={e => setPrescriptionData({ ...prescriptionData, allergies: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Previous Adverse Reactions"
                  value={prescriptionData.previousAdverseReactions}
                  onChange={e => setPrescriptionData({ ...prescriptionData, previousAdverseReactions: e.target.value })}
                  margin="normal"
                  multiline
                  rows={2}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handlePrescriptionSubmit}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Analyzing...' : 'Get Smart Prescription'}
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box>
            {prescriptionResult && (
              <Card>
                <CardHeader title="Prescription Recommendations" />
                <CardContent>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Efficacy Score: {prescriptionResult.efficacyScore}%
                  </Alert>

                  {prescriptionResult.prescriptionRecommendations?.map((rec: any, idx: number) => (
                    <Card key={idx} sx={{ mb: 2, backgroundColor: 'grey.100' }}>
                      <CardContent>
                        <Typography variant="h6">{rec.medicine}</Typography>
                        <Typography color="textSecondary">
                          Dosage: {rec.dosage} | Frequency: {rec.frequency} | Duration: {rec.duration}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                          <Chip label={`₹${rec.cost}`} size="small" />
                          <Chip label={`${rec.effectiveness}% effective`} size="small" color="success" variant="outlined" />
                          <Chip label={`${rec.sideEffectRisk}% risk`} size="small" color={rec.sideEffectRisk > 20 ? 'warning' : 'default'} variant="outlined" />
                        </Box>
                        <Typography variant="body2">{rec.reasoning}</Typography>
                      </CardContent>
                    </Card>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Home Care Plan</Typography>
                  <List>
                    {prescriptionResult.homeCarePlan?.map((tip: string, idx: number) => (
                      <ListItem key={idx}>
                        <CheckCircleIcon sx={{ mr: 2, color: 'success.main' }} />
                        <ListItemText primary={tip} />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Cost Analysis</Typography>
                  <Typography>Total Cost: ₹{prescriptionResult.costAnalysis?.totalCost}</Typography>
                  <Typography>Potential Savings: ₹{prescriptionResult.costAnalysis?.potentialSavings}</Typography>
                  <Typography>Savings: {prescriptionResult.costAnalysis?.percentageSavings}%</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </TabPanel>

      {/* TAB 2: ICU Risk Prediction */}
      <TabPanel value={tabValue} index={1}>
        {/* Home Measurement Guide */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            📱 Home Vital Measurement Guide:
          </Typography>
          <Typography variant="body2" component="div">
            • <strong>Temperature:</strong> Digital thermometer (oral/forehead)<br/>
            • <strong>Heart Rate:</strong> Pulse on wrist or smartphone health app<br/>
            • <strong>Blood Pressure:</strong> Home BP monitor or pharmacy machine<br/>
            • <strong>SpO2:</strong> Pulse oximeter or smartphone camera + flash<br/>
            • <strong>Respiratory Rate:</strong> Count breaths for 1 minute (optional)
          </Typography>
        </Alert>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Card>
              <CardHeader title="Patient Vitals" />
              <CardContent>
                <TextField
                  fullWidth
                  label={<span>Temperature (°C) <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.temperature}
                  onChange={e => setIcuRiskData({ ...icuRiskData, temperature: parseFloat(e.target.value) })}
                  margin="normal"
                  inputProps={{ step: "0.1" }}
                  required
                />
                <TextField
                  fullWidth
                  label={<span>Heart Rate (bpm) <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.heartRate}
                  onChange={e => setIcuRiskData({ ...icuRiskData, heartRate: parseInt(e.target.value) })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Respiratory Rate (breaths/min) (Optional)"
                  type="number"
                  value={icuRiskData.respiratoryRate || ''}
                  onChange={e => setIcuRiskData({ ...icuRiskData, respiratoryRate: e.target.value ? parseInt(e.target.value) : undefined })}
                  margin="normal"
                  helperText="If unknown, you can leave this field empty"
                />
                <TextField
                  fullWidth
                  label={<span>Systolic BP (mmHg) <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.systolic}
                  onChange={e => setIcuRiskData({ ...icuRiskData, systolic: parseInt(e.target.value) })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={<span>Diastolic BP (mmHg) <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.diastolic}
                  onChange={e => setIcuRiskData({ ...icuRiskData, diastolic: parseInt(e.target.value) })}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={<span>SpO2 (%) <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.spO2}
                  onChange={e => setIcuRiskData({ ...icuRiskData, spO2: parseInt(e.target.value) })}
                  margin="normal"
                  required
                  helperText="Use pulse oximeter or smartphone app"
                />
                <TextField
                  fullWidth
                  label={<span>Age <span style={{ color: 'red' }}>*</span></span>}
                  type="number"
                  value={icuRiskData.ageYears}
                  onChange={e => setIcuRiskData({ ...icuRiskData, ageYears: parseInt(e.target.value) })}
                  margin="normal"
                  required
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleIcuRiskSubmit}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Analyzing...' : 'Assess ICU Risk'}
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box>
            {icuRiskResult && (
              <Card>
                <CardHeader title="Risk Assessment" />
                <CardContent>
                  <Alert severity={getSeverityColor(icuRiskResult.riskAssessment?.riskLevel)} icon={getSeverityIcon(icuRiskResult.riskAssessment?.riskLevel)}>
                    Risk Level: {icuRiskResult.riskAssessment?.riskLevel}
                  </Alert>

                  <Box sx={{ my: 2 }}>
                    <Typography variant="body2">Risk Score: {icuRiskResult.riskAssessment?.riskScore?.toFixed(1) || 0}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={icuRiskResult.riskAssessment?.riskScore || 0}
                      sx={{ my: 1 }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ mt: 2 }}>Clinical Assessment Scores</Typography>
                  <Typography variant="body2">NEWS2: {icuRiskResult.clinicalScores?.NEWS2Score || 'N/A'} (National Early Warning Score)</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 1 }}>
                    NEWS2 is designed for home monitoring: 0-4 (Low), 5-6 (Medium), ≥7 (High Risk)
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Prediction</Typography>
                  <Typography variant="body2">ICU Admission Probability: {(icuRiskResult.riskAssessment?.icuAdmissionProbability * 100)?.toFixed(1)}%</Typography>
                  <Typography variant="body2">Mortality Risk: {(icuRiskResult.riskAssessment?.mortalityRisk * 100)?.toFixed(1)}%</Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Recommended Care Level</Typography>
                  <Chip label={icuRiskResult.riskAssessment?.recommendedCareLevel} color={getSeverityColor(icuRiskResult.riskAssessment?.riskLevel)} />

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Red Flag Symptoms</Typography>
                    <List>
                      {icuRiskResult.riskAssessment?.factors?.map((factor: any, idx: number) => (
                        <ListItem key={idx}>
                          {getSeverityIcon(factor.severity)}
                          <ListItemText primary={factor.parameter} secondary={factor.recommendation} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </TabPanel>

      {/* TAB 3: Medication Interactions */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Card>
              <CardHeader title="Medication Check" />
              <CardContent>
                <TextField
                  fullWidth
                  label="Medications (e.g., Warfarin 5mg daily, Aspirin 100mg daily)"
                  value={interactionData.medications}
                  onChange={e => setInteractionData({ ...interactionData, medications: e.target.value })}
                  margin="normal"
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="Patient Age"
                  type="number"
                  value={interactionData.patientAge}
                  onChange={e => setInteractionData({ ...interactionData, patientAge: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Kidney Function"
                  select
                  SelectProps={{}}
                  value={interactionData.kidneysFunction}
                  onChange={e => setInteractionData({ ...interactionData, kidneysFunction: e.target.value })}
                  margin="normal"
                >
                  {['normal', 'mild', 'moderate', 'severe'].map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Liver Function"
                  select
                  SelectProps={{}}
                  value={interactionData.liverFunction}
                  onChange={e => setInteractionData({ ...interactionData, liverFunction: e.target.value })}
                  margin="normal"
                >
                  {['normal', 'mild', 'moderate', 'severe'].map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Allergies"
                  value={interactionData.allergies}
                  onChange={e => setInteractionData({ ...interactionData, allergies: e.target.value })}
                  margin="normal"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleInteractionSubmit}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Checking...' : 'Check Interactions'}
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box>
            {interactionResult && (
              <Card>
                <CardHeader title="Interaction Analysis" />
                <CardContent>
                  <Alert severity={interactionResult.analysis?.overallRisk === 'LOW' ? 'success' : interactionResult.analysis?.overallRisk === 'MODERATE' ? 'warning' : 'error'}>
                    Safety Score: {interactionResult.analysis?.safetyScore}/100 | Risk: {interactionResult.analysis?.overallRisk}
                  </Alert>

                  {interactionResult.analysis?.interactions?.length > 0 ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6">Drug Interactions</Typography>
                      {interactionResult.analysis.interactions.map((inter: any, idx: number) => (
                        <Card key={idx} sx={{ mb: 1, backgroundColor: 'grey.100' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" fontWeight="bold">
                                {inter.medication1} + {inter.medication2}
                              </Typography>
                              <Chip label={inter.severity} size="small" color={getSeverityColor(inter.severity)} />
                            </Box>
                            <Typography variant="caption" display="block">{inter.mechanism}</Typography>
                            <Typography variant="caption" display="block" color="error">Recommendation: {inter.recommendation}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="success" sx={{ mt: 2 }}>No critical drug interactions detected</Alert>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6">Summary</Typography>
                  <Typography variant="body2">{interactionResult.analysis?.summary}</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </TabPanel>

      {/* TAB 4: Emergency Response */}
      <TabPanel value={tabValue} index={3}>
        {icuRiskResult && (icuRiskResult.riskAssessment?.riskLevel === 'CRITICAL' || icuRiskResult.riskAssessment?.riskLevel === 'SEVERE') ? (
          <Card sx={{ 
            border: '2px solid #f44336', 
            backgroundColor: '#ffebee',
            boxShadow: '0 4px 20px rgba(244, 67, 54, 0.3)' 
          }}>
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ErrorIcon sx={{ color: '#f44336', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                    ⚠️ EMERGENCY RESPONSE PROTOCOL
                  </Typography>
                </Box>
              }
              sx={{ backgroundColor: '#ffcdd2' }}
            />
            <CardContent>
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  🚨 IMMEDIATE ACTION REQUIRED - High Risk Detected
                </Typography>
                <Typography>
                  Based on your vitals, you need immediate medical attention. Follow these steps while preparing to visit the hospital.
                </Typography>
              </Alert>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {/* Immediate Actions */}
                <Card sx={{ border: '1px solid #ff9800' }}>
                  <CardHeader 
                    title="🚑 IMMEDIATE ACTIONS (Next 15 minutes)"
                    titleTypographyProps={{ variant: 'h6', color: '#ff9800', fontWeight: 'bold' }}
                  />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><LocalHospitalIcon color="error" /></ListItemIcon>
                        <ListItemText 
                          primary="Call Emergency Services"
                          secondary="Dial 102 (Ambulance) or 108 (Emergency)"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><PersonIcon color="warning" /></ListItemIcon>
                        <ListItemText 
                          primary="Stay with Someone"
                          secondary="Don't stay alone - call family/friends immediately"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AirIcon color="primary" /></ListItemIcon>
                        <ListItemText 
                          primary="Positioning"
                          secondary="Sit upright, loosen tight clothing, ensure fresh air"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><AccessTimeIcon color="secondary" /></ListItemIcon>
                        <ListItemText 
                          primary="Monitor Vitals"
                          secondary="Check pulse, breathing every 5 minutes"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>

                {/* Pre-Hospital Care */}
                <Card sx={{ border: '1px solid #2196f3' }}>
                  <CardHeader 
                    title="🏥 PRE-HOSPITAL CARE"
                    titleTypographyProps={{ variant: 'h6', color: '#2196f3', fontWeight: 'bold' }}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#d32f2f' }}>
                      ⚠️ Only if emergency services will take &gt;30 minutes:
                    </Typography>
                    
                    {/* Conditional recommendations based on vitals */}
                    {icuRiskData.temperature > 38.5 && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2"><strong>High Fever (&gt;38.5°C):</strong></Typography>
                        <Typography variant="body2">
                          • Take Paracetamol 500mg if available<br/>
                          • Apply cool, damp cloth to forehead<br/>
                          • Drink small sips of cool water
                        </Typography>
                      </Alert>
                    )}

                    {icuRiskData.spO2 < 95 && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2"><strong>Low Oxygen (SpO2 &lt; 95%):</strong></Typography>
                        <Typography variant="body2">
                          • Sit upright, don't lie flat<br/>
                          • Deep breathing exercises: 4 counts in, 6 counts out<br/>
                          • Open windows for fresh air
                        </Typography>
                      </Alert>
                    )}

                    {(icuRiskData.systolic > 160 || icuRiskData.systolic < 90) && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2"><strong>Abnormal Blood Pressure:</strong></Typography>
                        <Typography variant="body2">
                          • Sit calmly, avoid sudden movements<br/>
                          • If on BP medication, take as prescribed<br/>
                          • Avoid caffeine or stimulants
                        </Typography>
                      </Alert>
                    )}

                    {icuRiskData.heartRate > 120 && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2"><strong>High Heart Rate (&gt;120 bpm):</strong></Typography>
                        <Typography variant="body2">
                          • Try slow, deep breathing<br/>
                          • Splash cold water on face<br/>
                          • Avoid physical exertion
                        </Typography>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Box>

              {/* Preparation for Hospital */}
              <Card sx={{ mt: 3, border: '1px solid #4caf50' }}>
                <CardHeader 
                  title="📋 PREPARE FOR HOSPITAL VISIT"
                  titleTypographyProps={{ variant: 'h6', color: '#4caf50', fontWeight: 'bold' }}
                />
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>📄 Documents to Bring:</Typography>
                      <Typography variant="body2" component="div">
                        • Government ID<br/>
                        • Health insurance card<br/>
                        • Current medication list<br/>
                        • Recent test reports<br/>
                        • Emergency contact numbers
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>💊 Medical Information:</Typography>
                      <Typography variant="body2" component="div">
                        • Known allergies<br/>
                        • Current medications<br/>
                        • Chronic conditions<br/>
                        • Recent symptoms<br/>
                        • Family medical history
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>🏃‍♀️ What NOT to do:</Typography>
                      <Typography variant="body2" component="div" sx={{ color: '#d32f2f' }}>
                        • Don't drive yourself<br/>
                        • Don't eat or drink<br/>
                        • Don't take unknown medicines<br/>
                        • Don't ignore worsening symptoms<br/>
                        • Don't delay seeking help
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Alert severity="error" sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  📞 EMERGENCY CONTACTS (India):
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                  <Typography variant="body2"><strong>Ambulance:</strong> 102 / 108</Typography>
                  <Typography variant="body2"><strong>Police:</strong> 100</Typography>
                  <Typography variant="body2"><strong>Fire:</strong> 101</Typography>
                </Box>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  🏥 Emergency Response Protocol
                </Typography>
                <Typography>
                  This section will activate when ICU Risk Assessment detects CRITICAL or SEVERE risk levels.
                </Typography>
              </Alert>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                To access the emergency response protocol:
              </Typography>
              <Typography variant="body2" component="div">
                1. Go to the <strong>ICU Risk Prediction</strong> tab<br/>
                2. Fill in the patient vitals with red asterisks (*)<br/>
                3. Click <strong>"Assess ICU Risk"</strong><br/>
                4. If risk level is CRITICAL or SEVERE, this tab will show emergency instructions
              </Typography>
              
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  📞 Always available emergency contacts:
                </Typography>
                <Typography variant="body2">
                  <strong>Ambulance:</strong> 102 / 108<br/>
                  <strong>Police:</strong> 100<br/>
                  <strong>Fire:</strong> 101
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </TabPanel>
    </Container>
    </Box>
  );
}
