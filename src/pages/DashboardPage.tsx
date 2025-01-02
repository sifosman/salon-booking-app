import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  CalendarMonth,
  Person,
  AttachMoney,
  Check,
  Add,
  ContentCut,
} from '@mui/icons-material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Dummy data
const bookings = [
  {
    id: 1,
    title: 'Swedish Massage - Sarah Johnson',
    start: new Date(2025, 0, 2, 10, 0),
    end: new Date(2025, 0, 2, 11, 0),
    status: 'confirmed',
  },
  {
    id: 2,
    title: 'Deep Tissue Massage - Mike Brown',
    start: new Date(2025, 0, 2, 14, 0),
    end: new Date(2025, 0, 2, 15, 30),
    status: 'pending',
  },
  {
    id: 3,
    title: 'Hot Stone Therapy - Emma Wilson',
    start: new Date(2025, 0, 3, 11, 0),
    end: new Date(2025, 0, 3, 12, 30),
    status: 'confirmed',
  },
];

const recentCustomers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    service: 'Swedish Massage',
    time: '10:00 AM',
    status: 'Confirmed',
    avatar: 'S',
  },
  {
    id: 2,
    name: 'Mike Brown',
    service: 'Deep Tissue Massage',
    time: '2:00 PM',
    status: 'Pending',
    avatar: 'M',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    service: 'Hot Stone Therapy',
    time: '11:00 AM',
    status: 'Confirmed',
    avatar: 'E',
  },
];

const popularServices = [
  {
    name: 'Swedish Massage',
    bookings: 28,
    revenue: 15400,
    progress: 85,
  },
  {
    name: 'Deep Tissue Massage',
    bookings: 24,
    revenue: 15600,
    progress: 75,
  },
  {
    name: 'Hot Stone Therapy',
    bookings: 18,
    revenue: 13500,
    progress: 65,
  },
];

const stats = {
  totalBookings: 45,
  totalRevenue: 'R25,500',
  newCustomers: 12,
  completedBookings: 38,
};

const quickActions = [
  { icon: <Add />, label: 'New Booking', color: 'primary' },
  { icon: <ContentCut />, label: 'Add Service', color: 'secondary' },
  { icon: <Person />, label: 'Add Customer', color: 'success' },
  { icon: <AttachMoney />, label: 'Record Payment', color: 'warning' },
];

const DashboardPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    service: '',
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedSlot({ start, end });
    setOpenBookingDialog(true);
  };

  const handleBookingSubmit = () => {
    if (selectedSlot && bookingForm.customerName && bookingForm.service) {
      const newBooking = {
        id: bookings.length + 1,
        title: `${bookingForm.service} - ${bookingForm.customerName}`,
        start: selectedSlot.start,
        end: selectedSlot.end,
        status: 'pending',
      };
      bookings.push(newBooking);
      setOpenBookingDialog(false);
      setBookingForm({ customerName: '', service: '' });
      setSelectedSlot(null);
    }
  };

  const handleBookingCancel = () => {
    setOpenBookingDialog(false);
    setBookingForm({ customerName: '', service: '' });
    setSelectedSlot(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                variant="contained"
                color={action.color as any}
                startIcon={action.icon}
                fullWidth
                sx={{ py: 2 }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <CalendarMonth />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Total Bookings
                  </Typography>
                  <Typography variant="h4">{stats.totalBookings}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Revenue
                  </Typography>
                  <Typography variant="h4">{stats.totalRevenue}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    New Customers
                  </Typography>
                  <Typography variant="h4">{stats.newCustomers}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <Check />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Completed
                  </Typography>
                  <Typography variant="h4">{stats.completedBookings}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: { xs: 500, md: 640 } }}>
            <Typography variant="h6" gutterBottom component="div">
              Booking Calendar
            </Typography>
            <Box sx={{ 
              flex: 1, 
              mt: 1,
              '& .rbc-calendar': {
                height: '100% !important',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              },
              '& .rbc-toolbar': {
                flexWrap: 'wrap',
                justifyContent: 'center',
                mb: { xs: 2, sm: 'inherit' },
                '& .rbc-toolbar-label': {
                  width: { xs: '100%', sm: 'auto' },
                  textAlign: 'center',
                  m: { xs: '8px 0', sm: 0 },
                  fontSize: { xs: '1rem', sm: 'inherit' }
                },
                '& .rbc-btn-group': {
                  m: 1,
                  '& button': {
                    p: { xs: '4px 8px', sm: '6px 12px' }
                  }
                }
              },
              '& .rbc-time-view': {
                '& .rbc-time-header': {
                  '& .rbc-time-header-content': {
                    '& .rbc-header': {
                      p: { xs: '4px 2px', sm: '4px' },
                      fontSize: { xs: '0.7rem', sm: '0.875rem' }
                    }
                  }
                },
                '& .rbc-time-content': {
                  '& .rbc-time-gutter': {
                    fontSize: { xs: '0.7rem', sm: '0.875rem' }
                  },
                  '& .rbc-event': {
                    minHeight: { xs: '24px', sm: '30px' },
                    p: { xs: '1px 2px', sm: '2px 4px' },
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    '& .rbc-event-content': {
                      fontSize: 'inherit'
                    }
                  },
                  '& .rbc-events-container': {
                    mr: { xs: 0, sm: '10px' }
                  },
                  '& .rbc-time-slot': {
                    minHeight: { xs: '24px', sm: '30px' }
                  }
                },
                '& .rbc-current-time-indicator': {
                  height: '2px'
                }
              },
              '& .rbc-agenda-view': {
                '& .rbc-agenda-table': {
                  fontSize: { xs: '0.7rem', sm: '0.875rem' },
                  '& th, & td': {
                    p: { xs: 1, sm: 2 }
                  }
                }
              },
              '@media (max-width: 600px)': {
                '& .rbc-time-content': {
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    height: '4px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '2px'
                  }
                }
              }
            }}>
              <Calendar
                localizer={localizer}
                events={bookings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                defaultView={window.innerWidth < 600 ? "day" : "week"}
                views={['day', 'week', 'month', 'agenda']}
                step={30}
                timeslots={2}
                min={new Date(2025, 0, 1, 6, 0, 0)}
                max={new Date(2025, 0, 1, 20, 0, 0)}
                selectable
                onSelectSlot={handleSelectSlot}
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: event.status === 'confirmed' ? '#2e7d32' : '#ed6c02',
                    borderRadius: '4px'
                  }
                })}
                components={{
                  event: (props) => (
                    <Box sx={{ 
                      fontSize: 'inherit',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'white',
                      lineHeight: { xs: 1.2, sm: 1.4 }
                    }}>
                      {props.title}
                    </Box>
                  )
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Bookings and Popular Services */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, height: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Bookings
                </Typography>
                <List>
                  {recentCustomers.map((customer) => (
                    <React.Fragment key={customer.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>{customer.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={customer.name}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                {customer.service}
                              </Typography>
                              {` — ${customer.time}`}
                              <Box sx={{ mt: 1 }}>
                                <Chip
                                  size="small"
                                  label={customer.status}
                                  color={getStatusColor(customer.status)}
                                />
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, height: 320 }}>
                <Typography variant="h6" gutterBottom>
                  Popular Services
                </Typography>
                <List>
                  {popularServices.map((service, index) => (
                    <ListItem key={index}>
                      <Box sx={{ width: '100%' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body1">{service.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {service.bookings} bookings
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={service.progress}
                              color="primary"
                            />
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            {service.progress}%
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                          R{service.revenue.toLocaleString()}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Booking Dialog */}
      <Dialog open={openBookingDialog} onClose={handleBookingCancel}>
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Customer Name"
              value={bookingForm.customerName}
              onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Service"
              value={bookingForm.service}
              onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingCancel}>Cancel</Button>
          <Button 
            onClick={handleBookingSubmit}
            variant="contained" 
            disabled={!bookingForm.customerName || !bookingForm.service}
          >
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;
