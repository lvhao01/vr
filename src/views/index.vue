<!-- 
  六个边贴图
 -->
<template>
  <div ref="Dom"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
// dom实例
const Dom = ref(null);

// 初始化场景
const scene = new THREE.Scene();
// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
// 相机位置
camera.position.z = 0.1;
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器宽高

// 渲染函数
let kzqi = null; // 控制器
const render = (aa) => {
  !kzqi && (kzqi = aa);
  kzqi.update(); // 控制器更新
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 添加立方体
const geometry = new THREE.BoxGeometry(10, 10, 10);

// 立方体贴图
let arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
let chartletArr = [];
arr.forEach((item) => {
  // 纹理加载
  let texture = new THREE.TextureLoader().load(`./images/living/${item}.jpg`);
  // 创建材质
  if (item === "4_u" || item === "4_d") {
    texture.rotation = Math.PI;
    texture.center = new THREE.Vector2(0.5, 0.5);
    chartletArr.push(new THREE.MeshBasicMaterial({ map: texture }));
  } else {
    chartletArr.push(new THREE.MeshBasicMaterial({ map: texture }));
  }
});
const cube = new THREE.Mesh(geometry, chartletArr);
cube.geometry.scale(1, 1, -1);// 贴片反过来
scene.add(cube); // 放入场景

onMounted(() => {
  // 添加控制器 camera相机 dom实例
  const controls = new OrbitControls(camera, Dom.value);
  controls.enableDamping = true; // 打开阻尼感
  // 渲染器放入页面
  Dom.value.appendChild(renderer.domElement);
  render(controls); // 开始渲染
});
</script>
