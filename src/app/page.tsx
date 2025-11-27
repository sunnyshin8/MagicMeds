'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import SpeedIcon from '@mui/icons-material/Speed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';

export default function AboutPage() {
  const features = [
    {
      icon: PsychologyIcon,
      title: 'AI-Powered Healthcare',
      description: 'Advanced Gemini AI provides intelligent medical assistance and personalized health recommendations.',
      gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
    },
    {
      icon: VideoCallIcon,
      title: 'Telehealth Consultations',
      description: 'Secure video calls with certified healthcare providers from the comfort of your home.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: LocalHospitalIcon,
      title: 'Complete Care Management',
      description: 'End-to-end healthcare management from appointments to prescriptions and follow-ups.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: SecurityIcon,
      title: 'HIPAA Compliant Security',
      description: 'Bank-level encryption ensures your health data remains private and secure at all times.',
      gradient: 'linear-gradient(135deg, #2c5364 0%, #4facfe 100%)'
    },
    {
      icon: LanguageIcon,
      title: 'Multilingual Support',
      description: 'Available in English and major Indian languages to serve diverse communities.',
      gradient: 'linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)'
    },
    {
      icon: SpeedIcon,
      title: '24/7 Instant Access',
      description: 'Round-the-clock healthcare support and emergency assistance whenever you need it.',
      gradient: 'linear-gradient(135deg, #71b280 0%, #134e5e 100%)'
    },
    {
      icon: FamilyRestroomIcon,
      title: 'Guardian Care Support',
      description: 'Add up to 3 trusted guardians who can manage your healthcare when you\'re too sick to do so yourself.',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)'
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #4facfe 75%, #00f2fe 100%)',
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" sx={{
            fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #fff 30%, #43e97b 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            lineHeight: 1.1
          }}>
            MagicMeds
          </Typography>
          
          <Typography variant="h4" sx={{
            color: 'rgba(255,255,255,0.9)',
            mb: 4,
            fontWeight: 300,
            fontSize: { xs: '1.2rem', md: '1.8rem' }
          }}>
            🚀 Revolutionizing Healthcare with AI Magic
          </Typography>

          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.8)',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.3rem' },
            lineHeight: 1.6
          }}>
            "Where Technology Meets Compassion – Making Quality Healthcare 
            Accessible to Every Indian, Everywhere, Anytime 💚"
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                color: '#fff',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: '50px',
                boxShadow: '0 8px 25px rgba(67, 233, 123, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #38f9d7, #43e97b)',
                  boxShadow: '0 12px 35px rgba(67, 233, 123, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Your Health Journey
            </Button>
            
            <Button
              component={Link}
              href="/telehealth"
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#fff',
                color: '#fff',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: '50px',
                borderWidth: '2px',
                '&:hover': {
                  borderColor: '#43e97b',
                  background: 'rgba(67, 233, 123, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Try Telehealth Now
            </Button>

            <Button
              component={Link}
              href="/clinician"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                color: '#fff',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: '50px',
                boxShadow: '0 8px 25px rgba(79, 172, 254, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
                  boxShadow: '0 12px 35px rgba(79, 172, 254, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Clinician Portal
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Mission Statement */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 6,
          boxShadow: '0 15px 35px rgba(31, 38, 135, 0.2)',
          textAlign: 'center'
        }}>
          <FavoriteIcon sx={{ fontSize: 60, color: '#43e97b', mb: 3 }} />
          <Typography variant="h4" sx={{
            color: '#fff',
            fontWeight: 'bold',
            mb: 3,
            background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Mission
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.8,
            maxWidth: '800px',
            mx: 'auto',
            fontStyle: 'italic'
          }}>
            "To democratize healthcare in India by combining cutting-edge AI technology 
            with human compassion, ensuring every citizen has access to quality medical 
            care regardless of location, language, or economic status."
          </Typography>
        </Box>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fff, #43e97b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Why Choose MagicMeds?
        </Typography>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Box key={index}>
                <Box sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  p: 4,
                  height: '100%',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(31, 38, 135, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}>
                  <Box sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '15px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                  }}>
                    <IconComponent sx={{ color: '#fff', fontSize: 35 }} />
                  </Box>
                  
                  <Typography variant="h6" sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    mb: 2
                  }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Guardian Care Highlight Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '2px solid rgba(255, 165, 0, 0.3)',
          p: 4,
          boxShadow: '0 15px 35px rgba(255, 107, 107, 0.2)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <FamilyRestroomIcon sx={{ fontSize: '3rem', color: '#ff6b6b', mr: 2 }} />
              <Typography variant="h3" sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #ff6b6b 30%, #ffa500 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Guardian Care Support
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  🤒 Too Sick to Manage Your Healthcare?
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, fontSize: '1.1rem' }}>
                  When you're critically ill, hospitalized, or unable to manage your healthcare independently, 
                  our Guardian Care feature ensures your medical needs are never neglected.
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
                  <strong>Add up to 3 trusted guardians</strong> who can access your MagicMeds account, 
                  view your medical records, communicate with doctors, and make healthcare decisions on your behalf.
                </Typography>
              </Box>

              <Box>
                <Card sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)' 
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#ffa500', mb: 2, fontWeight: 'bold' }}>
                      👨‍👩‍👧‍👦 Perfect for:
                    </Typography>
                    <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                      <li style={{ marginBottom: '8px' }}>Elderly patients with chronic conditions</li>
                      <li style={{ marginBottom: '8px' }}>Patients undergoing major surgery</li>
                      <li style={{ marginBottom: '8px' }}>Emergency medical situations</li>
                      <li style={{ marginBottom: '8px' }}>Mental health crises</li>
                      <li style={{ marginBottom: '8px' }}>Family members traveling frequently</li>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                component={Link}
                href="/guardians"
                variant="contained"
                size="large"
                startIcon={<FamilyRestroomIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
                  color: 'white',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ffa500, #ff6b6b)',
                    boxShadow: '0 12px 30px rgba(255, 107, 107, 0.6)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Manage Your Guardians
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          p: 8,
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(31, 38, 135, 0.3)'
        }}>
          <Typography variant="h4" sx={{
            color: '#fff',
            fontWeight: 'bold',
            mb: 3
          }}>
            Ready to Experience the Future of Healthcare?
          </Typography>
          
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Join thousands of Indians who are already transforming their health journey with MagicMeds
          </Typography>

          <Button
            component={Link}
            href="/signup"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(45deg, #00f2fe, #43e97b)',
              color: '#fff',
              px: 6,
              py: 3,
              fontSize: '1.2rem',
              borderRadius: '50px',
              boxShadow: '0 10px 30px rgba(0, 242, 254, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #43e97b, #00f2fe)',
                boxShadow: '0 15px 40px rgba(0, 242, 254, 0.6)',
                transform: 'translateY(-3px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Get Started Free Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
}