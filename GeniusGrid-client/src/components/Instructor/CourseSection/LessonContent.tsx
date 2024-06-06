import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

interface LessonContent {
  videoTitle: string;
  videoURL: string;
  subtitleURL: string;
  videoDescription: string;
  links: string[];
}

interface videoData {
  fileName: string;
  videoUrl: string;
}

interface LessonProps {
  lesson: LessonContent[];
  lessonIndex: number;
  onDeleteContent: (lessonIndex: number, contentIndex: number) => void;
  onAddContent: (lessonIndex: number, formData: LessonContent) => void;
  videoDetails: videoData[];
}

const LessonComponent: React.FC<LessonProps> = ({
  lesson,
  lessonIndex,
  onDeleteContent,
  onAddContent,
  videoDetails,
}) => {
  const [formData, setFormData] = useState<LessonContent>({
    videoTitle: "",
    videoURL: "",
    subtitleURL: "",
    videoDescription: "",
    links: [],
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [numLinks, setNumLinks] = useState<number>(1);
  const [selectedVideoName, setSelectedVideoName] = useState<string>("");

  const handleFormDataSubmit = () => {
    if (
      formData.videoTitle.trim() === "" ||
      formData.videoURL.trim() === "" ||
      formData.subtitleURL.trim() === "" ||
      formData.videoDescription.trim() === "" ||
      formData.links.some((link) => link.trim() === "")
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editingIndex !== null) {
      lesson[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      onAddContent(lessonIndex, formData);
    }

    setFormData({
      videoTitle: "",
      videoURL: "",
      subtitleURL: "",
      videoDescription: "",
      links: [],
    });
    setNumLinks(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = (contentIndex: number) => {
    setFormData(lesson[contentIndex]);
    setEditingIndex(contentIndex);
  };

  const handleDeleteContent = (contentIndex: number) => {
    onDeleteContent(lessonIndex, contentIndex);
  };

  const handleAddLink = () => {
    setNumLinks((prevNumLinks) => prevNumLinks + 1);
  };

  const handleLinkInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    linkIndex: number
  ) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedLinks = [...prevFormData.links];
      updatedLinks[linkIndex] = value;
      return {
        ...prevFormData,
        links: updatedLinks,
      };
    });
  };

  const handleDeleteLink = (linkIndex: number) => {
    setFormData((prevFormData) => {
      const updatedLinks = [...prevFormData.links];
      updatedLinks.splice(linkIndex, 1);
      return {
        ...prevFormData,
        links: updatedLinks,
      };
    });
    setNumLinks((prevNumLinks) => prevNumLinks - 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedVideo = videoDetails.find((video) => video.videoUrl === value);
    if (selectedVideo) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      setSelectedVideoName(selectedVideo.fileName);
    }
  };

  return (
    <div key={lessonIndex} className="mb-8 rounded-lg p-4">
      <ToastContainer />
      <p className="text-xl font-bold mb-2">Lesson {lessonIndex + 1}</p>
      {lesson.map((content, contentIndex) => (
        <div key={contentIndex} className="rounded-lg p-4 mt-4 ">
          <p className="font-semibold my-2">
            Content {contentIndex + 1} :{" "}
            <span className="text-green-500">Submitted</span>
          </p>
          <p className="mb-2">
            <strong>Title:</strong> {content.videoTitle}
          </p>
          <p className="mb-2 ">
            <strong className="">URL:</strong> {content.videoURL}
          </p>
          <p className="mb-2">
            <strong>Subtitle URL:</strong> {content.subtitleURL}
          </p>
          <p className="mb-2">
            <strong>Video Description:</strong> {content.videoDescription}
          </p>
          <p className="mb-2">
            <strong>Links:</strong>{" "}
            {content.links.map((link, linkIndex) => (
              <span key={linkIndex}>
                {link}{" "}
                <button
                  type="button"
                  onClick={() => handleDeleteLink(linkIndex)}
                  className="text-red-500 ml-2 focus:outline-none"
                >
                  ,
                </button>{" "}
              </span>
            ))}
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => handleEdit(contentIndex)}
              className="py-1 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mr-2"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteContent(contentIndex)}
              className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Delete Content
            </button>
          </div>
        </div>
      ))}
      <div className="flex-col rounded-lg p-4 mt-4">
        <p className="font-semibold">
          Add New Content : <span className="text-red-500">Not Submitted</span>
        </p>
        <div className="mb-2">
          <input
            type="text"
            name="videoTitle"
            value={formData.videoTitle}
            onChange={handleInputChange}
            placeholder="Enter Video Title"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-2 ">
          <label htmlFor={`videoUrl-${lessonIndex}`}>Select Video URL:</label>
          <select
            id={`videoUrl-${lessonIndex}`}
            name="videoURL"
            value={formData.videoURL[0]}
            onChange={handleSelectChange}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none w-full"
          >
            <option value="">Select a URL</option>
            {videoDetails.map((videoData, index) => (
              <option key={index} value={videoData.videoUrl}>
                {videoData.fileName}
              </option>
            ))}
          </select>
          {selectedVideoName && (
            <p className="text-sm mt-2">Selected Video: {selectedVideoName}</p>
          )}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="subtitleURL"
            value={formData.subtitleURL}
            onChange={handleInputChange}
            placeholder="Enter Subtitle URL"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="videoDescription"
            value={formData.videoDescription}
            onChange={handleInputChange}
            placeholder="Enter Video Description"
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none w-full"
          />
        </div>
        {[...Array(numLinks)].map((_, index) => (
          <div key={index} className="mb-2 flex items-center " >
            <input
              type="text"
              value={formData.links[index] || ""}
              onChange={(e) => handleLinkInputChange(e, index)}
              placeholder={`Enter Link ${index + 1}`}
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none mr-2"
            />

            <div className="flex items-center mb-2">
              <MdDelete
                onClick={() => handleDeleteLink(index)}
                className="text-red-500 cursor-pointer mr-2 mt-2 text-2xl"
              />
            </div>
          </div>
        ))}

        <div className="flex items-center mb-2">
          <CiCirclePlus
            onClick={handleAddLink}
            className="text-blue-500 cursor-pointer mr-2"
          />
          <span>Add Link</span>
        </div>

        <button
          type="button"
          onClick={handleFormDataSubmit}
          className="py-2 px-4 mx-4 bg-green-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          {editingIndex !== null ? "Update Content" : "Submit Content"}
        </button>
      </div>
    </div>
  );
};

export default LessonComponent;

