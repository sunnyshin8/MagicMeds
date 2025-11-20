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
  Divider,
  Alert,
  Typography,
  Tab,
  Tabs,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

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
  const [icuRiskData, setIcuRiskData] = useState({
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

  // Smart Prescription Handler
  const handlePrescriptionSubmit = async () => {
    setLoading(true);
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

      const response = await fetch('/api/clinician/smart-prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setPrescriptionResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ICU Risk Handler
  const handleIcuRiskSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        temperature: parseFloat(icuRiskData.temperature.toString()),
        heartRate: parseInt(icuRiskData.heartRate.toString()),
        respiratoryRate: parseInt(icuRiskData.respiratoryRate.toString()),
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

      const response = await fetch('/api/clinician/icu-risk-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setIcuRiskResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Medication Interaction Handler
  const handleInteractionSubmit = async () => {
    setLoading(true);
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

      const response = await fetch('/api/clinician/medication-interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setInteractionResult(data);
    } catch (error) {
      console.error('Error:', error);
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

  const getSeverityColor = (severity: string): 'error' | 'warning' | 'success' | 'info' => {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Clinician Intelligence Dashboard
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Smart Prescriptions" id="tab-0" />
          <Tab label="ICU Risk Prediction" id="tab-1" />
          <Tab label="Medication Interactions" id="tab-2" />
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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Card>
              <CardHeader title="Patient Vitals" />
              <CardContent>
                <TextField
                  fullWidth
                  label="Temperature (°C)"
                  type="number"
                  value={icuRiskData.temperature}
                  onChange={e => setIcuRiskData({ ...icuRiskData, temperature: parseFloat(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Heart Rate (bpm)"
                  type="number"
                  value={icuRiskData.heartRate}
                  onChange={e => setIcuRiskData({ ...icuRiskData, heartRate: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Respiratory Rate (breaths/min)"
                  type="number"
                  value={icuRiskData.respiratoryRate}
                  onChange={e => setIcuRiskData({ ...icuRiskData, respiratoryRate: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Systolic BP (mmHg)"
                  type="number"
                  value={icuRiskData.systolic}
                  onChange={e => setIcuRiskData({ ...icuRiskData, systolic: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Diastolic BP (mmHg)"
                  type="number"
                  value={icuRiskData.diastolic}
                  onChange={e => setIcuRiskData({ ...icuRiskData, diastolic: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="SpO2 (%)"
                  type="number"
                  value={icuRiskData.spO2}
                  onChange={e => setIcuRiskData({ ...icuRiskData, spO2: parseInt(e.target.value) })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={icuRiskData.ageYears}
                  onChange={e => setIcuRiskData({ ...icuRiskData, ageYears: parseInt(e.target.value) })}
                  margin="normal"
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

                  <Typography variant="h6" sx={{ mt: 2 }}>Clinical Scores</Typography>
                  <Typography variant="body2">qSOFA: {icuRiskResult.clinicalScores?.qSOFAScore}</Typography>
                  <Typography variant="body2">SOFA: {icuRiskResult.clinicalScores?.SOFAScore}</Typography>

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
                  value={interactionData.kidneysFunction}
                  onChange={e => setInteractionData({ ...interactionData, kidneysFunction: e.target.value })}
                  margin="normal"
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="mild">Mild</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="severe">Severe</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Liver Function"
                  select
                  value={interactionData.liverFunction}
                  onChange={e => setInteractionData({ ...interactionData, liverFunction: e.target.value })}
                  margin="normal"
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="mild">Mild</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="severe">Severe</MenuItem>
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
    </Container>
  );
}
