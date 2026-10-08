import React from "react";
import hero from "./photos/1-14-championship-group.jpg";

export function CourtScene() {
  return (
    <div className="editorial-stage club-photo-stage">
      <div className="artwork">
        <img
          src={hero}
          alt="Husky Pickleball Club group at the 2026 NCPA National Collegiate Pickleball Championship"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
