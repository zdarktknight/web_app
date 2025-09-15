import React, { useState } from "react";
import "./CentralDialog.css";

const CentralDialog: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="central-dialog">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入内容…"
        />
        <button onClick={handleSend}>发送</button>
      </div>
    </div>
  );
};

export default CentralDialog;
