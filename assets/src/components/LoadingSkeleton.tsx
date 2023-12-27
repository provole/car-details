import { Grid, Skeleton } from "@mui/material";

function LoadingSkeleton() {
  return (
    <>
      {/* For variant="text", adjust the height via font-size */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Skeleton variant="rounded" width="100%" height={120} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Skeleton variant="rounded" width="100%" height={120} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
            <Grid item xs={2} sm={2} md={10} lg={10}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Skeleton variant="rectangular" width="100%" height={120} />
        </Grid>
      </Grid>
    </>
  );
}

export default LoadingSkeleton;