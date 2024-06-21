"use client";
import React, { useEffect, useState } from "react";
import { database } from "../../../components/firebase";
import { ref, onValue, push, serverTimestamp, off } from "firebase/database";
import Sidebar from "@/app/components/SidebarCanidates";
import Nav_bar from "../../../components/Nav";

const CandidateMessagePage = ({ params: { skuId } }) => {
  const [candidatesToCompaniesMessages, setCandidatesToCompaniesMessages] =
    useState([]);
  const [companiesToCandidatesMessages, setCompaniesToCandidatesMessages] =
    useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const candidatesToCompaniesRef = ref(
      database,
      `messages/${skuId}/candidatesToCompanies`
    );
    const companiesToCandidatesRef = ref(
      database,
      `messages/${skuId}/companiesToCandidates`
    );

    const handleIncomingMessages = (snapshot, setMessageState, senderType) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const newMessages = Object.entries(messagesData).map(
          ([id, message]) => ({
            ...message,
            id,
            senderType,
          })
        );
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

    return () => {
      off(candidatesToCompaniesRef, "value", candidatesToCompaniesListener);
      off(companiesToCandidatesRef, "value", companiesToCandidatesListener);
    };
  }, [skuId]);

  useEffect(() => {
    const combinedMessages = [
      ...candidatesToCompaniesMessages,
      ...companiesToCandidatesMessages,
    ];
    combinedMessages.sort((a, b) => a.timestamp - b.timestamp);
    setAllMessages(combinedMessages);
  }, [candidatesToCompaniesMessages, companiesToCandidatesMessages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(
      database,
      `messages/${skuId}/candidatesToCompanies`
    );

    push(messagesRef, {
      senderType: "candidate",
      content: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
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
        <div className="flex border-l-2 mt-16 border-black flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="flex flex-col mx-auto max-w-xl">
              {allMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderType === "company"
                      ? "justify-start"
                      : "justify-end"
                  } mb-4`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                      message.senderType === "company"
                        ? "bg-blue-500 text-white mr-auto"
                        : "bg-green-500 text-white ml-auto"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
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
