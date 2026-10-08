import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import RecordTag from "../RecordTag/RecordTag";
import { formatAttemptResult } from "../../lib/attempt-result";

function RecordList({ title, records }) {
  const wrCount = records.filter((record) => record.tag === "WR").length;
  const crCount = records.filter((record) => record.tag === "CR").length;
  const nrCount = records.filter((record) => record.tag === "NR").length;

  return (
    <List dense={true} disablePadding>
      {title && (
        <ListSubheader disableSticky>
          {title} (
          {wrCount === 0 ? `` : `WR: ${wrCount}`}
          {wrCount > 0 && (crCount > 0 || nrCount > 0) ? `, ` : ``}
          {crCount === 0 ? `` : `CR: ${crCount}`}
          {crCount > 0 && nrCount > 0 ? `, ` : ``}
          {nrCount === 0 ? `` : `NR: ${nrCount}`}
          )
        </ListSubheader>
      )}

      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        {records.map((record) => (
          <ListItemButton
            key={record.id}
            component={Link}
            to={`/competitions/${record.result.round.competitionEvent.competition.id}/rounds/${record.result.round.id}`}
          >
            <ListItemIcon>
              <RecordTag recordTag={record.tag} />
            </ListItemIcon>

            <ListItemText
              primary={
                <span>
                  <span>{`${record.result.round.competitionEvent.event.name} ${record.type} of `}</span>
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {`${formatAttemptResult(
                      record.attemptResult,
                      record.result.round.competitionEvent.event.id,
                    )}`}
                  </Box>
                </span>
              }
              secondary={
                <>
                  <span translate="no">{record.result.person.name}</span> from{" "}
                  {record.result.person.country.name}
                </>
              }
            />
          </ListItemButton>
        ))}
      </Box>
    </List>
  );
}

export default RecordList;
