import React from "react";
import { Grid } from '@material-ui/core'
import GenericTemplate from "../templates/GenericTemplate";
import EventCard from "./EventCard";

const EventOpenPage = () => {
  return (
    <GenericTemplate title="公開中イベント">
      <Grid container spacing={2}>
          <Grid item xs={4}> 
              <EventCard />
          </Grid>
          <Grid item xs={4}> 
              <EventCard />
          </Grid>
          <Grid item xs={4}> 
              <EventCard />
          </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default EventOpenPage;