import { Layout, theme } from "antd";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};
export default AppLayout;
