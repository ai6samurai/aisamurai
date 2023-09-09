import * as React from 'react';

import { Card, CardContent, Box, Typography } from '@mui/material';

  export default function OutlinedCard({story}) {
    return (
      <Box >
        <Card variant="outlined" sx={{ borderRadius: 5, height: '70vh', width: '50vh', overflow: 'auto' }}>
        <CardContent>
        <Typography sx={{ fontSize: 14 }}>
        {story}
        </Typography>
        </CardContent>
        </Card>
      </Box>
    );
  }