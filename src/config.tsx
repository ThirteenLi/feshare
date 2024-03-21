import ThreeI from "./ThreeI";
import ThreeII from "./ThreeII";
import ThreeIII from "./ThreeIII";
import ThreeIV from "./ThreeIV";
import ThreeV from "./ThreeV";
import ThreeVI from "./ThreeVI";
import ThreeVII from "./ThreeVII";
import ThreeVIII from "./ThreeVIII";
import ThreeImd from "./constants/three1.md?raw";
import ThreeIImd from "./constants/three2.md?raw";
import ThreeIIImd from "./constants/three3.md?raw";
import ThreeIVmd from "./constants/three4.md?raw";
import ThreeVmd from "./constants/three5.md?raw";
import ThreeVImd from "./constants/three6.md?raw";
import ThreeVIImd from "./constants/three7.md?raw";
import ThreeVIIImd from "./constants/three8.md?raw";

export const config = [
  {
    title: "创建一个立方体",
    path: "/",
    md: ThreeImd,
    element: <ThreeI />,
  },
  {
    title: "坐标轴",
    path: "/xyz",
    md: ThreeIImd,
    element: <ThreeII />,
  },
  {
    title: "dat.gui",
    path: "/datgui",
    md: ThreeIIImd,
    element: <ThreeIII />,
  },
  {
    title: "创建粒子",
    path: "/spriteMaterial",
    md: ThreeIVmd,
    element: <ThreeIV />,
  },
  {
    title: "创建粒子云",
    path: "/spriteMaterialCloud",
    md: ThreeVmd,
    element: <ThreeV />,
  },
  {
    title: "粒子使用图片",
    path: "/map",
    md: ThreeVImd,
    element: <ThreeVI />,
  },
  {
    title: "使用各种材质渲染粒子",
    path: "/textTosprit",
    md: ThreeVIImd,
    element: <ThreeVII />,
  },
  {
    title: "使用3D建模及Tween动画",
    path: "/3d",
    md: ThreeVIIImd,
    element: <ThreeVIII />,
  },
];
