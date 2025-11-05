'use client';

import { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

export default function SupportPage() {
  const [messages, setMessages] = useState<Array<{ id: number; from: string; text: string }>>([
    { id: 1, from: 'agent', text: 'Hello! I\'m your AI healthcare assistant. How can I help you with MagicMeds today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callGeminiAPI = async (userMessage: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Healthcare Support Context: User is asking about MagicMeds platform features, appointments, telehealth, or general healthcare questions. Respond helpfully and professionally as a healthcare support assistant. User question: ${userMessage}`,
          context: 'healthcare_support'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.response || 'I apologize, but I\'m having trouble responding right now. Please try again or contact our support team directly.';
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'I\'m experiencing some technical difficulties. Please try again in a moment or contact our support team at support@magicmeds.com for immediate assistance.';
    }
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages((m) => [...m, { id: m.length + 1, from: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    // Get AI response from Gemini
    const aiResponse = await callGeminiAPI(userMessage);
    setMessages((m) => [...m, { id: m.length + 2, from: 'agent', text: aiResponse }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)',
      py: 4
    }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #fff 30%, #f0f8ff 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          AI Healthcare Support
        </Typography>

        <Box sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          p: 3,
          mb: 3,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
        }}>
          <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
            🤖 Ask me anything about MagicMeds, healthcare, appointments, or get medical guidance!
          </Typography>
        </Box>

        <Box sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 3,
          boxShadow: '0 15px 35px rgba(31, 38, 135, 0.2)',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            mb: 2,
            maxHeight: '60vh',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '10px',
            }
          }}>
            {messages.map((m) => (
              <Box key={m.id} sx={{ 
                display: 'flex', 
                justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}>
                <Box sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  flexDirection: m.from === 'user' ? 'row-reverse' : 'row'
                }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: m.from === 'user' 
                      ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' 
                      : 'linear-gradient(45deg, #4c63d2, #1e3c72)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    {m.from === 'user' ? 
                      <PersonIcon sx={{ color: '#fff', fontSize: 20 }} /> : 
                      <SmartToyIcon sx={{ color: '#fff', fontSize: 20 }} />
                    }
                  </Box>
                  <Box sx={{
                    background: m.from === 'user' 
                      ? 'linear-gradient(135deg, #2a5298 0%, #4facfe 100%)'
                      : 'linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)',
                    color: '#fff',
                    p: 2,
                    borderRadius: m.from === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Typography variant="body1">{m.text}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #4c63d2, #1e3c72)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SmartToyIcon sx={{ color: '#fff', fontSize: 20 }} />
                  </Box>
                  <Box sx={{
                    background: 'linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)',
                    p: 2,
                    borderRadius: '20px 20px 20px 5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <CircularProgress size={20} sx={{ color: '#fff' }} />
                    <Typography variant="body2" sx={{ color: '#fff' }}>Thinking...</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            p: 1,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <TextField 
              fullWidth 
              placeholder="Ask about appointments, symptoms, or MagicMeds features..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  borderRadius: '12px',
                  '& fieldset': {
                    border: 'none'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.7)',
                  opacity: 1
                }
              }}
            />
            <Button 
              variant="contained" 
              onClick={send}
              disabled={isLoading || !input.trim()}
              sx={{
                background: 'linear-gradient(45deg, #43e97b, #38f9d7)',
                borderRadius: '12px',
                px: 3,
                boxShadow: '0 4px 15px rgba(238, 90, 36, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
                  boxShadow: '0 6px 20px rgba(238, 90, 36, 0.6)',
                }
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
