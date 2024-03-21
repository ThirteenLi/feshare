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

  const getTextureCanvas = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;
    if (ctx) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // 设置粒子云的颜色和透明度
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
      ctx.fill();
    }
    return canvas;
  };

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
    const geom = new THREE.BufferGeometry(); // 创建点云集合体
    const positions: number[] = [];
    const colors: number[] = [];
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < 1; z++) {
          positions.push(x * 10, y * 10, z * 20);
          const clr = new THREE.Color(Math.random() * 0xffffff);
          colors.push(clr.r, clr.g, clr.b);
        }
      }
    }
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    refRenderer.current = new THREE.WebGLRenderer();
    // 创建dat
    if (!refGuiObj.current) {
      refGuiObj.current = new dat.GUI();
      const guiParams = {
        addCanvas: () => {
          if (refScene.current) {
            const texture = new THREE.CanvasTexture(getTextureCanvas());
            const material = new THREE.PointsMaterial({
              vertexColors: false, // 使用集合体颜色
              size: 8, // 大小
              map: texture,
              // sizeAttenuation: true, // 如果false,所有粒子大小相同，true 近大远小
              // depthWrite: false, // 黑色框
              transparent: true,
              opacity: 1,
            });

            const points = new THREE.Points(geom, material);
            scene.add(points);
          }
        },
        addImage: () => {
          if (refScene.current) {
            const textureI = new THREE.TextureLoader().load(
              "/src/assets/image.png"
            );

            const material = new THREE.PointsMaterial({
              vertexColors: false, // 使用集合体颜色
              size: 8, // 大小
              map: textureI,
              // sizeAttenuation: true, // 如果false,所有粒子大小相同，true 近大远小
              // depthWrite: false, // 黑色框
              transparent: true,
              opacity: 1,
            });

            const points = new THREE.Points(geom, material);
            scene.add(points);
          }
        },
        addSprite: () => {
          if (refScene.current) {
            const textureII = new THREE.TextureLoader().load(
              "/src/assets/sprite-sheet.png",
              (t) => {
                t.offset.set(0, 0);
                t.repeat.set(0.2, 1);
              }
            );
            const material = new THREE.PointsMaterial({
              vertexColors: false, // 使用集合体颜色
              size: 8, // 大小
              map: textureII,
              // sizeAttenuation: true, // 如果false,所有粒子大小相同，true 近大远小
              // depthWrite: false, // 黑色框
              transparent: true,
              opacity: 1,
            });

            const points = new THREE.Points(geom, material);
            scene.add(points);
          }
        },
        clear: () => {
          while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
          }
          const axes = new THREE.AxesHelper(500);
          scene.add(axes);
        },
      };
      refGuiObj.current.add(guiParams, "addCanvas").name("Add Canvas");
      refGuiObj.current.add(guiParams, "addImage").name("Add Image");
      refGuiObj.current.add(guiParams, "addSprite").name("Add Sprite");
      refGuiObj.current.add(guiParams, "clear").name("Clear");
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
