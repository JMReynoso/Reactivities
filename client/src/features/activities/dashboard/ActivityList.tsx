import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
import type { Activity } from "../../../lib/types";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
};

export default function ActivityList({
  activities,
  selectActivity,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* for each activity, place all content from server into a card */}
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
        />
      ))}
    </Box>
  );
}
