import { useEffect, useState } from "react";
import Overview from "./Overview";
import Resources from "./Resources";
import Reviews from "./Reviews";
import Comments from "./Comments";
import { Lesson } from "../../../../interfaces/UserInterfaces/ICourseDetails";
import { User } from "../../../../interfaces/UserInterfaces/IUserDetails";

interface PurchaseContentsProps {
  selectedVideoDescription: string | null;
  selectedVideoLinks: string[] | null;
  courseId:string,
  videoId:string
  courseLessons:Lesson | unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions :any
  onQuestionAdded: () => void,
  userDetails: User | object


}
const PurchaseContents: React.FC<PurchaseContentsProps> = ({
  selectedVideoDescription,
  selectedVideoLinks,
  courseId,
  videoId,
  questions,
  onQuestionAdded,
  userDetails
}) => {
  const [activeComponent, setActiveComponent] = useState<string>("Overview"); // Track active component

  const handleComponentClick = (componentName: string) => {
    setActiveComponent(componentName === activeComponent ? "" : componentName);
  };

  useEffect(()=>{

  })

  




  return (
    <div>
      <div className="flex w-full items-center  justify-between rounded bg-gray-500 bg-opacity-20 p-2 px-4 shadow-inner shadow-[bg-gray-700] backdrop-blur">
        <div
          onClick={() => handleComponentClick("Overview")}
          className={`cursor-pointer ${
            activeComponent === "Overview" ? "text-blue-600" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Overview
        </div>
        <div
          onClick={() => handleComponentClick("Resources")}
          className={`cursor-pointer ${
            activeComponent === "Resources" ? "text-blue-600" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Resources
        </div>
        <div
          onClick={() => handleComponentClick("Comments")}
          className={`cursor-pointer ${
            activeComponent === "Comments" ? "text-blue-600" : "text-gray-500"
          } hover:text-blue-600`}
        >
          QA
        </div>
        <div
          onClick={() => handleComponentClick("Reviews")}
          className={`cursor-pointer ${
            activeComponent === "Reviews" ? "text-blue-600" : "text-gray-500"
          } hover:text-blue-600`}
        >
          Reviews
        </div>
      </div>
      <div className="bg-gray-100 p-3">
        {activeComponent === "Overview" && (
          <Overview selectedVideoDescription={selectedVideoDescription} />
        )}
        {activeComponent === "Resources" && (
          <Resources selectedVideoLinks={selectedVideoLinks} />
        )}
        {activeComponent === "Comments" && <Comments 
        courseId={courseId} videoId={videoId}  questions={questions} onQuestionAdded={onQuestionAdded} userDetails={userDetails}

        />}
        {activeComponent === "Reviews" && <Reviews />}
      </div>
    </div>
  );
};

export default PurchaseContents;
