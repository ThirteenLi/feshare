/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";

export default function ThreeII() {
  const refContainer = useRef<HTMLDivElement | null>();
  const refGui = useRef({
    cubeAniStep: 0.04,
    cubeAniHeight: 5,
  });
  const refCamera = useRef<THREE.PerspectiveCamera>();
  const refScene = useRef<THREE.Scene>();
  const refRenderer = useRef<THREE.Renderer>();
  const refGuiObj = useRef<dat.GUI>();
  const init = () => {
    if (!refContainer.current) {
      return;
    }
    if (!refGuiObj.current) {
      refGuiObj.current = new dat.GUI();
      refGuiObj.current.add(refGui.current, "cubeAniStep", 0, 0.5);
      refGuiObj.current.add(refGui.current, "cubeAniHeight", 0, 10);
    }
    const width = refContainer.current.offsetWidth;
    const height = refContainer.current.offsetHeight;
    // 创建场景
    refScene.current = new THREE.Scene();
    // 创建相机
    refCamera.current = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    // 创建渲染器
    refRenderer.current = new THREE.WebGLRenderer();
    const scene = refScene.current;
    const camera = refCamera.current;
    const renderer = refRenderer.current;
    renderer.setSize(width, height);
    refContainer.current.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BoxGeometry();
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x66ccff });
    const cube = new THREE.Mesh(geometry, material);
    // 创建坐标系
    const axes = new THREE.AxesHelper(50);
    // 将几何体添加到场景中
    scene.add(cube);
    scene.add(axes);

    // 渲染场景
    camera.position.x = -5;
    camera.position.y = 5;
    camera.position.z = 10;
    camera.lookAt(scene.position);

    //动画
    let step = 0;
    function animate() {
      requestAnimationFrame(animate);
      step += refGui.current.cubeAniStep;
      cube.position.x = 1 + 5 * Math.cos(step);
      cube.position.y = refGui.current.cubeAniHeight * Math.abs(Math.sin(step));
      // camera.lookAt(cube.position);
      renderer.render(scene, camera);
    }
    animate();
  };

  const onResize = () => {
    if (refContainer.current && refRenderer.current && refCamera.current) {
      refRenderer.current.setSize(
        refContainer.current.offsetWidth,
        refContainer.current.offsetHeight
      );
      refCamera.current.aspect =
        refContainer.current.offsetWidth / refContainer.current.offsetHeight;
      refCamera.current.updateProjectionMatrix(); // 调用此方法更新投影矩阵，以确认修改生效
    }
  };
  useLayoutEffect(() => {
    setTimeout(() => {
      init();
      if (refContainer.current) {
        // 监听屏幕变化
        refContainer.current.addEventListener("resize", onResize);
      }
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (refGuiObj.current) {
        refGuiObj.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="h-full w-full"
      ref={(ref) => {
        refContainer.current = ref;
      }}
    ></div>
  );
}
