import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js"
import { API_PATH } from "../utils/apiPath.js";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO)

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error)
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false
        }
    }, [updateUser, clearUser, navigate]);
}



// Purpose:
// It is a React hook that checks if a user is authenticated when a page (component) loads, tries to fetch the user's info if not, and handles logout/redirection if the user is unauthenticated.


// On page load, it checks: "Do we know who the user is?"

// If yes → Do nothing.
// If no → Ask the backend for user info.
//   If backend returns info → Store it.
//   If not → Log user out and redirect to login.