# 前端技术分享 Threejs 粒子动画

## 分享背景

做 web3 项目时，产品同学想效仿数据监控平台，做一个 3D 的地球粒子动画。以往工作中，也总是遇到一些粒子动画的场景，比如直播活动老虎机吐金币, 七夕活动樱花雨特效。很多常见的动画也都是粒子动画，比如告白网页点组成告白文字，csgo 开枪的烟雾效果,无人机组成各种图案的表演等。

[https://reflect.app/](https://reflect.app/)

[腾讯 Up2017 年度发布会的网页](https://tgideas.qq.com/gicp/news/475/6515254.html?from=list)

3D 视觉是指通过在人眼中产生深度感知的技术或效果。它基于人类视觉系统的原理，利用双眼视差和其他深度提示来模拟三维空间的感觉。以下是一些与 3D 视觉相关的原理：

## THREE 核心三要素

- **场景（Scene）**：场景是 Three.js 中的基础容器，用于存放和管理所有的物体、光源和相机。在场景中可以添加、移除和组织各种元素，从而创建出虚拟的三维环境。
- **相机（Camera）**：相机定义了场景中的观察者的视角和视野。Three.js 提供了多种类型的相机，如透视相机（PerspectiveCamera）和正交相机（OrthographicCamera）。通过调整相机的位置、朝向和视野参数，可以控制渲染结果中的视角和投影效果。
- **渲染器（Renderer）**：渲染器负责将场景和相机中的内容渲染到屏幕上。它将场景中的三维对象转换为二维图像，并应用光照、阴影和材质等效果。Three.js 提供了不同类型的渲染器，如 WebGLRenderer、CanvasRenderer 和 SVGRenderer，其中 WebGLRenderer 是最常用的，利用 WebGL 技术实现高性能的三维渲染。

## 添加一个立方体

1. 创建一个立方体的几何体 Geometry
2. 创建立方体的材质 Material
3. 创建立方体的网格对象 Mesh
4. 添加进场景
5. 渲染场景

```
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x66ccff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  renderer.render(scene, camera);
```
