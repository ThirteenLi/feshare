## 几种几何体区别

1. ​**BufferGeometry**​:
   - 参数：_BufferGeometry_ 是一个用于创建自定义几何体的类，它没有特定的参数。您可以使用 _BufferGeometry_ 提供的方法和属性来手动定义几何体的顶点位置、法线、UV 坐标、颜色等信息。通常需要使用 _Float32Array_ 或 _Uint16Array_ 等类型的数组来存储几何体的数据。
   - 区别：相对于其他几何体类，使用 _BufferGeometry_ 可以更高效地处理大量顶点数据，并且可以进行更多的自定义和操作。
2. ​**TextGeometry**​:
   - 参数：_TextGeometry_ 用于创建文本几何体，其中的参数包括：
     - _text_：要显示的文本内容。
     - _parameters_：一个包含各种参数的对象，例如 _font_（字体）、_size_（大小）、_height_（高度）、_curveSegments_（曲线段数）等。
   - 区别：_TextGeometry_ 可以根据指定的字体和参数创建一个可呈现文本的三维几何体，每个字符都将被转换为一个具有顶点数据的几何体。
3. ​**SphereGeometry**​:
   - 参数：_SphereGeometry_ 用于创建球体几何体，其中的参数包括：
     - _radius_：球体的半径。
     - _widthSegments_：经线（纬度）上的分段数。
     - _heightSegments_：纬线（经度）上的分段数。
     - _phiStart_：经线的起始角度。
     - _phiLength_：经线的扫描角度。
     - _thetaStart_：纬线的起始角度。
     - _thetaLength_：纬线的扫描角度。
   - 区别：_SphereGeometry_ 可以根据指定的参数创建一个球体几何体，参数控制了球体的大小、分段数以及起始角度和扫描角度，使您能够创建不同形状和分辨率的球体。
