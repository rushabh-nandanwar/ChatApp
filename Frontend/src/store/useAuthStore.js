import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

// Loading State

    authUser: null,        // Stores logged-in user's data (null = not logged in)
    isSigningUp: false,     // Tracks if user just signed up
    isLoggedIn: false,     // Tracks if user is logged in
    isUpdatingProfile: false, // Tracks if profile update is in progress

    isCheckingAuth: true,  // Tracks if auth verification is in progress

    checkAuth: async () => {
        try {

            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});

        } catch (error) {

            console.log("Error in checkAuth", error);                
            set({authUser: null});

        } finally {

            set({isCheckingAuth: false});

        }
    },

    signup : async (data) => {
        set({isSigningUp: true})
        try {
            const res = axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            toast.success("Account Created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    }

}));