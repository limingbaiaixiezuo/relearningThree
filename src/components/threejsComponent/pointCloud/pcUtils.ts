import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

const parsePointCloudData = (data: string, format: string): Promise<THREE.Vector3[]> => {
  return new Promise((resolve, reject) => {
    if (isURL(data)) {
      // 如果 data 是 URL,则从文件中加载点云数据
      loadFromFile(data, format, resolve, reject);
    } else {
      // 如果 data 是字符串,则直接解析点云数据
      parseFromString(data, format, resolve, reject);
    }
  });
};

const isURL = (data: string): boolean => {
  // 简单的 URL 检查逻辑,可以根据需要进行调整
  return data.startsWith('http://') || data.startsWith('https://') || data.startsWith('file://');
};

const loadFromFile = (url: string, format: string, resolve: (points: THREE.Vector3[]) => void, reject: (error: Error) => void): void => {
    let loader: PLYLoader | PCDLoader;
  
    switch (format.toLowerCase()) {
      case 'ply':
        loader = new PLYLoader();
        break;
      case 'pcd':
        loader = new PCDLoader();
        break;
      default:
        reject(new Error(`Unsupported format for file loading: ${format}`));
        return;
    }
  
    loader.load(
      url,
      (geometry: THREE.BufferGeometry | THREE.Points) => {
        let positions: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
  
        if (geometry instanceof THREE.Points) {
          positions = geometry.geometry.getAttribute('position');
        } else {
          positions = geometry.getAttribute('position');
        }
  
        const points: THREE.Vector3[] = [];
  
        for (let i = 0; i < positions.count; i++) {
          const point = new THREE.Vector3().fromBufferAttribute(positions, i);
          points.push(point);
        }
  
        resolve(points);
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
            const errorObj = new Error(error?.message || 'An error occurred while loading the file');
            reject(errorObj);
     }
    );
  };

const parseFromString = (data: string, format: string, resolve: (points: THREE.Vector3[]) => void, reject: (error: Error) => void): void => {
  switch (format.toLowerCase()) {
    case 'ply':
      resolve(parsePLYData(data));
      break;
    case 'pcd':
      resolve(parsePCDData(data));
      break;
    case 'xyz':
      resolve(parseXYZData(data));
      break;
    default:
      reject(new Error(`Unsupported format for string parsing: ${format}`));
  }
};

const parsePLYData = (data: string): THREE.Vector3[] => {
  const lines = data.split('\n');
  const points: THREE.Vector3[] = [];

  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'end_header') {
      startIndex = i + 1;
      break;
    }
  }

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line !== '') {
      const values = line.split(' ');
      const x = parseFloat(values[0]);
      const y = parseFloat(values[1]);
      const z = parseFloat(values[2]);
      points.push(new THREE.Vector3(x, y, z));
    }
  }

  return points;
};

const parsePCDData = (data: string): THREE.Vector3[] => {
  const lines = data.split('\n');
  const points: THREE.Vector3[] = [];

  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'DATA ascii') {
      startIndex = i + 1;
      break;
    }
  }

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line !== '') {
      const values = line.split(' ');
      const x = parseFloat(values[0]);
      const y = parseFloat(values[1]);
      const z = parseFloat(values[2]);
      points.push(new THREE.Vector3(x, y, z));
    }
  }

  return points;
};

const parseXYZData = (data: string): THREE.Vector3[] => {
  const lines = data.split('\n');
  const points: THREE.Vector3[] = [];

  for (const line of lines) {
    const [x, y, z] = line.split(' ').map(parseFloat);
    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
};

// 创建点云对象
const createPointCloud = (points: THREE.Vector3[]): THREE.Points => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(points.length * 3);

  for (let i = 0; i < points.length; i++) {
    positions[i * 3] = points[i].x;
    positions[i * 3 + 1] = points[i].y;
    positions[i * 3 + 2] = points[i].z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff,
  });

  return new THREE.Points(geometry, material);
};


export { parsePointCloudData, createPointCloud };