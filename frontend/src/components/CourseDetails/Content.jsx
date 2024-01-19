import React, { useEffect, useState } from "react";

import { Topics } from "./Topics";

export const Content = ({ content, expandAll, course }) => {
  const [activeWeek, setActiveWeek] = useState(false);

  const toggleWeek = () => setActiveWeek(!activeWeek);

  useEffect(() => {
    if (expandAll) {
      setActiveWeek(true);
    } else {
      setActiveWeek(false);
    }
  }, [expandAll]);

  return (
    <div key={content?.week} className="border p-2 hover:bg-neutral-50">
      <p
        className={`hover:cursor-pointer text-lg pl-2 ${
          activeWeek &&
          "underline underline-offset-[3px] decoration-neutral-400 font-semibold"
        }`}
        onClick={() => toggleWeek(content?.week)}
      >
        Week {content?.week}
      </p>
      {activeWeek && (
        <Topics topics={content?.topics} course={course} week={content?.week} />
      )}
    </div>
  );
};
