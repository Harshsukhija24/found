"use client";
import React, { useEffect, useState, useRef } from "react";
import { database } from "../../components/firebase";
import { ref, onValue, push, serverTimestamp, off } from "firebase/database";
import Sidebar from "@/app/components/Sidebar";
import Nav_bar from "../../components/Nav";

const CandidateMessagePage = () => {
  const [candidatesToCompaniesMessages, setCandidatesToCompaniesMessages] =
    useState([]);
  const [companiesToCandidatesMessages, setCompaniesToCandidatesMessages] =
    useState([]);
  const [messages, setMessages] = useState([]); // Define messages state
  const [newMessage, setNewMessage] = useState("");

  const messageListRef = useRef(null); // Reference for message list element

  useEffect(() => {
    const candidatesToCompaniesRef = ref(
      database,
      `messages/candidatesToCompanies`
    );
    const companiesToCandidatesRef = ref(
      database,
      `messages/companiesToCandidates`
    );

    // Function to handle incoming messages from Firebase
    const handleIncomingMessages = (snapshot, setMessageState, senderType) => {
      const messagesData = snapshot.val();
      console.log("Incoming messages data:", messagesData);

      if (messagesData) {
        const newMessages = Object.values(messagesData).map((message) => ({
          ...message,
          senderType,
        }));

        console.log("Parsed new messages:", newMessages);
        setMessageState(newMessages); // Set new messages fetched from the database
      }
    };

    // Set up listeners for both message paths
    const candidatesToCompaniesListener = onValue(
      candidatesToCompaniesRef,
      (snapshot) =>
        handleIncomingMessages(
          snapshot,
          setCandidatesToCompaniesMessages,
          "candidate"
        )
    );
    const companiesToCandidatesListener = onValue(
      companiesToCandidatesRef,
      (snapshot) =>
        handleIncomingMessages(
          snapshot,
          setCompaniesToCandidatesMessages,
          "company"
        )
    );

    // Clean up listeners when component unmounts
    return () => {
      off(candidatesToCompaniesRef, "value", candidatesToCompaniesListener);
      off(companiesToCandidatesRef, "value", companiesToCandidatesListener);
    };
  }, []); // Empty dependency to run useEffect only once

  useEffect(() => {
    // Merge and sort messages whenever either set of messages changes
    const allMessages = [
      ...candidatesToCompaniesMessages,
      ...companiesToCandidatesMessages,
    ];
    allMessages.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

    setMessages(allMessages);

    // Scroll to the bottom only after an update (prevents unnecessary scrolling)
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      console.log("Scrolled to bottom");
    }
  }, [candidatesToCompaniesMessages, companiesToCandidatesMessages]);

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, `messages/candidatesToCompanies`);

    console.log("Sending message:", newMessage);

    // Push new message to Firebase Realtime Database
    push(messagesRef, {
      senderType: "candidate",
      content: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage(""); // Clear input after sending message
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Nav_bar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <div
            className="flex-1 overflow-y-auto px-4 py-8"
            ref={messageListRef}
          >
            <div className="flex flex-col mx-auto max-w-xl">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.senderType === "candidate"
                      ? "justify-start"
                      : "justify-end"
                  } mb-4`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                      message.senderType === "candidate"
                        ? "bg-green-500 text-white mr-auto"
                        : "bg-blue-500 text-white ml-auto"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-200">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-green-500 text-white rounded-r hover:bg-green-600 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateMessagePage;
