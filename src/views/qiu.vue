<!-- 
  球型形贴图
 -->
<template>
  <div ref="Dom" id="con"></div>

  <div class="pop" v-if="popIsShow" @click="popIsShow = false">
    这里是视频 点击关闭
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
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
const render = () => {
  kzqi.update(); // 控制器更新
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 添加球形-球缓冲几何体 球体半径 水平分段数（沿着经线分段） 垂直分段数（沿着纬线分段）
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const loader = new RGBELoader();
loader.load(
  "./images/hdr/ersisd-Merksem_Appartment_Living_4k.hdr",
  (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture }); // 基础网格材质 颜色贴图。可以选择包括一个alpha通道
    const sphere = new THREE.Mesh(geometry, material); // 网格-物体-材质
    sphere.geometry.scale(1, 1, -1); // 贴图反过来
    scene.add(sphere); // 放入场景
  }
);
//辅组坐标系
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

// 点的材质  点击点
let poinTtxture = new THREE.TextureLoader().load("./images/txxxx.jpg");
const material = new THREE.SpriteMaterial({
  map: poinTtxture,
  color: 0xffffff,
});
const sprite = new THREE.Sprite(material);
sprite.scale.set(0.05, 0.05, 0.1);
sprite.position.set(0.3, 0.02, -0.35);
scene.add(sprite);


// 点击点2
let poinTtxture2 = new THREE.TextureLoader().load("./images/lgo.png");
const material2 = new THREE.SpriteMaterial({
  map: poinTtxture2,
  color: 0xffffff,
});
const sprite2 = new THREE.Sprite(material2);
sprite2.scale.set(0.05, 0.05, 0.05);
sprite2.position.set(-0.34, 0.02, -0.23);
scene.add(sprite2);

// 控制器函数 camera相机 dom实例
const initControls = (camera, dom) => {
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true; // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.dampingFactor = 0.25; //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  controls.enableZoom = false; //是否可以缩放
  controls.autoRotate = false; //是否自动旋转
  controls.autoRotateSpeed = 3; //自动旋转步进
  controls.minDistance = 0.2; //设置相机距离原点的最远距离
  controls.enablePan = true; //是否开启右键拖拽
  kzqi = controls; // 控制器更新用到
  // controls.update(); // 需要在循环中调用 控制器更新
  return controls;
};

// 点击事件
const popIsShow = ref(false);
const onzhuce = () => {
  // this.$refs.container.addEventListener('mousemove', this.onMouseMove, false)
  document.querySelector("#con").addEventListener("click", (event) => {
    event.preventDefault();
    let reycaster = new THREE.Raycaster(); //光线投射  光线投射用于进行鼠标拾取
    let mouse = new THREE.Vector2(); //创建二维向量
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // 通过鼠标位置计算出raycaster;
    reycaster.setFromCamera(mouse, camera);
    // 计算raycaster直线和场景中物体的相交点;
    // let intersects = reycaster.intersectObjects(scene.children);
    let intersects = reycaster.intersectObjects([sprite]);
    if (intersects.length > 0) {
      popIsShow.value = true;
    }
    let intersects2 = reycaster.intersectObjects([sprite2]);
    if (intersects2.length > 0) {
      // 切换场景
      alert("切换场景")
    }
  });
};

onMounted(() => {
  // 添加控制器 camera相机 dom实例
  initControls(camera, Dom.value);
  // 渲染器放入页面
  Dom.value.appendChild(renderer.domElement);
  render(); // 开始渲染

  // 点击事件
  onzhuce();
});
</script>

<style>
.pop {
  position: fixed;
  z-index: 10;
  left: 40%;
  top: 20%;
  background-color: #fff;
  width: 400px;
  height: 300px;
}
</style>
