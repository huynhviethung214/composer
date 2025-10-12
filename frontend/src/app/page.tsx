"use client";

import ReteEditor from "@/components/Editor";
import { Container, Typography, Paper } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Local Graph Editor
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <ReteEditor />
      </Paper>
    </Container>
  );
}
