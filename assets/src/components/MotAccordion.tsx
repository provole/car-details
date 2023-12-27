import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  mot: any
}

const MotOverview: React.FC<Props> = ({ mot }) => {


  return (
    <Card sx={{ mt: 3, padding: '30px 30px 30px' }}>
      <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          Full MOT History ({mot[0].motTests.length})
        </Typography>
      </CardContent>
      {mot[0].motTests.map((test: any, index: number) => {

        const milesDifference = index === (mot[0].motTests.length - 1) ? 0 : test.odometerValue - mot[0].motTests[index + 1].odometerValue;

        // convert date
        const completedDate = test.completedDate
        const date = new Date(completedDate.replace(/\./g, '-'));
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '');

        return (
          <Accordion key={index} sx={{ mt: 2, backgroundColor: '#F6BD37' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {" "} {formattedDate}  &nbsp;
                <span style={{ color: test.testResult === "PASSED" ? "green" : "#ff0000" }}>
                  {test.testResult}
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: '#ffffff', textAlign: 'left', fontWeight: '400' }}>
              <TableContainer>
                <Table aria-label="vehicle details table">
                  <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                          Recorded Mileage:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">  {test.odometerValue} </TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                        Miles Difference:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">  {milesDifference} </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                        Odometer Unit:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">  {test.odometerUnit} </TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                        Test Number:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">  {test.motTestNumber} </TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>

              {/* Map through the rfrAndComments array to display the comments */}
              {test.rfrAndComments.map((comment: any, commentIndex: number) => (
                <Box key={commentIndex} sx={{ mt: 2, border: '1px solid black', background: '#e3e3e3', padding: '10px' }}>
                  Type: {comment.type}<br />
                  <i>Monitor and repair if necessary (advisories):</i> {comment.text}<br />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Card>
  );
}



export default MotOverview;