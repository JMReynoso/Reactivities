import { useState } from "react";
import type { Activity } from "../../lib/types";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  //used to store the currently selected activity for activity details
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false); //used to toggle between edit mode and view mode
  const { activities, isPending } = useActivities(); // custom hook to fetch activities

  // since we can't declare a function within a function, use arrow function
  // used to display details of the selected activity
  const handleSelectActivity = (id: string) => {
    // on call, find the activity with the matching id and set selectedActivity as the selected activity
    setSelectedActivity(activities!.find((activity) => activity.id === id));
  };

  // used to remove the selected activity when the cancel button is pressed
  const handleCancelSelectActivity = () => {
    // on call, set selectedActivity to undefined to get rid of the box
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100" }}>
      <CssBaseline /> {/* removes browser's default styling */}
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ margin: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
