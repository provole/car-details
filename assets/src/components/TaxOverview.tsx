import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

type Props = {
  result: any
}

const TaxOverview: React.FC<Props> = ({ result }) => {

  let daysRemaining: number | null = null;
  let formattedTaxDueDate: string = '';
  let expired: boolean = false;

  if (result && result.taxDueDate) {
    const currentDate = new Date();
    const expirationDate = new Date(result.taxDueDate);
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (timeDiff < 0) {
      expired = true;
      daysRemaining = Math.ceil(Math.abs(timeDiff) / (1000 * 3600 * 24));
    }

    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    formattedTaxDueDate = expirationDate.toLocaleDateString('en-GB', options);
  }


  return (
    <>
      {result && result.errors && result.errors.length > 0 ? (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 35px 20px 20px', minHeight: '170px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" align="left" variant="h5" sx={{ fontWeight: '600' }}>
                Tax
              </Typography>
              <Typography component="div" align="left" variant="h6" sx={{ fontWeight: '600' }}>
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
                Tax
              </Typography>
              <Typography variant="subtitle1" align="left" color="text.secondary" component="div">
                {expired ? 'Expired: ' : 'Expires: '}{formattedTaxDueDate}
              </Typography>
              <Typography variant="subtitle1" align="left" color="text.secondary" component="div">
                {expired ? `${daysRemaining} days ago` : `${daysRemaining} days left`}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            {result.motStatus === 'Valid' ? (
              <CheckCircleIcon sx={{ fontSize: '50px', color: '#2c8' }} />
            ) : (
              <WarningIcon sx={{ fontSize: '50px', color: 'orange' }} />
            )}

          </Box>
        </Card>
      )}
    </>
  );
}

export default TaxOverview;