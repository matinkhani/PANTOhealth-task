import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  url: string;
  options?: AxiosRequestConfig;
};

export const useGet = <T>({ url, options }: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getData() {
    setIsLoading(true);

    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setData(response?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data ?? "An Error Accourd!");
      } else {
        setError("Unknown Error!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, error };
};
