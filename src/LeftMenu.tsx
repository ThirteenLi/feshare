import { Menu } from "@arco-design/web-react";
import { Link, useLocation } from "react-router-dom";
import Doc from "./Doc";
import { config } from "./config";

const MenuItem = Menu.Item;

export default function LeftMenu() {
  const { pathname } = useLocation();

  return (
    <Menu style={{ borderRadius: 4 }} selectedKeys={[pathname]}>
      {config.map(({ path, title, md }) => (
        <div key={path}>
          <MenuItem key={path}>
            <Link to={path}>{title}</Link>
          </MenuItem>
          {pathname === path && <Doc markdown={md} />}
        </div>
      ))}
    </Menu>
  );
}
