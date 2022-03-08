import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// CAMERA
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(-35, 70, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// RENDERER
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// WINDOW RESIZE HANDLING
export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// SCENE
const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color('#cccccc');

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

export function animate() {
  dragObject();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// ambient light
let hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
scene.add(hemiLight);

//Add directional light
let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-30, 50, -30);
scene.add(dirLight);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -70;
dirLight.shadow.camera.right = 70;
dirLight.shadow.camera.top = 70;
dirLight.shadow.camera.bottom = -70;

function createFloor() {
  let pos = { x: 0, y: -1, z: 3 };
  let scale = { x: 100, y: 2, z: 100 };

  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(),
       new THREE.MeshPhongMaterial({ color: '#4d4d4d' }));
  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);
  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;
  scene.add(blockPlane);
  var grid = new THREE.GridHelper(scale.x, 10);
  grid.position.set(pos.x, pos.y+1, pos.z);
  scene.add(grid);

  blockPlane.userData.ground = true
}

function createRoomFloor(xAxis, yAxis, zAxis, depth){
  let scale = { x: 10, y: 1, z: 10 }
  let pos = { x: 15, y: scale.y / 2, z: 15 }
  let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
      new THREE.MeshPhongMaterial({ color: 0xDC143C }));
      box.position.set(pos.x, pos.y, pos.z);
      box.scale.set(scale.x, scale.y, scale.z);
      box.castShadow = true;
      box.receiveShadow = true;
      box.userData.draggable = true
      box.userData.name = 'BOX'
      scene.add(box)

      let box2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
      new THREE.MeshPhongMaterial({ color: 0xDC143C }));
      box2.position.set(pos.x +10, pos.y+10, pos.z+10);
      box2.scale.set(10, 10, 10);
      box2.castShadow = true;
      box2.receiveShadow = true;
      box2.userData.draggable = true
      box2.userData.name = 'BOX'
      scene.add(box2)
      // box.add(box2)




      // //Create a frame shape..
      // var frame = new THREE.Shape();
      // frame.moveTo( xAxis, -yAxis );
      // frame.lineTo( xAxis, yAxis );
      // frame.lineTo( -xAxis, yAxis );
      // frame.lineTo( -xAxis, -yAxis );

      // // var wall1 = createRoomWall(1,1,1,1,frame);
      // // frame.add(wall1);

      // //Extrude the shape into a geometry, and create a mesh from it:
      // var extrudeSettings = {
      //   steps: 1,
      //   depth: depth,
      //   bevelEnabled: false,
      // };
      // var geom = new THREE.ExtrudeGeometry(frame, extrudeSettings);
      // var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({ color: 0xDC143C }));

      // mesh.castShadow = true;
      // mesh.receiveShadow = true;
      // mesh.userData.draggable = true
      // mesh.userData.name = 'BOX'
      // // mesh.position.set(pos.x +10, pos.y+10, pos.z+10);
      // // scene.add(mesh);
      // box.add(mesh);
}
function createRoomWall(xAxis, yAxis, zAxis, depth,frame){
      var hole = new THREE.Path();
      hole.moveTo(-3, -2);
      hole.lineTo( 3, -2);
      hole.lineTo( 3,  2);
      hole.lineTo(-3,  2);
      return hole
}

// box
function createBox() {
  createRoomFloor(0.5, 1, 1, 1)
  // let scale = { x: 10, y: 1, z: 10 }
  // let pos = { x: 15, y: scale.y / 2, z: 15 }

  // let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
  //     new THREE.MeshPhongMaterial({ color: 0xDC143C }));
  // box.position.set(pos.x, pos.y, pos.z);
  // box.scale.set(scale.x, scale.y, scale.z);
  // box.castShadow = true;
  // box.receiveShadow = true;
  // scene.add(box)

  // var box2 = box;
  // box2.position.set(pos.x+10, pos.y, pos.z+10);
  // box2.scale.set(scale.x+10, scale.y + 10, scale.z);
  // box.add(box2)

  // box.userData.draggable = true
  // box.userData.name = 'BOX'
}

function createSphere() {
  let radius = 4;
  let pos = { x: 15, y: radius, z: -15 };

  let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(radius, 32, 32), 
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 }))
  sphere.position.set(pos.x, pos.y, pos.z)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  sphere.userData.draggable = true
  sphere.userData.name = 'SPHERE'
}

function createCylinder() {
  let radius = 4;
  let height = 6
  let pos = { x: -15, y: height / 2, z: 15 };

  // threejs
  let cylinder = new THREE.Mesh(new THREE.CylinderBufferGeometry(radius, radius, height, 32), new THREE.MeshPhongMaterial({ color: 0x90ee90 }))
  cylinder.position.set(pos.x, pos.y, pos.z)
  cylinder.castShadow = true
  cylinder.receiveShadow = true
  scene.add(cylinder)

  cylinder.userData.draggable = true
  cylinder.userData.name = 'CYLINDER'
}

function createCastle () {
  const objLoader = new OBJLoader();

  objLoader.loadAsync('./castle.obj').then((group) => {
    const castle = group.children[0];

    castle.position.x = -15
    castle.position.z = -15

    castle.scale.x = 5;
    castle.scale.y = 5;
    castle.scale.z = 5;

    castle.castShadow = true
    castle.receiveShadow = true

    castle.userData.draggable = true
    castle.userData.name = 'CASTLE'

    scene.add(castle)
  })
}

function createHighLightOnFloor(){
  console.log(draggable)
  if(draggable != null){
    let scale = { x: draggable.scale.x, y: draggable.scale.y, z: draggable.scale.z }
    let pos = { x: draggable.position.x, y: 0.5, z:  draggable.position.z }
    let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), 
        new THREE.MeshPhongMaterial({ color: 0xDC143C }));
        box.position.set(pos.x, pos.y, pos.z);
        box.scale.set(scale.x, scale.y, scale.z);
        box.castShadow = true;
        box.receiveShadow = true;
        box.userData.draggable = true
        box.userData.name = 'BOX2'
        scene.add(box)

        //create a blue LineBasicMaterial
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } )
        const points = [];
        points.push( new THREE.Vector3( draggable.position.x + draggable.scale.x/2, 0, draggable.position.z + draggable.scale.z/2 ) );
        points.push( new THREE.Vector3( 0, 0, draggable.position.z + draggable.scale.z/2 ) );
        // points.push( new THREE.Vector3( 10, 0, 10) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        draggable.add( line );

  }
}

const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once
var draggable: THREE.Object3D;

function intersect(pos: THREE.Vector2) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObjects(scene.children);
}

window.addEventListener('click', event => {
  if (draggable != null) {
    console.log(`dropping draggable ${draggable.userData.name}`)
    draggable.position.y = 0.5;
    draggable = null as any
    return;
  }

  // THREE RAYCASTER
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const found = intersect(clickMouse);
  if (found.length > 0) {
    if (found[0].object.userData.draggable) {
      draggable = found[0].object
      console.log(`found draggable ${draggable.userData.name}`)
      draggable.position.y = 10;
      console.log(draggable);
      createHighLightOnFloor();
    }
  }
})

window.addEventListener('mousemove', event => {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function dragObject() {
  if (draggable != null) {
    const found = intersect(moveMouse);
    if (found.length > 0) {
      for (let i = 0; i < found.length; i++) {
        if (!found[i].object.userData.ground)
          continue
        
        let target = found[i].point;
        draggable.position.x = target.x
        draggable.position.z = target.z
      }
    }
  }
}


createFloor()
createBox()
// createSphere()
// createCylinder()
// createCastle()

animate()
