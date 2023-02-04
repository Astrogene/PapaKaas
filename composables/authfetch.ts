export const useAuthFetch = (url: string, opts?: any | undefined | null) => {
    const authStore = useAuth();
    const fetched = useFetch(url, {
        ...(opts ? opts : {}),
        headers: {
            Authorization: `Bearer ${authStore.jwt_access}`,
        },
    });
    return fetched
};
