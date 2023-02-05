export const useAuthFetch = async (url: string, opts?: any | undefined | null) => {
    const authStore = useAuth();
    const fetched = await useFetch(url, {
        ...(opts ? opts : {}),
        headers: {
            Authorization: `Bearer ${authStore.jwt_access}`,
        },
    });
    return fetched
};
