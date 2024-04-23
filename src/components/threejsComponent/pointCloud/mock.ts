// Mock 类 ，可以模拟包括单不限于PLY、PCD 或 XYZ 三种格式的点云数据，比如可以模拟人形、猫狗，汽车等的点云数据，
export default class PointCloudMock {
  private format: string;
  private objectType: string;
  private numPoints: number;

  constructor(format: string, objectType: string, numPoints: number) {
    this.format = format;
    this.objectType = objectType;
    this.numPoints = numPoints;
  }

  private generatePoints(): [number, number, number][] {
    const points: [number, number, number][] = [];

    // 根据对象类型生成随机点坐标
    switch (this.objectType) {
      case 'human': {
        const headPoints = this.generateSpherePoints(0, 1.7, 0, 0.2, 0.2, 0.2, this.numPoints * 0.2);
        const torsoPoints = this.generateCylinderPoints(0, 1, 0, 0.4, 0.6, this.numPoints * 0.4);
        const armPoints = [
          ...this.generateCylinderPoints(-0.5, 1.3, 0, 0.1, 0.4, this.numPoints * 0.1),
          ...this.generateCylinderPoints(0.5, 1.3, 0, 0.1, 0.4, this.numPoints * 0.1)
        ];
        const legPoints = [
          ...this.generateCylinderPoints(-0.2, 0.5, 0, 0.15, 0.5, this.numPoints * 0.1),
          ...this.generateCylinderPoints(0.2, 0.5, 0, 0.15, 0.5, this.numPoints * 0.1)
        ];
        points.push(...headPoints, ...torsoPoints, ...armPoints, ...legPoints);
        break;
      }
      case 'cat':
      case 'dog': {
        const animalHeadPoints = this.generateSpherePoints(0, 0.3, 0, 0.15, 0.15, 0.2, this.numPoints * 0.2);
        const animalBodyPoints = this.generateEllipsoidPoints(0, 0.15, 0, 0.3, 0.15, 0.2, this.numPoints * 0.6);
        const animalLegPoints = [
          ...this.generateCylinderPoints(-0.2, 0, 0.15, 0.05, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(0.2, 0, 0.15, 0.05, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(-0.2, 0, -0.15, 0.05, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(0.2, 0, -0.15, 0.05, 0.1, this.numPoints * 0.05)
        ];
        points.push(...animalHeadPoints, ...animalBodyPoints, ...animalLegPoints);
        break;
      }
      case 'car': {
        const carBodyPoints = this.generateBoxPoints(0, 0.5, 0, 1.5, 1, 0.5, this.numPoints * 0.8);
        const carWheelPoints = [
          ...this.generateCylinderPoints(-0.7, 0.3, 0.4, 0.3, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(0.7, 0.3, 0.4, 0.3, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(-0.7, 0.3, -0.4, 0.3, 0.1, this.numPoints * 0.05),
          ...this.generateCylinderPoints(0.7, 0.3, -0.4, 0.3, 0.1, this.numPoints * 0.05)
        ];
        points.push(...carBodyPoints, ...carWheelPoints);
        break;
      }
      default:
        throw new Error('Unsupported object type');
    }

    return points;
  }

  private generateSpherePoints(centerX: number, centerY: number, centerZ: number, radiusX: number, radiusY: number, radiusZ: number, numPoints: number): [number, number, number][] {
    const points: [number, number, number][] = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = centerX + radiusX * Math.sin(phi) * Math.cos(theta);
      const y = centerY + radiusY * Math.sin(phi) * Math.sin(theta);
      const z = centerZ + radiusZ * Math.cos(phi);
      points.push([x, y, z]);
    }

    return points;
  }

  private generateEllipsoidPoints(centerX: number, centerY: number, centerZ: number, radiusX: number, radiusY: number, radiusZ: number, numPoints: number): [number, number, number][] {
    const points: [number, number, number][] = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = centerX + radiusX * Math.sin(phi) * Math.cos(theta);
      const y = centerY + radiusY * Math.sin(phi) * Math.sin(theta);
      const z = centerZ + radiusZ * Math.cos(phi);
      points.push([x, y, z]);
    }

    return points;
  }

  private generateCylinderPoints(centerX: number, centerY: number, centerZ: number, radius: number, height: number, numPoints: number): [number, number, number][] {
    const points: [number, number, number][] = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const y = centerY + (Math.random() - 0.5) * height;
      const x = centerX + radius * Math.cos(theta);
      const z = centerZ + radius * Math.sin(theta);
      points.push([x, y, z]);
    }

    return points;
  }

  private generateBoxPoints(centerX: number, centerY: number, centerZ: number, width: number, height: number, depth: number, numPoints: number): [number, number, number][] {
    const points: [number, number, number][] = [];

    for (let i = 0; i < numPoints; i++) {
      const x = centerX + (Math.random() - 0.5) * width;
      const y = centerY + (Math.random() - 0.5) * height;
      const z = centerZ + (Math.random() - 0.5) * depth;
      points.push([x, y, z]);
    }

    return points;
  }

  generatePointCloudData(): string {
    const points = this.generatePoints();

    switch (this.format) {
      case 'PLY':
        return this.generatePLYData(points);
      case 'PCD':
        return this.generatePCDData(points);
      case 'XYZ':
        return this.generateXYZData(points);
      default:
        throw new Error('Unsupported format');
    }
  }

  private generatePLYData(points: [number, number, number][]): string {
    let data = 'ply\n';
    data += 'format ascii 1.0\n';
    data += `element vertex ${points.length}\n`;
    data += 'property float x\n';
    data += 'property float y\n';
    data += 'property float z\n';
    data += 'end_header\n';

    for (const [x, y, z] of points) {
      data += `${x} ${y} ${z}\n`;
    }

    return data;
  }

  private generatePCDData(points: [number, number, number][]): string {
    let data = '# .PCD v0.7 - Point Cloud Data file format\n';
    data += 'VERSION 0.7\n';
    data += `FIELDS x y z\n`;
    data += `SIZE 4 4 4\n`;
    data += `TYPE F F F\n`;
    data += `COUNT 1 1 1\n`;
    data += `WIDTH ${points.length}\n`;
    data += `HEIGHT 1\n`;
    data += `VIEWPOINT 0 0 0 1 0 0 0\n`;
    data += `POINTS ${points.length}\n`;
    data += `DATA ascii\n`;

    for (const [x, y, z] of points) {
      data += `${x} ${y} ${z}\n`;
    }

    return data;
  }

  private generateXYZData(points: [number, number, number][]): string {
    let data = '';

    for (const [x, y, z] of points) {
      data += `${x} ${y} ${z}\n`;
    }

    return data;
  }
}
