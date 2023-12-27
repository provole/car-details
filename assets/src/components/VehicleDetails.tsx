import { Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import VehicleDetailsTable from "./VehicleDetailsTable";

type Props = {
  mot: any,
  result: any
}

const MotOverview: React.FC<Props> = ({ mot, result }) => {


  return (
    <TableContainer component={Paper} sx={{ mt: 3, padding: '20px 15px' }}>
      <Table aria-label="vehicle details table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Vehicle Details
              </Typography>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <VehicleDetailsTable title="Make" result={mot[0].make} />

          <VehicleDetailsTable title="Model Variant" result={mot[0].model} />

          <VehicleDetailsTable title="Colour" result={mot[0].primaryColour} />

          <VehicleDetailsTable title="Fuel Type" result={mot[0].fuelType} />

          <VehicleDetailsTable title="Engine Capacity" result={result.engineCapacity + "cc"} />

          <VehicleDetailsTable title="Year of Manufacture" result={result.yearOfManufacture} />

          <VehicleDetailsTable title="Date of last V5C Issued" result={result.dateOfLastV5CIssued} />

          <VehicleDetailsTable title="Type Approval" result={result.typeApproval} />

          <VehicleDetailsTable title="Wheel Plan" result={result.wheelplan} />

        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default MotOverview;