/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from "react";
import { userAxios } from "../../../../constraints/axiosInterceptors/userAxiosInterceptors";
import courseEndspoints from "../../../../constraints/endpoints/courseEndspoints";
import userEndpoints from "../../../../constraints/endpoints/userEndpoints";
import { User } from "../../../../interfaces/UserInterfaces/IUserDetails";
import { toast } from "react-toastify";
import { FaReply, FaPaperPlane } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { BiSolidHide } from "react-icons/bi";

interface PurchaseContentsProps {
  courseId: string,
  videoId: string,
  questions: any,
  onQuestionAdded: () => void,
  userDetails: User | any
}

const Comments: React.FC<PurchaseContentsProps> = ({ courseId, videoId, questions, onQuestionAdded, userDetails }) => {
  const [question, setQuestion] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [replyAnswer, setReplyAnswer] = useState<string>("")

  const handleReplayToggle = (index: number) => {
    setSelectedQuestionIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleQuestionSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      user: {
        name: userData?.name || "Anonymous",
        avatar: userData?.avatar || "https://via.placeholder.com/40"
      },
      question: question,
      questionReplies: [],
      createdAt: Date.now()
    };

    const questionDetails = {
      newQuestion,
      courseId,
      videoId
    };

    try {
      const response = await userAxios.post(courseEndspoints.addQuestion, questionDetails);
      if (response) {
        setQuestion("");
        onQuestionAdded();
      } else {
        toast.error("Something went wrong")
      }

    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleReplayAnswer = async (questionId: string) => {
    if (replyAnswer === "") {
      toast.error("Please fill replay")
    } else {
      const answerList = {
        user: {
          name: userDetails.name || "",
          avatar: userDetails.avatar || "https://via.placeholder.com/40"
        },
        replyAnswer,
        createdAt: Date.now(),
      };

      const response = await userAxios.post(courseEndspoints.replyQuestionAnswer, { answerList, courseId, videoId, questionId })
      if (response) {
        setReplyAnswer("");
        onQuestionAdded();
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDetails = await userAxios.get(userEndpoints.userDetails);
        setUserData(userDetails.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can use toLocaleDateString() for date only
  };

  return (
    <div className="mt-4">
      <div className="flex items-start">
        <textarea
          id="message"
          value={question}
          rows={4}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full px-4 py-2 text-sm text-black bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          className="md:ml-2 mt-7 md:px-3 md:py-1 py-1 px-1 pl-2 ml-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md flex items-center"
          onClick={handleQuestionSubmit}
        >
          <FaPaperPlane className="mr-2 md:block " /> <p className="hidden md:block">Submit</p>
        </button>
      </div>

      <div className="mt-4">
        {questions.map((question: any, index: any) => (
          <div key={index} className="border-b border-gray-300 py-4">
            
            <div className="flex items-start">
              <img src={question.user.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className=" font-semibold font-roboto">{question.user.name}</p>
                  
                  <button
                    className="text-xs text-gray-500 focus:outline-none mt-3 mr-4"
                    onClick={() => handleReplayToggle(index)}
                  >
                    {selectedQuestionIndex === index ? <BiSolidHide size={25}/> : <IoMdChatbubbles size={23} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">{formatDate(question.createdAt)}</p>
                <p className="text-sm">{question.question}</p>
                {selectedQuestionIndex === index && (
                  <div className="mt-2 ml-10">
                    {question.questionReplies.map((reply: any, replyIndex: any) => (
                      <div key={replyIndex} className="mt-4 flex items-start">
                        <img src={reply.user.avatar} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                        <div className="flex-1">
                          <p className="text-sm font-roboto font-semibold">{reply.user.name}</p>
                          <p className="text-xs">{reply.replyAnswer}</p>
                          <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                    <div className=" flex items-start border-b-2 mt-6">
                      <input
                        type="text"
                        className="bg-gray-100 w-full text-black border-gray-300 rounded-md px-2 py-1 placeholder-gray-500"
                        value={replyAnswer}
                        onChange={(e) => setReplyAnswer(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <button
                        className="ml-2 text-gray-600 hover:text-gray-900 flex items-center"
                        onClick={() => handleReplayAnswer(question._id)}
                      >
                        <FaReply className="mr-1" /> Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
