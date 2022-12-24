import React, { useCallback, useState } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      headers = { "Content-Type": "application/json" },
      body = null
    ) => {
      setLoading(true);

      let resData;
      try {
        const res = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });

        resData = await res.json();

        setLoading(false);
        
        if (!res.ok) {
          throw new Error("Staus code is not ok");
        }
      } catch (err) {

        setLoading(false);
        setError(true);
       

        setTimeout(() => {
          setError(false);
        },1000);
      }

      return resData;
    },
    []
  );

  return [loading, error, sendRequest];
}
