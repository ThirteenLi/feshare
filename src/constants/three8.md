## Tween 动画

Tween 动画是一种常用的插值动画技术，用于在一段时间内平滑地改变物体的属性值，例如位置、旋转、缩放等。它通过定义起始值和目标值，并在指定的时间间隔内逐步改变属性值，创建出流畅的动画效果。

在 Three.js 中，你可以使用 Tween.js 库来实现 Tween 动画。该库提供了简单易用的接口，让你可以方便地创建和控制 Tween 动画。

以下是一个 Tween 动画的示例，展示了如何使用 Tween.js 在 Three.js 中创建一个简单的平移动画：

```
import { Tween } from 'three/examples/jsm/libs/tween.module.min.js';

// 创建一个立方体
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 定义起始位置和目标位置
const startPosition = { x: 0, y: 0, z: 0 };
const targetPosition = { x: 5, y: 3, z: -2 };

// 创建 Tween 动画
const tween = new Tween(cube.position)
  .to(targetPosition, 2000) // 持续时间为 2000 毫秒
  .easing(TWEEN.Easing.Quadratic.InOut) // 缓动函数
  .start(); // 启动动画

// 在每一帧更新 Tween
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  renderer.render(scene, camera);
}
animate();
```
