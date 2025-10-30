import { useEffect, useRef, useState } from "react";
import eyeicon from "../assets_admin/eyeAnime.gif";
import video_bot from "../assets_admin/botv.mp4";
import { backendUrl } from "../config";
// import Loader from "../components/Loader";
import { IoMdCopy } from "react-icons/io";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { SiFigshare } from "react-icons/si";
// import { RiProgress8Line } from "react-icons/ri";
import { RiMiniProgramFill } from "react-icons/ri";

const SearchInput = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string | object }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(backendUrl + "/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text:
          data.answer || data.reply || data.response || data.message || data,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Could not fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  

    useEffect(() => {
    if (input.trim() !== "") {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [input]);


  useEffect(() => {
    // Auto-scroll
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const renderMessage = (msg: { sender: string; text: string | object }) => {
    if (typeof msg.text === "string") {
      return (
        <pre className="whitespace-pre-wrap break-words text-sm bg-gray-100 p-2 rounded">
          {msg.text}
        </pre>
      );
    }

    return (
      <pre className="whitespace-pre-wrap break-words text-sm bg-gray-100 p-2 rounded">
        {JSON.stringify(msg.text, null, 2)}
      </pre>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-161px)] mx-auto">
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center bg-gray-50">
          <video
            src={video_bot}
            autoPlay
            loop
            muted
            playsInline
            className="w-[70%] h-[80%] object-contain"
          />
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-0.5 rounded-lg max-w-[70%] w-fit break-words ${
                msg.sender === "user"
                  ? "bg-[#8B008B] text-gray-700 ml-auto"
                  : "bg-white text-gray-900 mr-auto"
              }`}
            >
              {renderMessage(msg)}

              {msg.sender !== "user" && (
                <div className="mt-1 flex gap-3 bg-white">
                  <IoMdCopy />
                  <FaRegThumbsUp/>
                  <FaRegThumbsDown/>
                  <PiSpeakerSimpleHighFill />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="spinner-8 w-10 h-10 shrink-0 animate-spin"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 112.226c-79.277 0-143.774 64.497-143.774 143.774S176.723 399.774 256 399.774 399.774 335.277 399.774 256 335.277 112.226 256 112.226zm0 272.548c-71.006 0-128.774-57.768-128.774-128.774S184.994 127.226 256 127.226 384.774 184.994 384.774 256 327.006 384.774 256 384.774z"
                data-original="#000000"
              />
              <path
                d="M346.207 190.083a7.5 7.5 0 0 0-12.1 8.864c13.492 18.419 20.008 41.178 18.349 64.084a96.674 96.674 0 0 1-28.071 61.352c-18.856 18.856-43.616 28.282-68.384 28.28-24.762-.002-49.533-9.429-68.384-28.28-37.707-37.707-37.707-99.061 0-136.768a96.669 96.669 0 0 1 61.353-28.071c22.909-1.661 45.666 4.857 64.084 18.349a7.499 7.499 0 0 0 10.482-1.619 7.5 7.5 0 0 0-1.618-10.482c-21.287-15.592-47.575-23.123-74.032-21.209a111.677 111.677 0 0 0-70.875 32.426c-21.101 21.1-32.721 49.152-32.721 78.991s11.62 57.891 32.719 78.99c21.778 21.778 50.384 32.667 78.991 32.667s57.213-10.889 78.991-32.667a111.675 111.675 0 0 0 32.425-70.875c1.916-26.453-5.616-52.745-21.209-74.032z"
                data-original="#000000"
              />
              <path
                d="M469.174 222.471c-1.79-.787-3.105-2.612-3.529-4.929l-.029-.155c-.534-2.901 1.135-5.859 3.968-7.032l31.141-12.899a7.5 7.5 0 0 0 4.059-9.799c-10.873-26.25-36.26-43.604-64.676-44.211-1.948-.042-3.859-1.219-5.111-3.151l-.108-.167c-1.612-2.481-1.205-5.859.966-8.031l23.837-23.837a7.497 7.497 0 0 0 0-10.606c-20.081-20.081-50.167-26.402-76.642-16.106-1.821.709-4.04.35-5.944-.965l-.176-.121c-2.432-1.676-3.345-4.949-2.171-7.783l12.891-31.122a7.501 7.501 0 0 0-4.059-9.799c-26.225-10.862-56.432-5.198-76.954 14.434-1.407 1.346-3.589 1.862-5.847 1.381l-.229-.049c-2.896-.614-4.997-3.29-4.997-6.363V7.5a7.5 7.5 0 0 0-7.5-7.5c-28.409 0-54.156 16.81-65.594 42.826-.787 1.789-2.612 3.106-4.875 3.52l-.105.019-.104.019c-2.903.534-5.859-1.135-7.032-3.968l-12.899-31.141a7.497 7.497 0 0 0-9.799-4.059c-26.25 10.873-43.604 36.26-44.211 64.676-.042 1.948-1.219 3.859-3.151 5.111l-.167.108c-2.48 1.612-5.858 1.205-8.03-.966L108.26 52.308a7.5 7.5 0 0 0-10.606 0c-20.081 20.081-26.403 50.165-16.106 76.642.708 1.822.351 4.04-.964 5.944l-.122.176c-1.675 2.432-4.948 3.345-7.783 2.171L41.557 124.35a7.497 7.497 0 0 0-9.799 4.059c-10.863 26.226-5.197 56.432 14.434 76.954 1.346 1.407 1.863 3.587 1.382 5.843l-.05.233c-.614 2.895-3.29 4.997-6.363 4.997H7.5a7.5 7.5 0 0 0-7.5 7.5c0 28.409 16.811 54.156 42.826 65.594 1.79.787 3.105 2.612 3.529 4.929l.029.155c.534 2.901-1.135 5.859-3.968 7.032l-31.141 12.899a7.497 7.497 0 0 0-4.059 9.799c10.873 26.25 36.26 43.603 64.676 44.212 1.948.042 3.859 1.219 5.111 3.151l.108.167c1.612 2.481 1.205 5.858-.967 8.03L52.308 403.74a7.5 7.5 0 0 0 0 10.607c20.081 20.081 50.166 26.402 76.643 16.105 1.823-.708 4.042-.35 5.935.958l.087.06.098.068c2.432 1.676 3.346 4.949 2.171 7.783l-12.891 31.122a7.5 7.5 0 0 0 4.059 9.799c26.225 10.864 56.432 5.198 76.954-14.434 1.407-1.346 3.588-1.864 5.847-1.381l.229.048c2.895.614 4.997 3.29 4.997 6.363V504.5a7.5 7.5 0 0 0 7.5 7.5c28.409 0 54.156-16.811 65.594-42.826.787-1.79 2.612-3.105 4.928-3.529l.155-.029c2.904-.532 5.859 1.135 7.032 3.968l12.899 31.141a7.5 7.5 0 0 0 9.799 4.059c26.25-10.873 43.604-36.259 44.211-64.676.042-1.948 1.219-3.859 3.151-5.111l.167-.108c2.481-1.612 5.858-1.206 8.03.966l23.837 23.837a7.497 7.497 0 0 0 10.606 0c20.082-20.082 26.403-50.166 16.106-76.643-.708-1.822-.35-4.041.956-5.932l.13-.188c1.676-2.432 4.949-3.345 7.783-2.171l31.122 12.891a7.5 7.5 0 0 0 9.799-4.059c10.863-26.226 5.197-56.432-14.434-76.953-1.346-1.407-1.863-3.587-1.382-5.843l.05-.233c.614-2.895 3.29-4.997 6.363-4.997H504.5c4.142 0 7.5-3.359 7.5-7.501 0-28.408-16.811-54.155-42.826-65.592zm1.665 58.095c-10.115-.001-18.962 7.1-21.038 16.885l-.047.224c-1.516 7.106.434 14.332 5.215 19.331 13.772 14.396 18.852 34.82 13.825 53.724l-23.732-9.83c-9.326-3.865-20.21-.703-25.869 7.509l-.125.181c-4.14 5.993-5.11 13.43-2.596 19.896 7.224 18.576 4.104 39.397-7.782 54.945l-18.182-18.182c-7.149-7.149-18.423-8.386-26.804-2.941l-.161.104c-6.105 3.958-9.838 10.453-9.987 17.376a56.68 56.68 0 0 1-28.216 47.808l-9.838-23.751c-3.863-9.327-13.788-14.789-23.614-12.979l-.177.033c-7.173 1.312-13.123 5.887-15.915 12.239-8.025 18.253-24.956 30.775-44.362 33.366v-25.663c0-10.115-7.101-18.962-16.891-21.039l-.22-.046a22.808 22.808 0 0 0-4.752-.504c-5.47 0-10.697 2.006-14.579 5.72-14.396 13.772-34.821 18.851-53.725 13.825l9.831-23.733c3.864-9.328.702-20.21-7.598-25.93l-.091-.063c-5.994-4.14-13.431-5.11-19.896-2.597-18.576 7.224-39.396 4.104-54.945-7.781l18.182-18.181c7.15-7.149 8.386-18.424 2.942-26.804l-.104-.161c-3.958-6.105-10.453-9.839-17.376-9.987a56.685 56.685 0 0 1-47.808-28.217l23.751-9.838c9.327-3.863 14.786-13.791 12.98-23.604l-.035-.187c-1.312-7.173-5.887-13.123-12.239-15.915-18.253-8.025-30.775-24.956-33.366-44.362h25.663c10.115 0 18.962-7.101 21.038-16.886l.047-.224c1.516-7.106-.434-14.332-5.215-19.331-13.772-14.396-18.852-34.821-13.825-53.725l23.732 9.83c9.329 3.864 20.21.702 25.876-7.52l.117-.169c4.14-5.993 5.111-13.431 2.597-19.896-7.224-18.576-4.104-39.396 7.781-54.944l18.182 18.182c7.149 7.149 18.423 8.385 26.81 2.937l.155-.1c6.104-3.958 9.837-10.453 9.986-17.376.426-19.937 11.277-37.988 28.216-47.809l9.838 23.752c3.863 9.327 13.785 14.785 23.589 12.983l.202-.037c7.173-1.313 13.122-5.888 15.914-12.239A56.684 56.684 0 0 1 280.56 15.5v25.663c0 10.115 7.101 18.962 16.891 21.038l.221.047c7.105 1.515 14.333-.434 19.331-5.215 14.397-13.772 34.822-18.851 53.725-13.825l-9.828 23.73c-3.864 9.328-.702 20.209 7.52 25.877l.169.116c5.993 4.14 13.432 5.111 19.896 2.597a56.69 56.69 0 0 1 54.944 7.781l-18.182 18.182c-7.149 7.149-8.385 18.424-2.941 26.804l.104.16c3.958 6.105 10.453 9.839 17.376 9.987a56.681 56.681 0 0 1 47.808 28.217l-23.752 9.839c-9.326 3.864-14.785 13.791-12.983 23.584l.038.206c1.312 7.173 5.887 13.123 12.239 15.916 18.253 8.025 30.775 24.956 33.366 44.362h-25.663z"
                data-original="#000000"
              />
            </svg>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-2 bg-white">
        <div className="relative flex-1">
          <img
            src={eyeicon}
            alt="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            className="w-full text-gray-700 !border-3 border-[#8B008B]  p-2 pl-10 pr-2 focus:outline-none focus:border-[#8B008B] focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}

          />
        </div>
        <button
          onClick={handleSend}
          className="bg-[#8B008B] text-white px-4 rounded hover:bg-purple-950 cursor-pointer"
          disabled={loading}
        >
             {loading ? <RiMiniProgramFill className="w-8 h-8"/> : isTyping ? <BsArrowUpCircleFill className="w-8 h-8" /> : <SiFigshare className="w-8 h-8"/>}

        </button>
      </div>
    </div>
  );
};

export default SearchInput;
