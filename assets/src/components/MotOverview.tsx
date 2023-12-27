import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

type Props = {
  mot: any
}

const MotOverview: React.FC<Props> = ({ mot }) => {

  let formattedDate: string = '';

  if (mot) {
    const expirationDate = mot[0].motTests[0].expiryDate; // "2023.08.11"
    // Create a new Date object by parsing the expiration date string
    const date = new Date(expirationDate.replace(/\./g, '-'));
    // Get the day, month, and year from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    // Define an array of month names
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    // Get the month name using the month index
    const monthName = monthNames[monthIndex];
    // Format the date string as "DD Month YYYY"
    formattedDate = `${day} ${monthName} ${year}`;

  }

  const now = new Date(); // Get the current date and time

  // Calculate the difference in milliseconds between the current date and the formatted date
  const timeDiff = new Date(formattedDate).getTime() - now.getTime();

  // Calculate the number of days remaining, rounding down to the nearest whole number
  const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Determine if the formatted date is in the past
  const isPastDate = timeDiff < 0;


  return (
    <>
      {mot && mot.errors && mot.errors.length > 0 ? (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 35px 20px 20px', minHeight: '170px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" align="left" variant="h5">
                No Vehicle Data Found.
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <WarningIcon sx={{ fontSize: '50px', color: 'orange' }} />
          </Box>
        </Card>
      ) : (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 35px 20px 20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" align="left" variant="h5" sx={{ fontWeight: '600' }}>
                MOT
              </Typography>
              <Typography variant="subtitle1" align="left" color="text.secondary" component="div">
                {isPastDate ? 'Expired:' : 'Expires:' } {formattedDate}
              </Typography>
              <Typography variant="subtitle1" align="left" color="text.secondary" component="div">
                {isPastDate ? `${-daysRemaining} days ago` : `${daysRemaining} days left`}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            
            {isPastDate ? <WarningIcon sx={{ fontSize: '50px', color: 'orange' }} /> : <CheckCircleIcon sx={{ fontSize: '50px', color: '#2c8' }} /> }
        
          </Box>
        </Card>
      )}
    </>
  );
}

export default MotOverview;