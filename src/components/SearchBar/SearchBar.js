import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTitleColor } from "../../theme/Theme";

const SearchBar = ({ onOpen, value, onChange, options }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newEvent) => {
        onChange(newEvent);
      }}
      disablePortal
      noOptionsText="Fetching all events..."
      onOpen={() => onOpen()}
      id="combo-box-demo"
      getOptionLabel={(option) => option.title}
      options={options}
      sx={{ width: { sm: "20vw", xs: "60vw" } }}
      renderOption={(props, option) => (
        <Box
          sx={{ margin: "0 !important" }}
          component="li"
          {...props}
          key={option.uuid}
        >
          <Typography
            sx={{ margin: 0 }}
            color={getTitleColor(option.committee)}
            variant="caption"
          >
            {option.title}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} size="small" label="Search..." />
      )}
    />
  );
};

export default SearchBar;
