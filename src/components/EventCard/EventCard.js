import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { getTitleColor } from "../../theme/Theme";
import { MONTH_NAMES, DAY_NAMES } from "../../constants/Constants";

const EventCard = ({ event }) => {
  // TODO: Come up with better solution, temporary
  // measure to avoid using temporal literals

  const start = new Date(event.start);
  const end = new Date(event.end);

  const dayName = DAY_NAMES[start.getDay()];
  const month = MONTH_NAMES[start.getMonth()];
  const day = start.getDate();
  const year = start.getFullYear();

  const startTime = start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  const endTime = end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  const handleClick = () => {
    const urlTitle = event.title
      .replace(/[\W]+/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const url = `https://acmucsd.com/events/${urlTitle}-${event.uuid}`;
    window.open(url);
  };

  return (
    <Card sx={{ maxHeight: 375, maxWidth: { sm: 300 } }}>
      <CardMedia component="img" image={event.cover} />

      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="overline">{`${dayName} - ${month} ${day}, ${year}`}</Typography>
        <Typography color={getTitleColor(event.committee)} variant="h6">
          {event.title}
        </Typography>
        <Typography variant="subtitle2">{event.location} </Typography>
        <Typography variant="subtitle2">{`${startTime} - ${endTime}`}</Typography>
      </CardContent>
      <CardActions sx={{ paddingLeft: 1.5 }}>
        <Button
          onClick={handleClick}
          color={event.committee.toLowerCase()}
          size="small"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
