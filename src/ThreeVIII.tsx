/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLayoutEffect, useEffect, useRef, MouseEvent } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import TWEEN from "@tweenjs/tween.js";

export default function ThreeII() {
  const refContainer = useRef<HTMLDivElement | null>();
  const refCamera = useRef<THREE.PerspectiveCamera>();
  const refScene = useRef<THREE.Scene>();
  const refRenderer = useRef<THREE.Renderer>();
  const refGuiObj = useRef<dat.GUI>();
  const refStart = useRef<THREE.Points>();
  const refEnd = useRef<THREE.Points>();
  const init = () => {
    if (!refContainer.current) {
      return;
    }
    const width = refContainer.current.offsetWidth;
    const height = refContainer.current.offsetHeight;
    const positionsI: number[] = [];
    const positionsII: number[] = [];
    const loader = new OBJLoader();
    loader.load("/src/models/examples/butterfly.obj", (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const vertices = child.geometry.attributes.position.array;
          for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i] * 150;
            const y = vertices[i + 1] * 150;
            const z = vertices[i + 2] * 150;
            positionsI.push(x, y, z);
          }
        }
      });
    });
    loader.load("/src/models/examples/ball.obj", (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const vertices = child.geometry.attributes.position.array;
          for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i] * 100;
            const y = vertices[i + 1] * 100;
            const z = vertices[i + 2] * 100;
            positionsII.push(x, y, z);
          }
        }
      });
    });
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
        addI: () => {
          if (refScene.current) {
            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(positionsI, 3)
            );
            const material = new THREE.PointsMaterial({
              size: 1,
              transparent: true,
              opacity: 0.9,
            });
            const points = new THREE.Points(particleGeometry, material);
            points.name = "butterfly";
            scene.add(points);
            refStart.current = points;

            const particleGeometryII = new THREE.BufferGeometry();
            particleGeometryII.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(positionsII, 3)
            );
            const pointsI = new THREE.Points(particleGeometryII, material);
            refEnd.current = pointsI;
          }
        },
        change: () => {
          const start = refStart.current;
          const end = refEnd.current;
          changePoints(start, end);
        },
        clear: () => {
          while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
          }
          const axes = new THREE.AxesHelper(500);
          scene.add(axes);
        },
      };
      refGuiObj.current.add(guiParams, "addI").name("Add");
      refGuiObj.current.add(guiParams, "change").name("Change");
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
      TWEEN.update();
      renderer.render(scene, camera);
    }
    animate();
  };

  const changePoints = (pointsMesh: any, targetMesh: any) => {
    // 源模型的顶点
    const originVertices = pointsMesh.geometry.attributes.position.array;
    // 目标模型的顶点
    const targetVertices = targetMesh.geometry.attributes.position.array;

    // 源粒子数大于目标模型顶点数 需减少
    if (originVertices.length > targetVertices.length) {
      pointsMesh.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          originVertices.slice(0, targetVertices.length),
          3
        )
      );
    }
    // 源粒子数小于目标模型顶点数 需补齐
    if (originVertices.length < targetVertices.length) {
      const extraVertices = new Float32Array(
        (targetVertices.length - originVertices.length) * 3
      );
      pointsMesh.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([...originVertices, ...extraVertices]),
          3
        )
      );
    }

    // 遍历每一个粒子
    pointsMesh.geometry.attributes.position.array.forEach(
      (_: number, i: number) => {
        // 粒子从原始位置到目标位置的平滑移动，完成时间2000ms
        new TWEEN.Tween({
          x: pointsMesh.geometry.attributes.position.array[i * 3],
          y: pointsMesh.geometry.attributes.position.array[i * 3 + 1],
          z: pointsMesh.geometry.attributes.position.array[i * 3 + 2],
        })
          .to(
            {
              x: targetMesh.geometry.attributes.position.array[i * 3],
              y: targetMesh.geometry.attributes.position.array[i * 3 + 1],
              z: targetMesh.geometry.attributes.position.array[i * 3 + 2],
            },
            2000
          )
          .onUpdate(({ x, y, z }) => {
            pointsMesh.geometry.attributes.position.array[i * 3] = x;
            pointsMesh.geometry.attributes.position.array[i * 3 + 1] = y;
            pointsMesh.geometry.attributes.position.array[i * 3 + 2] = z;
            pointsMesh.geometry.attributes.position.needsUpdate = true;
          })
          .delay(100 + (i % 10) * 100)
          // .yoyo(true)
          // .repeat(Infinity)
          .start();
      }
    );
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
