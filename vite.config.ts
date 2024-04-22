import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// import { terser } from 'rollup-plugin-terser'
// import { babel } from '@rollup/plugin-babel'
// import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})


// base：设置公共基础路径。
// resolve.alias：配置路径别名，可以更方便地引用模块。
// css.preprocessorOptions：配置 CSS 预处理器的选项，这里启用了 Less 的 JavaScript 支持。
// plugins：配置 Vite 插件。
// react()：提供 React 支持。
// visualizer()：生成打包分析报告。
// terser()：代码压缩插件。
// babel()：Babel 转译插件，用于转译 ES6+ 代码。
// legacy()：提供对旧浏览器的支持。
// build.sourcemap：生成源码映射文件，方便调试。
// build.rollupOptions.output.manualChunks：手动分割代码块，将第三方库拆分为单独的 chunk。
// server.port：设置开发服务器的端口号。
// server.open：在开发服务器启动时自动打开浏览器。
// server.proxy：配置开发服务器的代理规则，用于解决跨域问题。