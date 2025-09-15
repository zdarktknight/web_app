import "./Sidebar.css";

type SidebarProps = {
  onNavigate: (section: string) => void;
};

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const navItems = [
    { icon: "🏠", text: "Home", action: () => onNavigate("home") },
    { icon: "🤖", text: "AI助手", action: () => onNavigate("ai") },
    { icon: "📊", text: "数据中心", action: () => onNavigate("data") },
    { icon: "🌟", text: "Top Authors", action: () => onNavigate("authors") },
    { icon: "📰", text: "Feed", action: () => onNavigate("feed") },
    { icon: "✉️", text: "Contact", action: () => onNavigate("contact") },
  ];

  return (
    <div className="sidebar">
      {navItems.map((item, idx) => (
        <div
          key={idx}
          className="sidebar-item"
          onClick={item.action}
          style={{ cursor: "pointer" }}
        >
          <span className="sidebar-icon">{item.icon}</span>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
