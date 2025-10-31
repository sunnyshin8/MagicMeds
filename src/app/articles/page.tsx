'use client';

import { useEffect, useState } from 'react';
import { 
  Card, 
  Container, 
  Typography, 
  Avatar, 
  Rating, 
  Box, 
  Chip,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Create styled components for the grid layout
const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const GridItem = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const ReviewsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

// HIPAA-compliant review interface
interface PatientReview {
  reviewId: string;
  patientInitials: string;
  age: string; 
  condition: string;
  rating: number;
  review: string;
  verifiedPurchase: boolean;
  date: string;
  helpfulCount: number;
}

// Mock reviews data - HIPAA compliant (no identifiable information)
const mockReviews: PatientReview[] = [
  {
    reviewId: "R1",
    patientInitials: "J.W.",
    age: "65+",
    condition: "Acid Reflux",
    rating: 5,
    review: "The recommended medication helped manage my acid reflux effectively. The app provided clear dosage instructions and helpful lifestyle tips.",
    verifiedPurchase: true,
    date: "2025-10-15",
    helpfulCount: 24
  },
  {
    reviewId: "R2",
    patientInitials: "M.S.",
    age: "45-54",
    condition: "Seasonal Allergies",
    rating: 4,
    review: "Great recommendations for my seasonal allergies. Would appreciate more natural remedy options.",
    verifiedPurchase: true,
    date: "2025-10-10",
    helpfulCount: 15
  },
  {
    reviewId: "R3",
    patientInitials: "A.K.",
    age: "35-44",
    condition: "Migraine",
    rating: 5,
    review: "The AI assistant helped me track my migraine triggers and suggested effective treatment options.",
    verifiedPurchase: true,
    date: "2025-10-05",
    helpfulCount: 32
  }
];

// Article interface
interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  readTime: string;
}

// Mock articles
const mockArticles: HealthArticle[] = [
  {
    id: "A1",
    title: "Understanding Common Medication Side Effects",
    summary: "Learn about potential side effects of common medications and how to manage them effectively.",
    tags: ["Medication Safety", "Healthcare", "Wellness"],
    date: "2025-10-20",
    readTime: "5 min"
  },
  {
    id: "A2",
    title: "Safe Medicine Storage Guidelines",
    summary: "Best practices for storing medications safely at home, especially in households with children.",
    tags: ["Safety", "Medicine Storage", "Family Health"],
    date: "2025-10-18",
    readTime: "4 min"
  },
  {
    id: "A3",
    title: "When to Seek Emergency Care vs. Self-Medication",
    summary: "Guidelines for determining whether to treat symptoms at home or seek professional medical care.",
    tags: ["Emergency Care", "Self-Care", "Healthcare"],
    date: "2025-10-15",
    readTime: "6 min"
  }
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [reviews, setReviews] = useState<PatientReview[]>([]);

  useEffect(() => {
    // In a real app, these would be API calls
    setArticles(mockArticles);
    setReviews(mockReviews);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Articles Section */}
      <Typography variant="h4" component="h1" gutterBottom>
        Health & Wellness Articles
      </Typography>
      <GridContainer>
        {articles.map((article) => (
          <GridItem key={article.id}>
            <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {article.summary}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ mb: 1 }}>
                  {article.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {article.date} • {article.readTime} read
                </Typography>
              </Box>
            </Card>
          </GridItem>
        ))}
      </GridContainer>

      {/* Reviews Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        User Experiences
      </Typography>
      <ReviewsContainer>
        {reviews.map((review) => (
          <Box key={review.reviewId}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {review.patientInitials}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {review.patientInitials} • Age: {review.age}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Condition: {review.condition}
                  </Typography>
                </Box>
              </Box>
              <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
              <Typography variant="body1" paragraph>
                {review.review}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {review.date} • {review.helpfulCount} found this helpful
                </Typography>
                {review.verifiedPurchase && (
                  <Chip
                    label="Verified User"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
            </Card>
          </Box>
        ))}
      </ReviewsContainer>
    </Container>
  );
}