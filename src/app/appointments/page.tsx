'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/material/styles';

// Styled components
const AppointmentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

// Import Grid2 instead of Grid for better TypeScript support


const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const colors = {
    upcoming: theme.palette.info.main,
    completed: theme.palette.success.main,
    cancelled: theme.palette.error.main,
    'in-progress': theme.palette.warning.main,
  };
  return {
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors[status as keyof typeof colors],
    color: theme.palette.common.white,
  };
});

// Types
interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  department: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
  followUp?: boolean;
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 'A1',
    date: '2025-11-05',
    time: '10:00 AM',
    doctorName: 'Dr. Sarah Chen',
    department: 'General Medicine',
    location: 'Main Clinic, Room 203',
    status: 'upcoming',
    notes: 'Regular checkup',
  },
  {
    id: 'A2',
    date: '2025-10-28',
    time: '2:30 PM',
    doctorName: 'Dr. Michael Brown',
    department: 'Cardiology',
    location: 'Heart Center, Room 105',
    status: 'completed',
    notes: 'Follow-up on medication adjustment',
    followUp: true,
  },
  {
    id: 'A3',
    date: '2025-10-15',
    time: '11:15 AM',
    doctorName: 'Dr. Emily Wilson',
    department: 'Dermatology',
    location: 'Specialty Clinic, Room 304',
    status: 'completed',
  },
];

export default function AppointmentsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctorName: '',
    department: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    // In a real app, this would be an API call
    setAppointments(mockAppointments);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would be an API call
    const appointment: Appointment = {
      id: `A${appointments.length + 1}`,
      ...newAppointment,
      status: 'upcoming',
      location: 'To be confirmed',
    };
    setAppointments(prev => [...prev, appointment]);
    setOpenDialog(false);
    setNewAppointment({
      doctorName: '',
      department: '',
      date: '',
      time: '',
      notes: '',
    });
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (tabValue === 0) return appointment.status === 'upcoming';
    if (tabValue === 1) return appointment.status === 'completed';
    return appointment.status === 'cancelled';
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          My Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<CalendarMonthIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Schedule Appointment
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Upcoming" />
          <Tab label="Past Appointments" />
          <Tab label="Cancelled" />
        </Tabs>
      </Box>

      {filteredAppointments.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CalendarMonthIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No appointments found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tabValue === 0 ? "You don't have any upcoming appointments" : 
             tabValue === 1 ? "You haven't had any past appointments" :
             "You don't have any cancelled appointments"}
          </Typography>
        </Box>
      ) : (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id}>
            <StatusChip
              label={appointment.status}
              status={appointment.status}
            />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">
                    {appointment.doctorName}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {appointment.department}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {appointment.location}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarMonthIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(appointment.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {appointment.time}
                  </Typography>
                </Box>
                {appointment.notes && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NotesIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {appointment.notes}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            {appointment.followUp && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Follow-up appointment recommended. Please schedule your next visit.
              </Alert>
            )}
          </AppointmentCard>
        ))
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Doctor"
            name="doctorName"
            value={newAppointment.doctorName}
            onChange={handleInputChange}
            margin="normal"
            required
          >
            <MenuItem value="Dr. Sarah Chen">Dr. Sarah Chen - General Medicine</MenuItem>
            <MenuItem value="Dr. Michael Brown">Dr. Michael Brown - Cardiology</MenuItem>
            <MenuItem value="Dr. Emily Wilson">Dr. Emily Wilson - Dermatology</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Department"
            name="department"
            value={newAppointment.department}
            onChange={handleInputChange}
            margin="normal"
            required
          >
            <MenuItem value="General Medicine">General Medicine</MenuItem>
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Dermatology">Dermatology</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Time"
            name="time"
            type="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={newAppointment.notes}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!newAppointment.doctorName || !newAppointment.date || !newAppointment.time}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}