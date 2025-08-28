import { Box, Button } from "@mui/material";

export default function AddLineButton({ onClick }: { onClick: () => void }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button variant="outlined" onClick={onClick}>
        Adicionar linha
      </Button>
    </Box>
  );
}
