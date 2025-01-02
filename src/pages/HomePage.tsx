import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import NatureIcon from '@mui/icons-material/Nature';
import LoginIcon from '@mui/icons-material/Login';

interface HomePageProps {
  onLoginClick: () => void;
}

function HomePage({ onLoginClick }: HomePageProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const services = [
    {
      id: 1,
      title: 'Swedish Massage',
      description: 'A gentle full body massage that promotes relaxation, improves circulation, and relieves muscle tension.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
      price: 'R750+',
      duration: '60 min'
    },
    {
      id: 2,
      title: 'Deep Tissue Massage',
      description: 'Targets deep muscle layers to release chronic tension and treat muscle injuries.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
      price: 'R850+',
      duration: '90 min'
    },
    {
      id: 3,
      title: 'Hot Stone Therapy',
      description: 'Combines heated stones with massage techniques for deep relaxation and healing.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
      price: 'R950+',
      duration: '90 min'
    },
    {
      id: 4,
      title: 'Aromatherapy Journey',
      description: 'A sensory experience combining massage with essential oils for mind and body wellness.',
      image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=600&q=80',
      price: 'R800+',
      duration: '75 min'
    },
    {
      id: 5,
      title: 'Couples Massage',
      description: 'Share a relaxing massage experience in our luxury couple\'s suite.',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80',
      price: 'R1500+',
      duration: '90 min'
    },
    {
      id: 6,
      title: 'Luxury Facial',
      description: 'Advanced skincare treatment using premium products for a radiant, refreshed complexion.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      price: 'R950+',
      duration: '75 min'
    }
  ];

  const features = [
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      title: 'Expert Therapists',
      description: 'Certified massage therapists at your service'
    },
    {
      icon: <WaterDropIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Products',
      description: 'We use only the finest spa products'
    },
    {
      icon: <NatureIcon sx={{ fontSize: 40 }} />,
      title: 'Serene Environment',
      description: 'A peaceful sanctuary for relaxation'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      comment: 'Absolutely love my new hairstyle! The staff was professional and friendly.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5
    },
    {
      name: 'Michael Chen',
      comment: "Best salon experience I've had. The attention to detail is amazing.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228eb2?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5
    },
    {
      name: 'Emily Davis',
      comment: 'Great atmosphere and even better results. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5
    },
  ];

  const drawer = (
    <List>
      <ListItem button onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate('/booking')}>
        <ListItemText primary="Book Appointment" />
      </ListItem>
      <ListItem button onClick={() => navigate('/services')}>
        <ListItemText primary="Services" />
      </ListItem>
      <ListItem button onClick={onLoginClick}>
        <ListItemText primary="Admin Login" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.8)' }}>
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/booking')}>Book Appointment</Button>
              <Button color="inherit" onClick={() => navigate('/services')}>Services</Button>
              <Button 
                color="inherit" 
                onClick={onLoginClick}
                startIcon={<LoginIcon />}
              >
                Admin Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            height: { xs: '60vh', md: '80vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius,
            my: 4,
            mt: { xs: 8, md: 12 },
            backgroundImage: 'url(https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backgroundBlendMode: 'overlay',
          }}
        >
          {/* Content Box with Animation */}
          <Box
            sx={{
              p: 4,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
              maxWidth: '800px',
              animation: 'fadeIn 1s ease-out',
              '@keyframes fadeIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                mb: 3
              }}
            >
              Escape to Tranquility
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 300
              }}
            >
              Experience luxury spa treatments with our expert therapists
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/booking')}
              sx={{ 
                py: 2, 
                px: 6,
                fontSize: '1.2rem',
                borderRadius: '50px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            component="h2"
            variant="h3"
            color="primary"
            gutterBottom
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Why Choose Serenity Spa
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box textAlign="center">
                  {feature.icon}
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Services Section */}
        <Box sx={{ py: { xs: 6, md: 12 } }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    animation: `fadeIn 1s ease-out ${index * 0.2}s`,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.shadows[10],
                    },
                    '@keyframes fadeIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(20px)'
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={service.image}
                    alt={service.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Price: {service.price} | Duration: {service.duration}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: 'grey.50', borderRadius: 4, px: 4 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6,
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  bgcolor: 'background.paper',
                  p: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'grey.100'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Box sx={{ display: 'flex', color: 'warning.main' }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} sx={{ fontSize: 20 }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Typography color="text.secondary" sx={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ 
          py: { xs: 6, md: 12 }, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2D3047 0%, #4B4E6D 100%)',
          color: 'white',
          borderRadius: theme.shape.borderRadius,
          my: 8,
          px: 4
        }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Transform Your Look?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Book your appointment today and experience the difference with our expert stylists
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/booking')}
            sx={{ 
              py: 2, 
              px: 6,
              fontSize: '1.2rem',
              borderRadius: '50px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
              }
            }}
          >
            Book Your Appointment
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <IconButton color="primary">
              <InstagramIcon />
            </IconButton>
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
          </Stack>
          <Typography color="text.secondary">
            2025 Serenity Spa & Wellness. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
