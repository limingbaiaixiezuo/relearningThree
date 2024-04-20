import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useGrid } from '../../config/grid';

const FirstThreeComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { columnWidth: WIDTH , rowHeight: HEIGHT } = useGrid();
  console.log(WIDTH, HEIGHT);
  
  useEffect(() => {
    if (canvasRef.current) {
      // 创建场景
      const scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 0.1, 1000);
      camera.position.z = 5;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(WIDTH, HEIGHT);

      // 创建几何体
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      scene.add(new THREE.AxesHelper(5));

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 动画循环
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // 监听窗口大小变化
      const onWindowResize = () => {
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
      };

      window.addEventListener('resize', onWindowResize);

      // 清理函数
      return () => {
        window.removeEventListener('resize', onWindowResize);
      };
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FirstThreeComponent;