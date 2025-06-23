import { useEffect, useState } from "react";
import type { Activity } from "./lib/types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); //use to store activities from our C# .NET API

  //used to get/fetch activities from the .NET API when the component loads (mounted)
  // CORS allows us to do this which is configured in the .NET API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>("https://localhost:5001/api/activities");
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

  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
