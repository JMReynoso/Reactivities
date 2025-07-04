import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../types";
import agent from "../api/agent";

// This custom hook is used to fetch all activities from the .NET API using React Query
// updates basically does the job of our former handleSubmitForm
export const useActivities = () => {
    const queryClient = useQueryClient();

    //activites variable is use to store activities from our API
    //CORS allows us to do this which is configured in the .NET API
    const { data: activities, isPending } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
        // using axios to make a GET request to the API
        // base url is in agent.ts
        const response = await agent.get<Activity[]>(
            "/activities"
        );
        return response.data;
        },
    });

    // for updating activities
    // we use a mutation so that the cache is updated automatically
    const updateActivity = useMutation({
        // mutationFn runs when called (updateActivity.mutateAsync(data)), it pass the activity to be updated to the API
        mutationFn: async (activity: Activity) => {
            await agent.put('activities', activity)
        },
        onSuccess: async () => {
            // refetch the activities after updating
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        }
    })

    const createActivity = useMutation({
        // mutationFn runs when called (createActivity.mutateAsync(data)), it pass the activity to be updated to the API
        mutationFn: async (activity: Activity) => {
            await agent.post('activities', activity)
        },
        onSuccess: async () => {
            // refetch the activities after creating
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        }
    })

    const deleteActivity = useMutation({
        // mutationFn runs when called (deleteActivity.mutateAsync(data)), it pass the activity to be updated to the API
        mutationFn: async (id: string) => {
            await agent.delete(`activities/${id}`) // delete the activity with the given id
        },
        onSuccess: async () => {
            // refetch the activities after deleting
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        }
    })

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity
  }
}