import { useQuery } from "@tanstack/react-query";
import { getUserDetailsApi } from "@/lib/apis/user.api.js";

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserDetailsApi,
    staleTime: 5 * 60 * 1000,
  });
};
