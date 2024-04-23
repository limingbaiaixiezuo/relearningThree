

import React, { useEffect, useRef } from 'react';
import { useGrid } from '../../../config/grid';
import { initStats, initScene, initCamera, 
  initRenderer, initControls, 
  initAxes, startRender, cleanup } from '../utils';
import PointCloudMock from './mock';
import * as THREE from 'three';
import { parsePointCloudData, createPointCloud } from './pcUtils';

const ThreePointCloud: React.FC<{ id: string }> = ({ id }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { columnWidth: WIDTH, rowHeight: HEIGHT } = useGrid();
  const mock = new PointCloudMock('PLY', 'human', 1000);

  // 生成点云数据
  const pointCloudData = mock.generatePointCloudData();

  // 将点云数据保存到文件或进行其他处理
  console.log(pointCloudData);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stats = initStats(canvas.parentElement!);
    const scene = initScene();
    const camera = initCamera(WIDTH, HEIGHT);
    const renderer = initRenderer(canvas, WIDTH, HEIGHT);
    initAxes(scene);
    const controls = initControls(camera, canvas);

    // const shape = createShape();
    // scene.add(shape);
    parsePointCloudData(pointCloudData, 'PLY')
    .then((parsedPoints: THREE.Vector3[]) => {
      console.log('Parsed points from string 222:', parsedPoints);
      const pointCloud = createPointCloud(parsedPoints);
      scene.add(pointCloud);

      startRender(scene, camera, renderer, stats, pointCloud, controls, true);
    })
    .catch((error: Error) => {
      console.error('Error parsing point cloud data from string:', error);
    });
    

    return () => {
      cleanup(scene, controls, renderer);
    };

  }, [WIDTH, HEIGHT, pointCloudData]);

  return <canvas ref={canvasRef} id={id} />;
}

export default ThreePointCloud;