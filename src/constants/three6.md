## 使用图片

要在 Three.js 中将图片应用到粒子云效果中，你可以使用贴图（Texture）来定义粒子材质的外观。

```
// 创建贴图对象
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/your/image.png');

// 创建粒子材质
const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  map: texture,
  transparent: true,
  blending: THREE.AdditiveBlending,
});
```
