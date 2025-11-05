import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';

// Enhanced analytics/dashboard page with vibrant gradients and modern UI

export default function DashboardPage() {
  const stats = [
    {
      title: 'Appointments Today',
      value: 8,
      icon: CalendarTodayIcon,
      gradient: 'linear-gradient(135deg, #2c5364 0%, #4facfe 100%)',
      change: '+12%'
    },
    {
      title: 'Upcoming Appointments',
      value: 24,
      icon: TrendingUpIcon,
      gradient: 'linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)',
      change: '+8%'
    },
    {
      title: 'Total Patients',
      value: '1.4K',
      icon: PeopleIcon,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      change: '+23%'
    },
    {
      title: 'Messages Today',
      value: 12,
      icon: MessageIcon,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      change: '+5%'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #4facfe 75%, #00f2fe 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fff 30%, #f0f8ff 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Healthcare Analytics Dashboard
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
          gap: 3,
          mb: 4
        }}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Box key={index} sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 3,
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 40px rgba(31, 38, 135, 0.5)'
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: stat.gradient,
                  borderRadius: '50%',
                  transform: 'translate(30px, -30px)',
                  opacity: 0.2
                }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '12px',
                    background: stat.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    <IconComponent sx={{ color: '#fff', fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ 
                      color: '#fff', 
                      fontWeight: 'bold',
                      mb: 0.5
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.875rem'
                    }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  <Typography variant="body2" sx={{
                    color: '#4ade80',
                    fontWeight: 'bold',
                    background: 'rgba(74, 222, 128, 0.2)',
                    px: 1,
                    py: 0.5,
                    borderRadius: '8px'
                  }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 4,
          boxShadow: '0 15px 35px rgba(31, 38, 135, 0.2)'
        }}>
          <Typography variant="h5" sx={{ 
            color: '#fff', 
            mb: 3,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 Recent Activity
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { time: '10:30 AM', action: 'Dr. Chen completed consultation with patient A1', type: 'success' },
              { time: '9:15 AM', action: 'New message from patient john@example.com', type: 'info' },
              { time: '8:00 AM', action: 'Appointment A5 cancelled by patient', type: 'warning' }
            ].map((activity, index) => (
              <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(5px)'
                }
              }}>
                <Box sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: activity.type === 'success' ? '#4ade80' : 
                            activity.type === 'info' ? '#60a5fa' : '#fbbf24',
                  mr: 3,
                  flexShrink: 0
                }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ color: '#fff', mb: 0.5 }}>
                    {activity.action}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
