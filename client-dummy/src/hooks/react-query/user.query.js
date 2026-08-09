import { useQuery } from "@tanstack/react-query";
import {
  getUserDetailsApi,
  getUnreadNotifications,
} from "@/lib/apis/user.api.js";

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserDetailsApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUnreadNotifications = () => {
  return useQuery({
    queryKey: ["unread-notifications"],
    queryFn: getUnreadNotifications,
    staleTime: 5 * 60 * 1000,
  });
};
