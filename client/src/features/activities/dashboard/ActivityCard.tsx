import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
};

export default function ActivityCard({ activity, selectActivity }: Props) {
  const { deleteActivity } = useActivities();

  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent sx={{ marginLeft: 2, marginRight: "auto" }}>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        {/* keep chip at the left side of the card */}
        <Chip
          label={activity.category}
          variant="outlined"
          sx={{ marginLeft: 3, marginRight: "auto" }}
        />
        {/* group the buttons and keep them at the right side of the card */}
        <Box display="flex" gap={3} sx={{ marginLeft: "auto", marginRight: 3 }}>
          <Button
            onClick={() => selectActivity(activity.id)}
            size="medium"
            variant="contained"
          >
            View
          </Button>
          <Button
            onClick={async () => deleteActivity.mutateAsync(activity.id)}
            size="medium"
            variant="contained"
            color="error"
            disabled={deleteActivity.isPending}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
