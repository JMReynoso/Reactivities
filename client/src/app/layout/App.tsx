import { useEffect, useState } from "react";
import type { Activity } from "../../lib/types";
import { Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //use to store activities from our C# .NET API
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined); //used to store the currently selected activity for activity details
  const [editMode, setEditMode] = useState(false); //used to toggle between edit mode and view mode

  //used to get/fetch activities from the .NET API when the component loads (mounted)
  // CORS allows us to do this which is configured in the .NET API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>(
          "https://localhost:5001/api/activities"
        );
        if (!response.data) {
          throw new Error("girl we flopped at getting the data omg");
        }
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities: ", error);
      }
    };

    fetchActivities();
  }, []);

  // since we can't declare a function within a function, use arrow function
  // used to display details of the selected activity
  const handleSelectActivity = (id: string) => {
    // on call, find the activity with the matching id and set selectedActivity as the selected activity
    setSelectedActivity(activities.find((activity) => activity.id === id));
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

  const handleSubmitForm = (activity: Activity) => {
    // if the activity has an id, we are editing an existing activity
    if (activity.id) {
      setActivities(
        activities.map((originalActivity) =>
          originalActivity.id === activity.id ? activity : originalActivity
        )
      );
    }
    // if the activity does not have an id, we are creating a new activity
    else {
      const newActivity = { ...activity, id: activities.length.toString() }; // create a new activity with a unique id
      setSelectedActivity(newActivity); // after creating the new activity, set it as the selected activity
      setActivities([...activities, newActivity]); // add the new activity to the list of activities
    }
    setEditMode(false); // close the form after submitting
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  }

  return (
    <>
      <CssBaseline /> {/* removes browser's default styling */}
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ margin: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
