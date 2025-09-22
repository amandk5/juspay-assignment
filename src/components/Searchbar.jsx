import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 265,
        borderRadius: 2,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#8d929c" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  color: "#8d929c",
                  fontSize: "1.3rem",
                  letterSpacing: "0.12em",
                }}
              >
                ⌘ /
              </Typography>
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: "", // For actual style, otherwise remove to ignore background
          input: {
            color: "#8d929c",
            fontSize: "1.2rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            paddingLeft: 1,
            paddingRight: 1,
          },
          borderRadius: 2,
        }}
      />
    </Box>
  );
}

export default SearchBar;
