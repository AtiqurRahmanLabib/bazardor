"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
        }),
      );
    };

    updateDate();

    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return <>{date}</>;
};

export default CurrentDate;