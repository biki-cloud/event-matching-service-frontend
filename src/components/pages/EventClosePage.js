import React from "react";
import { Grid } from '@material-ui/core'
import GenericTemplate from "../templates/GenericTemplate";
import EventCard from "./EventCard";

const EventClosePage = () => {
  return (
    <GenericTemplate title="過去のイベント">
      <Grid container spacing={2}>
            <Grid item xs={4}> 
                <EventCard />
            </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default EventClosePage;