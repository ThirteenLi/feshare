import { Layout } from "@arco-design/web-react";
import LeftMenu from "./LeftMenu";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-[100vh] justify-center">
      <div className="h-full mx-auto w-[100%]">
        <Layout className="h-full overflow-y-auto">
          <Layout.Sider
            className="shadow-none h-full overflow-y-auto overflow-x-hidden"
            width={"40%"}
          >
            <LeftMenu />
          </Layout.Sider>
          <Layout.Content className="h-full">
            <Outlet />
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
}

export default App;
