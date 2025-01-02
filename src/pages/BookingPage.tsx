import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  RadioGroup,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSpring, animated } from '@react-spring/web';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpaIcon from '@mui/icons-material/Spa';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AnimatedBox = animated(Box);

const services = [
  {
    id: 1,
    title: 'Swedish Massage',
    description: 'Gentle, relaxing full body massage',
    price: 'R550',
    duration: '60 min',
    icon: <SpaIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 2,
    title: 'Deep Tissue Massage',
    description: 'Intensive muscle tension relief',
    price: 'R650',
    duration: '90 min',
    icon: <SpaIcon sx={{ fontSize: 40, transform: 'rotate(45deg)' }} />,
  },
  {
    id: 3,
    title: 'Hot Stone Therapy',
    description: 'Heated stones with massage',
    price: 'R750',
    duration: '90 min',
    icon: <WaterDropIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 4,
    title: 'Aromatherapy Journey',
    description: 'Essential oils massage therapy',
    price: 'R600',
    duration: '75 min',
    icon: <AirIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 5,
    title: 'Couples Massage',
    description: 'Luxury couple\'s experience',
    price: 'R1200',
    duration: '90 min',
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
  },
  {
    id: 6,
    title: 'Luxury Facial Treatment',
    description: 'Premium skincare therapy',
    price: 'R850',
    duration: '75 min',
    icon: <FaceIcon sx={{ fontSize: 40 }} />,
  },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  const steps = ['Select Service', 'Choose Date & Time', 'Your Details', 'Confirmation'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setConfirmationOpen(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    // Here you would typically send the booking data to your backend
    setConfirmationOpen(false);
    navigate('/');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return selectedService !== null;
      case 1:
        return selectedDate !== null && selectedTime !== null;
      case 2:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: '0.3s',
                    transform: selectedService === service.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedService === service.id ? theme.shadows[10] : theme.shadows[1],
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[10],
                    },
                  }}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        {service.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.duration}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimePicker
                label="Select Time"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
        );

      case 3:
        const selectedServiceData = services.find(s => s.id === selectedService);
        return (
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Booking Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Service:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedServiceData?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Price:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedServiceData?.price}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Date:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedDate?.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Time:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {selectedTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Customer:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.email} • {formData.phone}
                </Typography>
              </Grid>
              {formData.notes && (
                <Grid item xs={12}>
                  <Typography color="text.secondary">Notes:</Typography>
                  <Typography variant="body2">{formData.notes}</Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Appointment
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedBox style={fadeIn}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ mb: 6 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, mb: 6 }}>
            {getStepContent()}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid()}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
                }
              }}
            >
              {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
            </Button>
          </Box>
        </AnimatedBox>
      </Container>

      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Booking Confirmed!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography align="center" color="text.secondary" paragraph>
            Thank you for your booking. We have sent a confirmation email with all the details.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: '50px',
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingPage;
