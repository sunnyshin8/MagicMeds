'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Appointment {
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientCity: string;
  feverStatus: { hasActiveFever: boolean; feverType?: string };
  date: string;
  time: string;
  type: string;
  status: string;
  clinician: string;
  notes: string;
}

interface AppointmentStats {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}

function TabPanel(props: any) {
  const { children, value, index } = props;
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AppointmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('upcoming');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>(new Date().toLocaleTimeString());

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/clinician/appointments?filter=${filterType}&limit=100`);

      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      setAppointments(data.appointments);
      setStats(data.stats);
      setError(null);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filterType]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAppointments();
    }, 30000);

    return () => clearInterval(interval);
  }, [filterType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      case 'No-show':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'General Checkup': '#667eea',
      'Fever Follow-up': '#ff6b6b',
      'Lab Test': '#4facfe',
      Vaccination: '#51cf66',
      Consultation: '#ffd43b',
      Emergency: '#ff6b6b',
    };
    return colors[type] || '#999';
  };

  if (loading && !appointments.length) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        mb: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EventIcon sx={{ fontSize: 40, color: '#fff' }} />
            <Box>
              <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Appointments & Scheduling
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
                Last updated: {lastRefresh}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => fetchAppointments()}
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

        {/* Stats Cards */}
        {stats && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
            <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                  Total Appointments
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                  Scheduled
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4facfe' }}>
                  {stats.byStatus.Scheduled || 0}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                  Completed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#51cf66' }}>
                  {stats.byStatus.Completed || 0}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                  Cancelled
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff6b6b' }}>
                  {stats.byStatus.Cancelled || 0}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Tabs */}
        <Paper sx={{ background: 'rgba(255,255,255,0.95)', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => {
              setTabValue(v);
              setFilterType(v === 0 ? 'upcoming' : 'past');
            }}
          >
            <Tab label={`📅 Upcoming Appointments (${stats?.byStatus.Scheduled || 0})`} />
            <Tab label={`✅ Past Appointments (${(stats?.total || 0) - (stats?.byStatus.Scheduled || 0) || 0})`} />
          </Tabs>
        </Paper>

        {/* Appointments Table */}
        <TableContainer component={Paper} sx={{ background: 'rgba(255,255,255,0.95)' }}>
          <Table>
            <TableHead sx={{ background: '#f5f5f5' }}>
              <TableRow>
                <TableCell><Typography fontWeight="bold">Appointment ID</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Patient</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Date & Time</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Type</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Clinician</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">City</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3 }}>
                    <Typography color="textSecondary">No appointments found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((apt) => (
                  <TableRow key={apt.appointmentId} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {apt.appointmentId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {apt.patientName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {apt.patientAge}y, {apt.patientGender}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {apt.date}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {apt.time}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={apt.type}
                        size="small"
                        sx={{
                          background: getTypeColor(apt.type),
                          color: '#fff',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{apt.clinician}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={apt.status}
                        size="small"
                        color={getStatusColor(apt.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{apt.patientCity}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setOpenDialog(true);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Details Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent sx={{ py: 2 }}>
            {selectedAppointment && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Appointment ID:</strong> {selectedAppointment.appointmentId}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Patient:</strong> {selectedAppointment.patientName} ({selectedAppointment.patientAge}y)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Date:</strong> {selectedAppointment.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Time:</strong> {selectedAppointment.time}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {selectedAppointment.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Clinician:</strong> {selectedAppointment.clinician}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {selectedAppointment.status}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {selectedAppointment.patientCity}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Notes:</strong> {selectedAppointment.notes}
                  </Typography>
                  {selectedAppointment.feverStatus.hasActiveFever && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Patient has active fever ({selectedAppointment.feverStatus.feverType})
                    </Alert>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
            <Button variant="contained">Reschedule</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
