import React, { useState, useEffect } from "react";
import axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/Theme";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import Navbar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import EventCard from "./components/EventCard/EventCard";

import {
  API_BASE_URL,
  COMMITTES,
  EVENTS_PER_PAGE
} from "./constants/Constants";

export default function App() {
  const [events, setEvents] = useState([]); // paginated events
  const [page, setPage] = useState(1); // number of pages
  const [isReversed, setIsReversed] = useState(true);
  const [committeeFilters, setCommitteeFilters] = React.useState(""); // selected filter
  const [allEvents, setAllEvents] = useState([]); // all events, only filled when searching
  const [selectedEvent, setSelectedEvent] = useState(null); // event selected from search bar
  const [alert, setAlert] = useState(null);

  // call API to setEvents when pages, filters, or reverse option is changed
  useEffect(() => {
    const fetchEvents = () => {
      const params = {
        limit: page * EVENTS_PER_PAGE,
        committee: committeeFilters,
        reverse: isReversed
      };

      const apiUrl = `${API_BASE_URL}event/past/`;
      axios
        .get(apiUrl, { params })
        .then((res) => {
          setEvents(res.data.events);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchEvents();
  }, [committeeFilters, isReversed, page]);

  const handleFilter = (committee) => {
    if (committeeFilters === committee) {
      setAlert("Disabling filter");
      setCommitteeFilters("");
    } else {
      setCommitteeFilters(committee);
      setAlert(`Filter by ${committee}`);
    }
  };

  const handleSort = () => {
    setAlert(
      isReversed ? "Sorting Past to Present" : "Sorting Present to Past"
    );
    setIsReversed(!isReversed);
  };

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  const fetchAllEvents = () => {
    const apiUrl = `${API_BASE_URL}event/past/`;
    axios
      .get(apiUrl)
      .then((res) => {
        setAllEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    if (allEvents.length === 0) {
      fetchAllEvents();
    }
  };

  const eventToDisplay = () => {
    if (selectedEvent !== null) {
      return [selectedEvent];
    }
    return events;
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(null);
  };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar />
        <Box m={{ lg: 6, md: 4, xs: 2 }}>
          <Typography variant="h5">Past Events</Typography>
          <br />
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            alignItems="center"
            spacing={{ md: 3, xs: 1 }}
          >
            <Stack
              sx={{ width: "90%" }}
              alignItems={{ sm: "center", xs: "stretch" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
            >
              <IconButton
                sx={{ display: { xs: "none", sm: "block" } }}
                onClick={() => handleSort()}
              >
                <SortIcon />
              </IconButton>
              {COMMITTES.map((committee) => (
                <Chip
                  color={committee.toLowerCase()}
                  label={committee}
                  key={committee}
                  onClick={() => handleFilter(committee)}
                  variant={committeeFilters === committee ? "" : "outlined"}
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={2}>
              <IconButton
                sx={{ display: { xs: "block", sm: "none" } }}
                onClick={() => handleSort()}
              >
                <SortIcon />
              </IconButton>

              <SearchBar
                onOpen={handleSearch}
                value={selectedEvent}
                onChange={setSelectedEvent}
                options={allEvents}
              />
            </Stack>
          </Stack>

          <Grid
            pt={2}
            p={2}
            justifyContent="space-around"
            alignItems="center"
            container
            spacing={4}
          >
            {eventToDisplay().map((event) => (
              <Grid
                item
                alignItems="center"
                key={event.uuid}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
          {!selectedEvent ? (
            <Box textAlign="center">
              <Button color="link" variant="outlined" onClick={handleSeeMore}>
                See More
              </Button>
            </Box>
          ) : null}

          <Snackbar
            open={alert === null ? false : true}
            autoHideDuration={300}
            onClose={handleCloseAlert}
            message={alert}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}
