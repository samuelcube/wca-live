import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import CompetitionList from "../CompetitionList/CompetitionList";

function HomeCompetitions({ past, inProgress, upcoming }) {
  const [tabValue, setTabValue] = useState(
    inProgress.length > 0 ? "inProgress" : "upcoming",
  );
  const competitions = { past, inProgress, upcoming }[tabValue];

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <>
      <Tabs
        indicatorColor="secondary"
        textColor="inherit"
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="Upcoming (${upcoming.length})" value="upcoming" />
        {inProgress.length > 0 && <Tab label="Right now (${inProgress.length})" value="inProgress" />}
        {past.length > 0 && <Tab label="Past month (${past.length})" value="past" />}
      </Tabs>
      <CompetitionList competitions={competitions} />
    </>
  );
}

export default HomeCompetitions;
