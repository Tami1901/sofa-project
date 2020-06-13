import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Page: React.FC = () => {
  const [state, setState] = useState<any>();

  useEffect(() => {
    console.log("Effect");
  }, [state]);

  console.log("Here");

  useEffect(() => {
    setTimeout(() => {
      setState(10);
    }, 500);
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      {state}
    </div>
  );
};

export default Page;
