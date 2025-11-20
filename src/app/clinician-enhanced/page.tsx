'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
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
  Badge,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function EnhancedClinicianDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [alertCount, setAlertCount] = useState(0);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);

      // Fetch enhanced metrics with AI analysis
      const metricsResponse = await fetch('/api/clinician/dashboard/metrics-enhanced?includeAI=true');
      if (!metricsResponse.ok) throw new Error('Failed to fetch metrics');
      const metricsData = await metricsResponse.json();
      setMetrics(metricsData);

      // Fetch real-time data
      const realtimeResponse = await fetch('/api/clinician/realtime');
      if (!realtimeResponse.ok) throw new Error('Failed to fetch real-time data');
      const realtimeData = await realtimeResponse.json();
      setRealTimeData(realtimeData);
      setAlertCount(realtimeData.activeAlerts?.length || 0);

      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    if (autoRefresh) {
      const interval = setInterval(fetchDashboardData, 15000); // 15 seconds for real-time feel
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchDashboardData]);

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
            🏥 Enhanced Clinical Dashboard
          </Typography>
          <Typography variant="body2">
            Last updated: {lastUpdate} | AI-Powered Real-time Analytics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={`${alertCount} Active Alerts`}>
            <Badge badgeContent={alertCount} color="error">
              <NotificationsIcon sx={{ color: 'white', fontSize: 32 }} />
            </Badge>
          </Tooltip>
          <IconButton
            onClick={() => setAutoRefresh(!autoRefresh)}
            sx={{ color: autoRefresh ? '#4caf50' : '#ff9800', background: 'rgba(255,255,255,0.1)' }}
          >
            {autoRefresh ? <AutorenewIcon /> : <RefreshIcon />}
          </IconButton>
          <IconButton
            onClick={fetchDashboardData}
            sx={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            disabled={loading}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Active Alerts */}
      {realTimeData?.activeAlerts && realTimeData.activeAlerts.length > 0 && (
        <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {realTimeData.activeAlerts.slice(0, 2).map((alert: any) => (
            <Alert key={alert.id} severity={alert.severity} sx={{ background: 'rgba(255,255,255,0.95)' }}>
              {alert.message}
            </Alert>
          ))}
        </Box>
      )}

      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#667eea' }} />
              <Box>
                <Typography color="textSecondary" variant="body2">Active Patients</Typography>
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
                <Typography color="textSecondary" variant="body2">Critical Cases</Typography>
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
              <TrendingDownIcon sx={{ fontSize: 40, color: '#51cf66' }} />
              <Box>
                <Typography color="textSecondary" variant="body2">Recovery Rate</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#51cf66' }}>
                  {realTimeData?.clinicalOutcomes?.[realTimeData.clinicalOutcomes.length - 1]?.recoveryRate || 0}%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#ffd43b' }} />
              <Box>
                <Typography color="textSecondary" variant="body2">Bed Occupancy</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffd43b' }}>
                  {realTimeData?.performanceMetrics?.bedOccupancy || 0}%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Paper sx={{ background: 'rgba(255,255,255,0.95)', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="📊 Analytics & AI Insights" />
          <Tab label="🚨 Clinical Outcomes" />
          <Tab label="👥 Triage Queue" />
          <Tab label="⚡ Performance Metrics" />
          <Tab label="🤖 AI Recommendations" />
        </Tabs>
      </Paper>

      {/* Analytics Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
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
                    {metrics?.feverTypeDistribution?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                AI Fever Analysis
              </Typography>
              {metrics?.aiAnalysis?.feverAnalysis ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Analysis:</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {metrics.aiAnalysis.feverAnalysis.analysis}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={`Severity: ${metrics.aiAnalysis.feverAnalysis.severity.toUpperCase()}`}
                      color={
                        metrics.aiAnalysis.feverAnalysis.severity === 'critical' ? 'error' : 
                        metrics.aiAnalysis.feverAnalysis.severity === 'high' ? 'warning' : 'default'
                      }
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={metrics.aiAnalysis.feverAnalysis.confidence * 100}
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="body2" sx={{ minWidth: '60px' }}>
                      {Math.round(metrics.aiAnalysis.feverAnalysis.confidence * 100)}%
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Loading AI analysis...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Clinical Outcomes Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              90-Day Clinical Outcomes Trend
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={realTimeData?.clinicalOutcomes || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="recovered" fill="#51cf66" stroke="#51cf66" name="Recovered" />
                <Area type="monotone" dataKey="hospitalized" fill="#ff6b6b" stroke="#ff6b6b" name="Hospitalized" />
                <Area type="monotone" dataKey="pending" fill="#ffd43b" stroke="#ffd43b" name="Pending" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Triage Queue Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              🚨 Real-time Triage Queue ({realTimeData?.triageQueue?.length || 0} patients)
            </Typography>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead sx={{ background: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Temp</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>HR</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>BP</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Wait Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Symptoms</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realTimeData?.triageQueue?.map((item: any, idx: number) => (
                    <TableRow key={idx} sx={{ background: idx < 2 ? 'rgba(255, 107, 107, 0.1)' : 'transparent' }}>
                      <TableCell>
                        <Chip
                          label={item.severity.toUpperCase()}
                          color={
                            item.severity === 'critical' ? 'error' :
                            item.severity === 'high' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{item.patientName}</TableCell>
                      <TableCell>
                        <Box sx={{ background: item.temperature > 39 ? '#ff6b6b' : '#51cf66', color: 'white', p: 0.5, borderRadius: 1, textAlign: 'center' }}>
                          {item.temperature.toFixed(1)}°C
                        </Box>
                      </TableCell>
                      <TableCell>{item.vitals.heartRate}</TableCell>
                      <TableCell>{item.vitals.bloodPressure}</TableCell>
                      <TableCell>{item.estimatedWaitTime} min</TableCell>
                      <TableCell>{item.symptoms.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Performance Metrics Tab */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {[
            { label: 'Avg Response Time', value: realTimeData?.performanceMetrics?.avgResponseTime || 0, unit: 'min', color: '#667eea' },
            { label: 'Staff Efficiency', value: realTimeData?.performanceMetrics?.staffEfficiency || 0, unit: '%', color: '#51cf66' },
            { label: 'Patient Satisfaction', value: realTimeData?.performanceMetrics?.patientSatisfaction || 0, unit: '%', color: '#4facfe' },
            { label: 'Bed Occupancy', value: realTimeData?.performanceMetrics?.bedOccupancy || 0, unit: '%', color: '#ffd43b' },
          ].map((metric, idx) => (
            <Card key={idx} sx={{ background: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {metric.label}
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: metric.color }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'textSecondary' }}>
                    {metric.unit}
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={metric.value} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      {/* AI Recommendations Tab */}
      <TabPanel value={tabValue} index={4}>
        <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              🤖 AI-Generated Clinical Recommendations
            </Typography>
            {metrics?.aiAnalysis?.clinicalRecommendations ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity={metrics.aiAnalysis.clinicalRecommendations.priority === 'critical' ? 'error' : 'warning'}>
                  Priority: {metrics.aiAnalysis.clinicalRecommendations.priority.toUpperCase()}
                </Alert>
                {metrics.aiAnalysis.clinicalRecommendations.recommendations.map((rec: string, idx: number) => (
                  <Box key={idx} sx={{ p: 2, background: 'rgba(102, 126, 234, 0.1)', borderRadius: 1, borderLeft: '4px solid #667eea' }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ fontWeight: 'bold', color: '#667eea' }}>#{idx + 1}</span>
                      {rec}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Loading recommendations...
              </Typography>
            )}
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  );
}
