import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

// 顶点坐标
const vertices = [
    1, 1, 1,
    1, 1, -1,
    1, -1, 1,
    1, -1, -1,
    -1, 1, -1,
    -1, 1, 1,
    -1, -1, -1,
    -1, -1, 1
];

// 添加顶点
const positions = new Float32Array(vertices);
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 面索引
const indices = [
    0, 2, 1,
    2, 3, 1,
    4, 6, 5,
    6, 7, 5,
    4, 5, 1,
    5, 0, 1,
    7, 6, 2,
    6, 3, 2
];

// 添加面
geometry.setIndex(indices);

// 输出 BufferGeometry 对象
console.log(geometry);
// 这个例子是通过在球形几何体的反面进行纹理贴图实现的全景视图，实现原理是这样的：
// 创建一个球体构成一个球形的空间，把相机放在球体的中心，相机就像在一个球形的房间中，
// 在球体的里面（也就是反面）贴上图片，通过改变相机拍摄的方向，就能看到全景视图了。
// 材质默认是在几何体的正面进行贴图的，如果想要在反面贴图，需要在创建材质的时候设置 side 参数的值为 THREE.BackSide，代码如下

// /* 创建地球 */
// function createGeom() {
//     // 球体
//     var geom = new THREE.SphereGeometry(1, 64, 64);
//     // 纹理
//     var loader = new THREE.TextureLoader();
//     var texture = loader.load('./earth.jpg');
//     // 材质
//     var material = new THREE.MeshLambertMaterial({
//         map: texture
//     });
//     var earth = new THREE.Mesh(geom, material);
//     return earth;
// }



// /* 创建反面贴图的球形 */
// // 球体
// var geom = new THREE.SphereGeometry(500, 64, 64);
// // 纹理
// var loader = new THREE.TextureLoader();
// var texture = loader.load('./panorama.jpg');
// // 材质
// var material = new THREE.MeshBasicMaterial({
//     map: texture,
//     side: THREE.BackSide
// });
// var panorama = new THREE.Mesh(geom, material);
