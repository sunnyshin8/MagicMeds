'use client';

import { Box, Container, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

export default function Services() {
  const mainServices = [
    {
      title: 'AI Health Assistant',
      description: 'Get instant answers to your health-related questions through our advanced AI-powered chat interface.',
      icon: '🤖',
      gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      features: ['24/7 Availability', 'Multilingual Support', 'Personalized Responses', 'Quick Symptom Analysis']
    },
    {
      title: 'Health Information',
      description: 'Access reliable and up-to-date health information on various topics and conditions.',
      icon: '📚',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Expert-Reviewed Content', 'Easy to Understand', 'Regular Updates', 'Comprehensive Coverage']
    },
    {
      title: 'Symptom Guidance',
      description: 'Get preliminary guidance about your symptoms and understand when to seek professional medical help.',
      icon: '🏥',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      features: ['AI-Powered Analysis', 'Risk Assessment', 'Treatment Suggestions', 'Emergency Guidance']
    },
    {
      title: 'Health Tips & Wellness',
      description: 'Receive personalized health tips and wellness recommendations for a healthier lifestyle.',
      icon: '💪',
      gradient: 'linear-gradient(135deg, #2c5364 0%, #4facfe 100%)',
      features: ['Personalized Advice', 'Diet Guidelines', 'Exercise Plans', 'Mental Wellness Tips']
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 50%, #4facfe 100%)',
      py: 6
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #43e97b, #00f2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Our Healthcare Services
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4
        }}>
          {mainServices.map((service, index) => {
            return (
              <Card 
                key={service.title}
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Box sx={{
                  height: '5px',
                  background: service.gradient
                }} />
                
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      p: 2,
                      borderRadius: '50%',
                      background: service.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <Typography sx={{ fontSize: 32 }}>
                        {service.icon}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h2"
                      sx={{
                        color: '#fff',
                        fontWeight: 'bold'
                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.6
                    }}
                  >
                    {service.description}
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {service.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                        <Typography sx={{ color: '#43e97b', mr: 1 }}>
                          ✓
                        </Typography>
                        <ListItemText 
                          primary={feature}
                          sx={{
                            '& .MuiTypography-root': {
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '0.95rem'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontStyle: 'italic'
            }}
          >
            "Your health is our priority. We're here to support your wellness journey every step of the way."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
