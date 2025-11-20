'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Patient {
  patientId: string;
  fullName: string;
  age: number;
  gender: string;
  temperature: number;
  healthIssues: string[];
  feverStatus: { hasActiveFever: boolean; feverType: string | null };
  status: string;
  appointments: Array<{ date: string; time: string; type: string; status: string }>;
  address: { city: string; state: string };
  vitals: {
    temperature: number;
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
  };
}

interface DashboardMetrics {
  totalPatients: number;
  activePatients: number;
  criticalCases: number;
  avgResponseTime: number;
  feverTypeDistribution: Array<{ name: string; value: number }>;
  triageQueue: Array<{ id: string; patient: string; severity: string; waitTime: number }>;
  outcomeMetrics: Array<{ date: string; recovered: number; hospitalized: number; pending: number }>;
  patients: Patient[];
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ClinicianDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [assignedClinician, setAssignedClinician] = useState('');
  const [lastRefresh, setLastRefresh] = useState<string>(new Date().toLocaleTimeString());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchDashboardMetrics = useCallback(async () => {
    try {
      const response = await fetch('/api/clinician/dashboard/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');

      const data = await response.json();
      setMetrics(data);
      setError(null);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardMetrics();
  }, [fetchDashboardMetrics]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchDashboardMetrics();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchDashboardMetrics]);

