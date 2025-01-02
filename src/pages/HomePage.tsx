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
  Divider,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSpring, animated, useTrail } from '@react-spring/web';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const AnimatedBox = animated(Box);
const AnimatedCard = animated(Card);

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const services = [
    {
      id: 1,
      title: 'Swedish Massage',
      description: 'A gentle full body massage that promotes relaxation, improves circulation, and relieves muscle tension.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80',
      price: 'R550+',
      duration: '60 min'
    },
    {
      id: 2,
      title: 'Deep Tissue Massage',
      description: 'Targets deep muscle layers to release chronic tension and treat muscle injuries.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
      price: 'R650+',
      duration: '90 min'
    },
    {
      id: 3,
      title: 'Hot Stone Therapy',
      description: 'Combines heated stones with massage techniques for deep relaxation and healing.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
      price: 'R750+',
      duration: '90 min'
    },
    {
      id: 4,
      title: 'Aromatherapy Journey',
      description: 'A sensory experience combining massage with essential oils for mind and body wellness.',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80',
      price: 'R600+',
      duration: '75 min'
    },
    {
      id: 5,
      title: 'Couples Massage',
      description: 'Share a relaxing massage experience in our luxury couple\'s suite.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      price: 'R1200+',
      duration: '90 min'
    },
    {
      id: 6,
      title: 'Luxury Facial Treatment',
      description: 'Advanced skincare treatment including cleansing, exfoliation, and relaxing facial massage.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      price: 'R850+',
      duration: '75 min'
    }
  ];

  const features = [
    {
      icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
      title: 'Easy Booking',
      description: 'Book your appointment online in minutes'
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Expert Stylists',
      description: 'Experienced professionals at your service'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: 'Flexible Hours',
      description: 'Open 7 days a week for your convenience'
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5
    },
    {
      name: 'Emily Davis',
      comment: 'Great atmosphere and even better results. Highly recommend!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5
    },
  ];

  const servicesTrail = useTrail(services.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200,
  });

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
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}

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
        <AnimatedBox style={fadeIn}>
          {/* Hero Section */}
          <Box sx={{ 
            position: 'relative',
            height: { xs: '60vh', md: '80vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            borderRadius: theme.shape.borderRadius,
            my: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
              zIndex: -1,
            }
          }}>
            <Box sx={{ 
              p: 4,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
              maxWidth: '800px'
            }}>
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
                Transform Your Look
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  fontWeight: 300
                }}
              >
                Experience luxury hair care with our expert stylists
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
                Book Now
              </Button>
            </Box>
          </Box>

          {/* Features Section */}
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
              Why Choose Us
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      }
                    }}
                  >
                    <Box sx={{ 
                      color: 'secondary.main',
                      mb: 2,
                      transform: 'scale(1.2)'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
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
              {servicesTrail.map((style, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <AnimatedCard 
                    style={style}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: theme.shadows[10],
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={services[index].image}
                      alt={services[index].title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {services[index].title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {services[index].description}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2
                      }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                          {services[index].price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {services[index].duration}
                        </Typography>
                      </Box>
                    </CardContent>
                  </AnimatedCard>
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
              2025 Luxury Salon. All rights reserved.
            </Typography>
          </Box>
        </AnimatedBox>
      </Container>
    </Box>
  );
};

export default HomePage;
