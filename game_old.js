import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1 / 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

function getSquareDimension() {
    return Math.min(window.innerWidth, window.innerHeight) - 15 * 2;
}

renderer.setSize(getSquareDimension(), getSquareDimension());

let forward_button;
let left_button;
let right_button;

let floor;
let front_wall;
let front_door;
let shelves = [];
function start() {
    scene.background = new THREE.Color().setHex(0xaeaeae);
    let directional = new THREE.DirectionalLight(0xfaf0d9, 1.2);
    scene.add(directional);
    let ambient = new THREE.AmbientLight(0xbeceed, 1);
    scene.add(ambient);
    // ===============================================

    forward_button = document.querySelector("#forward");
    left_button = document.querySelector("#left");
    right_button = document.querySelector("#right");

    // input evetns type shiiii
    forward_button.ontouchstart = (event) => {
        event.preventDefault();
        walk_multiplier++;
    };
    left_button.ontouchstart = (event) => {
        event.preventDefault();
        turn_multiplier++;
    };
    right_button.ontouchstart = (event) => {
        event.preventDefault();
        turn_multiplier--;
    };
    forward_button.ontouchend = (event) => { walk_multiplier--; };
    left_button.ontouchend = (event) => { turn_multiplier--; };
    right_button.ontouchend = (event) => { turn_multiplier++; };

    // ===============================================

    const floor_texture = new THREE.TextureLoader().load("./tile.png");
    floor_texture.wrapS = THREE.RepeatWrapping;
    floor_texture.wrapT = THREE.RepeatWrapping;
    floor_texture.repeat.set(50, 50);

    let floor_material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, map: floor_texture
    });
    floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floor_material);
    scene.add(floor);
    floor.rotation.x = -Math.PI / 2;
    // ===============================================

    const wall_texture = new THREE.TextureLoader().load("./brick.png");
    wall_texture.wrapS = THREE.RepeatWrapping;
    wall_texture.wrapT = THREE.RepeatWrapping;
    wall_texture.repeat.set(50, 50);

    let wall_material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, map: wall_texture
    });
    front_wall = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), wall_material);
    scene.add(front_wall);
    front_wall.rotation.y = Math.PI;
    front_wall.position.z = 2;
    // ===============================================

    camera.position.y = 1.75;
}

let old_time = Date.now();
let turn_multiplier = 0;
let walk_multiplier = 0;

function update() {
    // calculate delta
    let new_time = Date.now();
    let delta = (new_time - old_time) / 1000; // time / 1 frame
    old_time = new_time;
    // ===============================================

    camera.rotation.y += turn_multiplier * 1 * delta;
    let forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    camera.position.add(forward.multiplyScalar(delta * 4.25 * walk_multiplier));
    console.log(walk_multiplier);

    // ===============================================
    renderer.render(scene, camera);
}

function startupSequence() {
    //
}

document.body.onload = () => {
    let fake_loading_time = 2000;
    fake_loading_time = 1;

    setTimeout(() => {
        document.getElementById("game").appendChild(renderer.domElement);
        document.getElementById("loading").style.display = "none";

        start();
        // setInterval(update, 10);
        renderer.setAnimationLoop(update);
    }, fake_loading_time);
}