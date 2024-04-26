import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2, Raycaster } from 'three';

interface VoxelPainterProps {
  width: number;
  height: number;
}

const VoxelPainter: React.FC<VoxelPainterProps> = ({ width, height }) => {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [rollOverMesh, setRollOverMesh] = useState<THREE.Mesh | null>(null);
  const [cubeGeo, setCubeGeo] = useState<THREE.BoxGeometry | null>(null);
  const [cubeMaterial, setCubeMaterial] = useState<THREE.MeshLambertMaterial | null>(null);
  const [objects, setObjects] = useState<THREE.Object3D[]>([]);
  const [isShiftDown, setIsShiftDown] = useState(false);
  const [pointer, setPointer] = useState(new Vector2());
  const [raycaster] = useState(new Raycaster());
  const containerRef = useRef<HTMLDivElement>(null);

  const initVoxelPainter = useCallback(() => {
    if (!scene || !camera || !renderer) return;

    const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    const rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
    const rollOverMeshLocal = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    const gridHelper = new THREE.GridHelper(1000, 20, 0x000000, 0x000000);
    scene.add(rollOverMeshLocal);

    const cubeGeoLocal = new THREE.BoxGeometry(50, 50, 50);
    const cubeMaterialLocal = new THREE.MeshLambertMaterial({
      color: 0xfeb74c,
      map: new THREE.TextureLoader().load('textures/square-outline-textured.png'),
    });
    if (cubeMaterialLocal.map) {
      cubeMaterialLocal.map.colorSpace = THREE.SRGBColorSpace;
    }

    setRollOverMesh(rollOverMeshLocal);
    setCubeGeo(cubeGeoLocal);
    setCubeMaterial(cubeMaterialLocal);
    setObjects([gridHelper, rollOverMeshLocal]);
  }, [scene, camera, renderer]);

  const render = useCallback(() => {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }, [renderer, scene, camera]);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!scene || !camera || !rollOverMesh) return;

      setPointer(new Vector2((event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1));
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(objects, false);

      if (intersects.length > 0) {
        const intersect = intersects[0];

        rollOverMesh.position.copy(intersect.point).add(intersect.face!.normal);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

        render();
      }
    },
    [scene, camera, rollOverMesh, width, height, pointer, raycaster, objects, render]
  );

  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      if (!scene || !camera || !cubeGeo || !cubeMaterial) return;

      setPointer(new Vector2((event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1));
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(objects, false);

      if (intersects.length > 0) {
        const intersect = intersects[0];

        if (isShiftDown) {
          if (intersect.object !== objects[0]) {
            scene.remove(intersect.object);
            setObjects(objects.filter((obj) => obj !== intersect.object));
          }
        } else {
          const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
          voxel.position.copy(intersect.point).add(intersect.face!.normal);
          voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
          scene.add(voxel);
          setObjects([...objects, voxel]);
        }

        render();
      }
    },
    [scene, camera, cubeGeo, cubeMaterial, width, height, pointer, raycaster, objects, isShiftDown, render]
  );

  const onDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 16:
          setIsShiftDown(true);
          break;
      }
    },
    [setIsShiftDown]
  );

  const onDocumentKeyUp = useCallback(
    (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 16:
          setIsShiftDown(false);
          break;
      }
    },
    [setIsShiftDown]
  );

 

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景、相机和渲染器
    const sceneLocal = new THREE.Scene();
    sceneLocal.background = new THREE.Color(0xf0f0f0);

    const cameraLocal = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    cameraLocal.position.set(500, 800, 1300);
    cameraLocal.lookAt(0, 0, 0);

    const rendererLocal = new THREE.WebGLRenderer({ antialias: true });
    rendererLocal.setSize(width, height);
    containerRef.current.appendChild(rendererLocal.domElement);

    // 添加网格和灯光
    const gridHelper = new THREE.GridHelper(1000, 20);
    sceneLocal.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0x606060, 3);
    sceneLocal.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    sceneLocal.add(directionalLight);

    // 添加交互控制
    const controls = new OrbitControls(cameraLocal, rendererLocal.domElement);

    // 添加voxel相关的逻辑
    initVoxelPainter();

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render();
    };
    animate();

    // 添加事件监听器
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('keyup', onDocumentKeyUp);

    setScene(sceneLocal);
    setCamera(cameraLocal);
    setRenderer(rendererLocal);

    return () => {
      // 清理资源
      containerRef.current?.removeChild(rendererLocal.domElement);
      rendererLocal.dispose();
      controls.dispose();
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onDocumentKeyDown);
      document.removeEventListener('keyup', onDocumentKeyUp);
    };
  }, [width, height, initVoxelPainter, onPointerMove, onPointerDown, onDocumentKeyDown, onDocumentKeyUp, render]);

  return <div ref={containerRef} />;
};

export default VoxelPainter;