  const handleViewPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleAssignClinician = () => {
    if (!selectedPatient || !assignedClinician) return;
    console.log('Assigning patient', selectedPatient.patientId, 'to', assignedClinician);
    setOpenDialog(false);
    setAssignedClinician('');
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 39) return '#ff6b6b';
    if (temp > 38.5) return '#ffd43b';
    return '#51cf66';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable':
        return 'success';
      case 'Monitoring':
        return 'warning';
      case 'Critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return '#ff6b6b';
      case 'stable':
        return '#ffd43b';
      case 'decreasing':
        return '#51cf66';
      default:
        return '#999';
    }
  };

  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      mb: 4,
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DashboardIcon sx={{ fontSize: 40, color: '#fff' }} />
            <Box>
              <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Clinician Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
                Last updated: {lastRefresh}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => fetchDashboardMetrics()}
            sx={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              '&:hover': { background: 'rgba(255,255,255,0.3)' },
            }}
          >
            Refresh
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* KPI Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
          <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#667eea' }} />
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Active Patients
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {metrics?.activePatients || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WarningIcon sx={{ fontSize: 40, color: '#ff6b6b' }} />
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Critical Cases
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff6b6b' }}>
                    {metrics?.criticalCases || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#51cf66' }} />
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Avg Response (min)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#51cf66' }}>
                    {metrics?.avgResponseTime || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DashboardIcon sx={{ fontSize: 40, color: '#ffd43b' }} />
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Total Patients
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffd43b' }}>
                    {metrics?.totalPatients || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Tabs */}
        <Paper sx={{ background: 'rgba(255,255,255,0.95)', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="📊 Analytics" />
            <Tab label="🚨 Triage Queue" />
            <Tab label="👥 Patient Monitoring" />
            <Tab label="📈 Clinical Outcomes" />
            <Tab label="⚠️ Outbreak Alerts" />
          </Tabs>
        </Paper>

        {/* Analytics Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)', p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Fever Type Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics?.feverTypeDistribution || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {metrics?.feverTypeDistribution?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#667eea', '#764ba2', '#f093fb', '#4facfe'][index % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card sx={{ background: 'rgba(255,255,255,0.95)', p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Patient Outcomes Trend (30-day)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics?.outcomeMetrics || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="recovered" stroke="#51cf66" strokeWidth={2} />
                  <Line type="monotone" dataKey="hospitalized" stroke="#ff6b6b" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#ffd43b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Box>
        </TabPanel>

        {/* Triage Queue Tab */}
        <TabPanel value={tabValue} index={1}>
          <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                🚨 Triage Queue (Real-time)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead sx={{ background: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell><Typography fontWeight="bold">Queue #</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Patient</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Severity</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Wait Time (min)</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics?.triageQueue?.map((item, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell>#{idx + 1}</TableCell>
                        <TableCell>{item.patient}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.severity}
                            color={
                              item.severity === 'Critical'
                                ? 'error'
                                : item.severity === 'High'
                                  ? 'warning'
                                  : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{item.waitTime}</TableCell>
                        <TableCell>
                          <IconButton size="small" title="View Details">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Patient Monitoring Tab */}
        <TabPanel value={tabValue} index={2}>
          <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                👥 Patient Monitoring (Top 20)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead sx={{ background: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell><Typography fontWeight="bold">Patient ID</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Age</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Fever Type</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Temperature</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">City</Typography></TableCell>
                      <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics?.patients?.slice(0, 20).map((patient) => (
                      <TableRow key={patient.patientId} hover>
                        <TableCell sx={{ fontSize: 'small' }}>{patient.patientId}</TableCell>
                        <TableCell>{patient.fullName}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.feverStatus.feverType || '-'}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              background: getTemperatureColor(patient.vitals.temperature),
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              fontSize: '0.85rem',
                            }}
                          >
                            {patient.vitals.temperature}°C
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={patient.status}
                            color={getStatusColor(patient.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{patient.address.city}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleViewPatientDetails(patient)}
                            title="View Details"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          {patient.feverStatus.hasActiveFever && (
                            <WarningIcon sx={{ color: '#ff6b6b', ml: 1, fontSize: '18px' }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Clinical Outcomes Tab */}
        <TabPanel value={tabValue} index={3}>
          <Card sx={{ background: 'rgba(255,255,255,0.95)', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              📈 Clinical Outcomes Tracking (90-day)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={metrics?.outcomeMetrics || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="recovered"
                  fill="#51cf66"
                  stroke="#51cf66"
                  name="Recovered"
                />
                <Area
                  type="monotone"
                  dataKey="hospitalized"
                  fill="#ff6b6b"
                  stroke="#ff6b6b"
                  name="Hospitalized"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  fill="#ffd43b"
                  stroke="#ffd43b"
                  name="Pending"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabPanel>

        {/* Outbreak Alerts Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {[
              {
                region: 'Mumbai',
                feverType: 'Dengue',
                cases: 156,
                predicted: 210,
                confidence: 0.92,
                trend: 'increasing',
              },
              {
                region: 'Delhi',
                feverType: 'Typhoid',
                cases: 89,
                predicted: 120,
                confidence: 0.85,
                trend: 'stable',
              },
              {
                region: 'Bangalore',
                feverType: 'Malaria',
                cases: 45,
                predicted: 38,
                confidence: 0.88,
                trend: 'decreasing',
              },
            ].map((outbreak, idx) => (
              <Box key={idx}>
                <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {outbreak.region}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {outbreak.feverType}
                        </Typography>
                      </Box>
                      <Chip
                        label={outbreak.trend.toUpperCase()}
                        sx={{
                          background: getTrendColor(outbreak.trend),
                          color: '#fff',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Confidence</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {Math.round(outbreak.confidence * 100)}%
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Current
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {outbreak.cases}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          Predicted
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {outbreak.predicted}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>

        {/* Patient Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Patient Details & Assignment</DialogTitle>
          <DialogContent sx={{ py: 2 }}>
            {selectedPatient && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Patient ID:</strong> {selectedPatient.patientId}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Name:</strong> {selectedPatient.fullName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Age:</strong> {selectedPatient.age} years
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Gender:</strong> {selectedPatient.gender}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Temperature:</strong> {selectedPatient.vitals.temperature}°C
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Heart Rate:</strong> {selectedPatient.vitals.heartRate} bpm
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Health Issues:</strong> {selectedPatient.healthIssues.join(', ')}
                </Typography>

                <TextField
                  select
                  fullWidth
                  label="Assign Clinician"
                  value={assignedClinician}
                  onChange={(e) => setAssignedClinician(e.target.value)}
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="">Select clinician...</MenuItem>
                  <MenuItem value="Dr. Sharma">Dr. Sharma</MenuItem>
                  <MenuItem value="Dr. Patel">Dr. Patel</MenuItem>
                  <MenuItem value="Dr. Singh">Dr. Singh</MenuItem>
                  <MenuItem value="Dr. Kumar">Dr. Kumar</MenuItem>
                </TextField>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handleAssignClinician}
              variant="contained"
              disabled={!assignedClinician}
            >
              Assign Clinician
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
