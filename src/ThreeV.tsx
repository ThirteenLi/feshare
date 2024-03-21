/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useEffect, useRef, MouseEvent } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";

export default function ThreeII() {
  const refContainer = useRef<HTMLDivElement | null>();
  const refCamera = useRef<THREE.PerspectiveCamera>();
  const refScene = useRef<THREE.Scene>();
  const refRenderer = useRef<THREE.Renderer>();
  const refGuiObj = useRef<dat.GUI>();

  const init = () => {
    if (!refContainer.current) {
      return;
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
      3000
    );
    // 创建渲染器
    refRenderer.current = new THREE.WebGLRenderer();
    // 创建dat
    if (!refGuiObj.current) {
      refGuiObj.current = new dat.GUI();
      const guiParams = {
        add: () => {
          if (refScene.current) {
            const geom = new THREE.BufferGeometry(); // 创建点云集合体
            const positions = [];
            const colors = [];
            for (let x = -20; x < 20; x++) {
              for (let y = -20; y < 20; y++) {
                for (let z = 0; z < 10; z++) {
                  positions.push(x * 4, y * 4, z * 100);
                  const clr = new THREE.Color(Math.random() * 0xffffff);
                  colors.push(clr.r, clr.g, clr.b);
                }
              }
            }

            geom.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(positions, 3)
            );
            geom.setAttribute(
              "color",
              new THREE.Float32BufferAttribute(colors, 3)
            );
            const material = new THREE.PointsMaterial({
              // vertexColors: true, // 使用集合体颜色
              // size: 4, // 大小
              // sizeAttenuation: true, // 如果false,所有粒子大小相同，true 近大远小
              // transparent: true,
              // opacity: 0.9,
            });
            const points = new THREE.Points(geom, material);
            scene.add(points);
          }
        },
      };
      refGuiObj.current.add(guiParams, "add").name("Add Sprites");
    }
    const scene = refScene.current;
    const camera = refCamera.current;
    const renderer = refRenderer.current;
    renderer.setSize(width, height);
    refContainer.current.appendChild(renderer.domElement);

    // 创建坐标系
    const axes = new THREE.AxesHelper(500);
    scene.add(axes);
    // 渲染场景
    camera.position.set(20, 20, 200);
    camera.lookAt(scene.position);

    function animate() {
      requestAnimationFrame(animate);
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

  function onMouseWheel(event: WheelEvent) {
    event.preventDefault();
    // 根据滚轮事件的delta值来计算缩放因子
    const scaleFactor = 1 + event.deltaY * 0.01;

    // 根据缩放因子调整相机的位置
    if (refCamera.current) {
      refCamera.current.position.multiplyScalar(scaleFactor);
    }
  }

  let mouseDown = false;
  let mouseX = 0;
  let mouseY = 0;

  // 监听鼠标按下事件
  const onMouseDown = (event: MouseEvent) => {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  // 监听鼠标移动事件
  function onMouseMove(event: MouseEvent) {
    if (mouseDown && refCamera.current && refScene.current) {
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      // 根据鼠标移动的距离调整相机的旋转
      refScene.current.rotation.x += deltaY * 0.005;
      refScene.current.rotation.y += deltaX * 0.01;
      refCamera.current.lookAt(refScene.current.position);
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  }

  // 监听鼠标松开事件
  function onMouseUp() {
    mouseDown = false;
  }
  function handleKeyDown(event: KeyboardEvent) {
    const rotationSpeed = 0.3;
    if (refScene.current) {
      switch (event.key) {
        case "ArrowLeft":
          refScene.current.rotation.y -= rotationSpeed;
          break;
        case "ArrowRight":
          refScene.current.rotation.y += rotationSpeed;
          break;
        case "ArrowUp":
          refScene.current.rotation.x -= rotationSpeed;
          break;
        case "ArrowDown":
          refScene.current.rotation.x += rotationSpeed;
          break;
      }
    }
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      init();
      if (refContainer.current) {
        refContainer.current.addEventListener("resize", onResize);
        // 添加鼠标滚轮事件监听器
        refContainer.current.addEventListener("wheel", onMouseWheel, {
          passive: false,
        });
        // 添加鼠标事件监听器
        refContainer.current.addEventListener("mouseup", onMouseUp);
        // @ts-ignore
        refContainer.current.addEventListener("mousemove", onMouseMove);
        // @ts-ignore
        refContainer.current.addEventListener("mousedown", onMouseDown);
        refContainer.current.addEventListener("keydown", handleKeyDown);
      }
    }, 200);
    // 监听屏幕变化
  }, []);

  useEffect(() => {
    return () => {
      if (refGuiObj.current) {
        refGuiObj.current?.destroy?.();
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
