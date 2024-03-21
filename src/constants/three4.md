## 粒子系统

在 Three.js 中，粒子系统是一种特殊的对象，用于创建和管理大量粒子的集合。它提供了一种简便的方式来创建各种粒子效果，如雨滴、雪花、火焰等。

Three.js 的粒子系统由以下几个核心组件组成：

1. **粒子几何体（Geometry）**：粒子几何体定义了每个粒子的初始位置、大小和其他属性。它可以是 THREE.BufferGeometry 或 THREE.Geometry 的实例。
2. **粒子材质（Material）**：粒子材质定义了粒子的外观，包括颜色、纹理、透明度等属性。常见的粒子材质包括 THREE.PointsMaterial 和 THREE.SpriteMaterial。
3. **粒子系统（ParticleSystem）**：粒子系统是将粒子几何体和粒子材质结合在一起的对象。它是 THREE.Points 或 THREE.Sprite 的实例。
