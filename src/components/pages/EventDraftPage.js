import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { Grid } from '@material-ui/core'
import EventCard from "./EventCard";

const EventDraftPage = () => {
  return (
    <GenericTemplate title="作成中イベント">
      <Grid container spacing={2}>
            <Grid item xs={4}> 
                <EventCard />
            </Grid>
      </Grid>
    </GenericTemplate>
  );
};

export default EventDraftPage;