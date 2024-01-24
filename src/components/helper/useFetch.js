import { useQuery } from "@tanstack/react-query";

export function useFetch(endpoint, key, results) {
  const { isLoading, error, data } = useQuery({
    queryKey: [endpoint, key],
    queryFn: async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (results) {
        return data[results];
      }

      return data;
    },
  });

  if (isLoading) {
    return { isLoading };
  }

  if (error) {
    console.log(error);
  }

  return { data };
}
