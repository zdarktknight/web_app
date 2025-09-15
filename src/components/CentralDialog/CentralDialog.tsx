import React, { useState } from "react";
import "./CentralDialog.css";

const CentralDialog: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    let aiMsg = { role: "ai", content: "" };
    setMessages((msgs) => [...msgs, aiMsg]);

    try {
      const response = await fetch("http://localhost:7890/api/llm/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        result += chunk;
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          newMsgs[newMsgs.length - 1] = { role: "ai", content: result };
          return newMsgs;
        });
      }
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", content: "模型接口异常，请稍后重试。" },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="central-dialog">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message ai">模型生成中...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入内容…"
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()}>
          发送
        </button>
      </div>
    </div>
  );
};

export default CentralDialog;
