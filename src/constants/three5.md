## 粒子云

粒子云是由大量粒子组成的集合，每个粒子都具有位置、大小、颜色和其他属性。

```
// 创建粒子材质
const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  map: texture, // 可选的贴图
  transparent: true,
  blending: THREE.AdditiveBlending,
});

// 创建粒子几何体
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000; // 粒子数量

// 创建粒子位置属性
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  positions[i3] = Math.random() * 2 - 1;
  positions[i3 + 1] = Math.random() * 2 - 1;
  positions[i3 + 2] = Math.random() * 2 - 1;
}
particleGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

// 创建粒子系统
const particleSystem = new THREE.Points(
  particleGeometry,
particleMaterial);

// 将粒子系统添加到场景中
scene.add(particleSystem);
```
