import { TableCell, TableRow, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

type Props = {
  title: string,
  mot?: any,
  result?: any
}

const VehicleDetailsTable: React.FC<Props> = ({ title, mot, result }) => {

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Typography variant="body1">
          { title }
        </Typography>
      </TableCell>
      <TableCell align="right"> {mot ? mot : result} </TableCell>
    </TableRow>
  );
}

export default VehicleDetailsTable;