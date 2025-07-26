import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  {
    key: "/",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/goals",
    icon: <AimOutlined />,
    label: "Goals",
  },
];

const AppSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className="demo-logo-vertical"
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, .2)",
          borderRadius: "6px",
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSider;
