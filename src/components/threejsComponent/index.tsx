import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
import { useGrid } from '../../config/grid';
import { initStats, initScene, initCamera, 
  initRenderer, createGrid, initControls, 
  initAxes, startRender, cleanup } from './utils';

const ThreeComponent: React.FC<{ id: string }> = ({ id }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { columnWidth: WIDTH, rowHeight: HEIGHT } = useGrid();

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
    const grid = createGrid();
    scene.add(grid);
    //@ts-ignore
    startRender(scene, camera, renderer, stats, grid, controls);

    return () => {
      cleanup(scene, controls, renderer);
    };
  }, [WIDTH, HEIGHT]);

  return <canvas ref={canvasRef} id={id} />;
};

export default ThreeComponent;