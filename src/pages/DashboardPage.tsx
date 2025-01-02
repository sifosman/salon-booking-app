import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Button,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: number;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  email: string;
  phone: string;
  price: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mock data - replace with actual API calls
  const bookings: Booking[] = [
    {
      id: 1,
      customerName: 'John Doe',
      service: 'Haircut & Styling',
      date: '2025-01-03',
      time: '10:00 AM',
      status: 'confirmed',
      email: 'john@example.com',
      phone: '123-456-7890',
      price: '$50'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      service: 'Color & Highlights',
      date: '2025-01-03',
      time: '2:00 PM',
      status: 'confirmed',
      email: 'jane@example.com',
      phone: '123-456-7891',
      price: '$100'
    },
    {
      id: 3,
      customerName: 'Alice Johnson',
      service: 'Hair Treatment',
      date: '2025-01-03',
      time: '4:00 PM',
      status: 'cancelled',
      email: 'alice@example.com',
      phone: '123-456-7892',
      price: '$75'
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, booking: Booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusChange = (bookingId: number, newStatus: 'completed' | 'cancelled') => {
    // Implement status change logic here
    console.log(`Booking ${bookingId} status changed to ${newStatus}`);
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate summary statistics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, booking) => sum + parseInt(booking.price.replace('$', '')), 0);

  const summaryCards = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: <CalendarMonthIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Upcoming Appointments',
      value: confirmedBookings,
      icon: <PersonIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Salon Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {card.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4">
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Today's Bookings" />
            <Tab label="Upcoming Bookings" />
            <Tab label="Past Bookings" />
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body1">{booking.customerName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {booking.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{booking.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, booking)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {selectedBooking && selectedBooking.status === 'confirmed' && (
            [
              <MenuItem
                key="complete"
                onClick={() => handleStatusChange(selectedBooking.id, 'completed')}
              >
                <CheckCircleIcon sx={{ mr: 1 }} /> Mark as Completed
              </MenuItem>,
              <MenuItem
                key="cancel"
                onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
              >
                <CancelIcon sx={{ mr: 1 }} /> Cancel Booking
              </MenuItem>
            ]
          )}
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default DashboardPage;
