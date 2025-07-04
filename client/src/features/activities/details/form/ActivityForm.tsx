import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from "../../../../lib/types";
import type { FormEvent } from "react";
import { useActivities } from "../../../../lib/hooks/useActivities";

type Props = {
  activity?: Activity;
  closeForm: () => void;
};

export default function ActivityForm({ activity, closeForm }: Props) {
  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); //stores form data from the box component

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    }); //places all data from input fields(formData) into data variable

    // if activity is provided, it means we are editing an existing activity
    if (activity) {
      data.id = activity.id; //if we are currently editing an activity
      await updateActivity.mutateAsync(data as unknown as Activity); //update the activity with the new data using custom hook
      closeForm(); //close the form after updating
    }
    // if activity is not provided, it means we are creating a new activity
    else {
      await createActivity.mutateAsync(data as unknown as Activity); //if we are creating a new activity, use the custom hook to create it
      closeForm(); //close the form after creating
    }
  };

  return (
    <Paper sx={{ borderRadius: 5, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          } // format date to YYYY-MM-DD
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending} // disable button while mutation is pending
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
