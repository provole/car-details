import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Button, TextField, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, IconButton, CardMedia } from '@mui/material';
import LoadingSkeleton from "./LoadingSkeleton";
import 'car-makes-icons/dist/style.css';
// import { CarMakeIcon } from 'car-makes-icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import axios from "axios";
import TaxOverview from "./TaxOverview";
import MotOverview from "./MotOverview";
import VehicleDetails from "./VehicleDetails";
import MotAccordion from "./MotAccordion";

function CarDetails() {

  const [result, setResult] = useState<any>({});
  const [mot, setMot] = useState<any>({});
  const [registration, setRegistration] = useState("");
  const [loading, setLoading] = useState(false); // add loading state
  const [error, setError] = useState(false);

  const handleregistrationChange = (event: any) => {
    setRegistration(event.target.value);
  };

  useEffect(() => {
    console.log('Tax', result);
  }, [result]);

  useEffect(() => {
    console.log('Mot', mot);
  }, [mot]);



  const handleClick = () => {
    if (!registration) {
      return;
    }
    const cleanedRegistration = registration.replace(/\s+/g, '');
    setLoading(true); // set loading to true before sending the request
    axios.post("http://localhost:8080/search", { registration: cleanedRegistration })
      .then(response => {
        if (response && response.data && response.data.error) {
          setError(true);
          return;
        }

        setResult(JSON.parse(response.data.TAX));
        setMot(JSON.parse(response.data.MOT));
        setLoading(false);
        setError(false); // set loading to false when response is received

        console.log(response.data);


        console.log(result);
        console.log(mot);
      })
      .catch(error => console.log(error));
  };8000
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mt: 5, pb: 5, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <input className="regSearch" placeholder="TE57 RGN" type="text" value={registration} onChange={handleregistrationChange} />
              <Button className="regSubmit" variant="contained" color="primary" onClick={handleClick} sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
              }}>Search</Button>
            </Stack>
            <Stack sx={{ mt: 2 }}>
              {!loading && Object.keys(mot).length > 0 && (
                <>
                  <Typography align="center" variant="h3" sx={{ fontWeight: '700' }}>
                    {mot[0].make} {mot[0].model}
                    {/* <CarMakeIcon make={mot[0].make} /> */}
                  </Typography>
                </>
              )}
            </Stack>

            {error && (
              <Typography>Error reg not found.</Typography>
            )}

            <Stack>
              {loading ? ( // conditionally render LoadingSkeleton
                <LoadingSkeleton />
              ) : (
                <>
                  <Grid container spacing={3} sx={{ mt: 3}}>
                    {!loading && Object.keys(result).length > 0 && (
                      <Grid item xs={12} sm={12} md={6} lg={6} >
                        <TaxOverview result={result} />
                      </Grid>
                    )}
                     {!loading && Object.keys(mot).length > 0 && (
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                      <MotOverview mot={mot} />
                    </Grid>
                     )}
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                      {!loading && Object.keys(result).length > 0 && (
                        <Box sx={{ mt: 3, textAlign: 'center' }}>

                          <VehicleDetails mot={mot} result={result} />

                        </Box>
                      )}
                    </Grid>

                    <Grid item sm={12} md={6} lg={6} >
                      {!loading && Object.keys(mot).length > 0 && (
                        <Box sx={{ mt: 3, textAlign: 'center' }}>

                          <MotAccordion mot={mot} />

                        </Box>
                      )}
                    </Grid>
                  </Grid>

                </>
              )}
            </Stack>
          </Box>
        </Box>
      </Container >
    </>
  );
}

export default CarDetails;
