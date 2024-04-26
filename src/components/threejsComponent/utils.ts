import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import { useGrid } from '../../config/grid';
import Stats from 'stats.js';

// 初始化性能监测器
export const initStats = (dom: HTMLElement) => {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    dom.appendChild(stats.dom);
    return stats;
};
  
  // 初始化场景
export const initScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // scene.fog = new THREE.Fog(0x000000, 5, 10);
    return scene;
};
  
  // 初始化相机
export const initCamera = (width: number, height: number) => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    return camera;
};
  
  // 初始化渲染器
export const initRenderer = (canvas: HTMLCanvasElement, width: number, height: number) => {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true});
    renderer.setSize(width, height);
    return renderer;
};
  
  // 创建几何体
export const createShape = () => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
};

export const createGrid = () => {
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    return gridHelper;
};
  
  // 初始化轨道控制器
export const initControls = (camera: THREE.Camera, domElement: HTMLCanvasElement) => {
    const controls = new OrbitControls(camera, domElement);
    return controls;
};

// 初始化光源
export const initLight = (scene: THREE.Scene) => {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);
    return light;
}

// 初始化坐标轴
export const initAxes = (scene: THREE.Scene, arrowLength:number = 3) => {
    const axesHelper = new THREE.AxesHelper(arrowLength -1);
    scene.add(axesHelper);

    // 创建箭头
    // const arrowColor = 0xffffff;
    const arrowHelper_x = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0xff0000);
    const arrowHelper_y = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0x00ff00);
    const arrowHelper_z = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), arrowLength, 0x0000ff);
    scene.add(arrowHelper_x, arrowHelper_y, arrowHelper_z);

    // 创建文字
    const fontLoader = new FontLoader();
    fontLoader.load('./public/helvetiker_regular.typeface.json', (font) => {
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff3f });
        const textScale = 0.3;

        const textGeometry_x = new TextGeometry('X', {
            font: font,
            size: 0.5,
            depth: 0.1,
        });
        const textMesh_x = new THREE.Mesh(textGeometry_x, textMaterial);
        textMesh_x.position.set(arrowLength + 0.5, 0, 0);
        textMesh_x.scale.set(textScale, textScale, textScale);
        scene.add(textMesh_x);

        const textGeometry_y = new TextGeometry('Y', {
            font: font,
            size: 0.5,
            depth: 0.1,
        });
        const textMesh_y = new THREE.Mesh(textGeometry_y, textMaterial);
        textMesh_y.position.set(0, arrowLength + 0.5, 0);
        textMesh_y.scale.set(textScale, textScale, textScale);
        scene.add(textMesh_y);

        const textGeometry_z = new TextGeometry('Z', {
            font: font,
            size: 0.5,
            depth: 0.1,
        });
        const textMesh_z = new THREE.Mesh(textGeometry_z, textMaterial);
        textMesh_z.position.set(0, 0, arrowLength + 0.5);
        textMesh_z.scale.set(textScale, textScale, textScale);
        scene.add(textMesh_z);
    });

    return axesHelper;
};

  // 渲染循环
// const clock = new THREE.Clock();

export const startRender = (
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    stats: Stats,
    shape: THREE.Mesh | THREE.Points,
    controls: OrbitControls,
    isAnimate: boolean = true
  ) => {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      // const elapsedTime = clock.getElapsedTime(); // 返回已经过去的时间, 以秒为单位
      stats.begin();
      if (isAnimate) {
        shape.rotation.x +=0.01;
        shape.rotation.y +=0.01;
      }
      controls.update();
      renderer.render(scene, camera);
      stats.end();
    };
    animateLoop();
};

// 清理函数
export const cleanup = (
    scene: THREE.Scene,
    controls: OrbitControls,
    renderer: THREE.WebGLRenderer
  ) => {
    const disposeObject = (obj: THREE.Object3D) => {
      if (obj.children.length > 0) {
        obj.children.forEach(disposeObject);
      }
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        } else if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => material.dispose());
        }
      }
    };
    disposeObject(scene);
    controls.dispose();
    renderer.dispose();
};
  