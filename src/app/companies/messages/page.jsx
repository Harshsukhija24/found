"use client";
import React, { useEffect, useState, useRef } from "react";
import { database } from "../../components/firebase";
import { ref, onValue, push, serverTimestamp, off } from "firebase/database";
import Nav_bar from "../../companies/components/Nav_Bar";
import Sidebar from "../../companies/components/side_bar";

const CompanyMessagePage = () => {
  const [candidatesToCompaniesMessages, setCandidatesToCompaniesMessages] =
    useState([]);
  const [companiesToCandidatesMessages, setCompaniesToCandidatesMessages] =
    useState([]);
  const [messages, setMessages] = useState([]); // Define messages state
  const [newMessage, setNewMessage] = useState("");

  const messageListRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered, setting up message listeners...");

    const candidatesToCompaniesRef = ref(
      database,
      `messages/candidatesToCompanies`
    );
    const companiesToCandidatesRef = ref(
      database,
      `messages/companiesToCandidates`
    );

    const handleIncomingMessages = (snapshot, setMessageState, senderType) => {
      console.log("handleIncomingMessages triggered with snapshot:", snapshot);
      const messagesData = snapshot.val();
      console.log("Incoming messages data:", messagesData);
      if (messagesData) {
        const newMessages = Object.values(messagesData).map((message) => ({
          ...message,
          senderType,
        }));
        console.log("Parsed new messages:", newMessages);
        setMessageState(newMessages);
      }
    };

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

    console.log("Listeners set up");

    return () => {
      console.log("Cleaning up listeners...");
      off(candidatesToCompaniesRef, "value", candidatesToCompaniesListener);
      off(companiesToCandidatesRef, "value", companiesToCandidatesListener);
    };
  }, []);

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

  const handleSendMessage = () => {
    console.log("handleSendMessage triggered with message:", newMessage);
    if (newMessage.trim() === "") {
      console.log("Message is empty, not sending");
      return;
    }

    const messagesRef = ref(database, `messages/companiesToCandidates`);

    console.log("Pushing message to Firebase:", newMessage);
    push(messagesRef, {
      senderType: "company",
      content: newMessage,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("Message sent successfully");
        setNewMessage(""); // Clear input after sending message
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
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
                    message.senderType === "company"
                      ? "justify-end"
                      : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                      message.senderType === "company"
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-green-500 text-white mr-auto"
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
                onChange={(e) => {
                  console.log("Message input changed:", e.target.value);
                  setNewMessage(e.target.value);
                }}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
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

export default CompanyMessagePage;
