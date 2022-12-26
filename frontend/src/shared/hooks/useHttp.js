import React, { useCallback, useState } from "react";

export default function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

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
          body: body? JSON.stringify(body) :null,
        });

        resData = await res.json();

        setLoading(false);

        if (!res.ok) {
          throw new Error(resData.message);
        }

        setDone(true);

        setTimeout(() => {
          setDone(false);
        }, 1000);

        return resData;
        
      } catch (err) {
        setLoading(false);
        setError(err.message);

        setTimeout(() => {
          setError("");
        }, 5000); //POWER OF ASYNCHRONOUS EVERYTHING CONTINUES IT RETURNS AND JS REMEMBESR OH I NEED TO EXECUTE THAT

        throw new Error(err.message);
      }
    },
    []
  );

  return [loading, error, done, sendRequest];
}
