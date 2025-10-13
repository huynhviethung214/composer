import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useNodeDataQuery = (nodeType: string) => {
  return useQuery<Record<string, any>>({
    queryKey: [nodeType],
    queryFn: async () => {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/fetch_node_data/${nodeType}`
      );
      return res.data;
    },
  });
};
