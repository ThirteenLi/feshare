import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeI() {
  const refContainer = useRef<HTMLDivElement | null>();

  const init = () => {
    if (!refContainer.current) {
      return;
    }
    const width = refContainer.current.offsetWidth;
    const height = refContainer.current.offsetHeight;
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机 视角 长宽比 近 远
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

    // 将元素添加到场景中
    scene.add(cube);

    // 渲染场景
    camera.position.z = 10; // 离远一点
    cube.rotation.z = -1;
    cube.rotation.y = -1;
    cube.rotation.x = -3;
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
