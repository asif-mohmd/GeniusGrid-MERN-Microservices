import  { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi"; // Importing upload icon from react-icons library
import { FaSpinner } from "react-icons/fa"; // Importing spinner icon from react-icons library
import { confirmAlert } from "react-confirm-alert"; // Importing confirmation dialog functionality
import "react-confirm-alert/src/react-confirm-alert.css"; // Importing default styles for confirmation dialog
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardTranscodeVideo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state
  const inputRef = useRef<HTMLInputElement>(null); // Ref for file input element

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      
      if (file.type !== "video/mp4") {
        setErrorMessage("Only MP4 format is allowed.");
        return;
      }
      
      const maxSize = 300 * 1024 * 1024; 
      if (file.size > maxSize) {
        setErrorMessage("Maximum file size allowed is 300MB.");
        return;
      }
  
      setSelectedFile(file);
      setErrorMessage(null);
    }
  };
  

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear input
    }
  };

  const handleUploading = () =>{
    toast.error("Please wait to finish current uploading")
  }

  const handleSubmit = async () => {
    if (selectedFile) {
      confirmAlert({
        title: "Confirm",
        message: "Are you sure to upload the video?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const formData = new FormData();
              formData.append("file", selectedFile);
              setErrorMessage(null);
              setLoading(true); // Set loading state to true before starting upload

              try {
                const response = await axios.post(
                  "http://localhost:8087/transcode",
                  formData,
                  {
                    withCredentials: true,
                  }
                );

                if (response.status === 200) {
                  setErrorMessage(null);
                  clearFile();
                  toast.success("Upload completed!");
                } else {
                  toast.error("Something went wrong. Try again!");
                }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error:any) {
                console.error("Error:", error);
                if (error.response && error.response.status === 503) {
                  toast.error("Video not supported. Try again");
                } else {
                  setErrorMessage("Error uploading video. Please try again.");
                }
              }finally {
                setLoading(false); // Set loading state to false after upload completes
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div className="container mx-auto py-8">
       <ToastContainer />
      <div className="border border-dashed border-gray-400 rounded-lg p-8">
        <label
          htmlFor="videoinput"
          className="flex items-center justify-center w-full h-32 bg-gray-100 cursor-pointer rounded-lg"
        >
          {loading ? (
            <FaSpinner className="animate-spin w-8 h-8 mr-2" />
          ) : (
            <FiUpload className="w-8 h-8 mr-2" />
          )}
          <span className="text-lg">{loading ? "Uploading, please wait..." : "Choose a video"}</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="videoinput"
          accept=".mp4"
          ref={inputRef} // Assign ref to input element
        />
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        {selectedFile !== null && (
          <div className="mt-4 flex items-center">
            <p className="text-gray-700">Selected File: {selectedFile.name}</p>
            <button className="text-red-500 underline ml-2" onClick={clearFile}>
              Clear
            </button>
          </div>
        )}

        {loading ?  <button
          className="mt-4 bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed "
          onClick={handleUploading}
        >
          Submit
        </button> : 
        <button
          className="mt-4 page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white "
          onClick={handleSubmit}
        >
          Submit
        </button>
        }
      </div>
    </div>
  );
}

export default DashboardTranscodeVideo;
