import { useAuthStore } from "~/stores/auth";

export const useAuthFetch = (url: string, opts?: any | undefined | null) => {
    const authStore = useAuthStore();
    return useFetch(url, {
        ...(opts ? opts : {}),
        headers: {
            Authorization: `Bearer ${authStore.jwt_access}`,
        },
    });
};