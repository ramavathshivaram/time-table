import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-muted-foreground text-lg">
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        <Button> Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
