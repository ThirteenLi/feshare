/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeII() {
  const refContainer = useRef<HTMLDivElement | null>();

  const init = () => {
    if (!refContainer.current) {
      return;
    }
    const width = refContainer.current.offsetWidth;
    const height = refContainer.current.offsetHeight;
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
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
    camera.position.z = 5;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      init();
    }, 200);
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
