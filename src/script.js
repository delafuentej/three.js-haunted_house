import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';



/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();


/**
 * Textures
 * 
 */
const textureLoader = new THREE.TextureLoader();

//FLOOR TEXTURE
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg');

const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.repeat.set(8,8);
floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);


floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

// WALL TEXTURE
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg');
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg');
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// ROOF TEXTURE
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg');
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg');
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg');

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

//BUSH TEXTURE
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg');
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg');
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg');

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;
// END BUSH TEXTURE

// GRAVES TEXTURE
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg');
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg');
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg');

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

// DOOR TEXTURE
const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace


// 
/**
 * House
 * to create a group  in case we want to move  or 
 * scale the whole thing
 */

/**
 * FLOOR: squared plane perfectly centered in the scene 0
 * on the y-axis
 */

const  floorMeasurements = {
    width: 20,
    height: 20,
    widthSegments: 100,
    heightSegments: 100,
}
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry( 
        floorMeasurements.width, 
        floorMeasurements.height,
        floorMeasurements.widthSegments,
        floorMeasurements.heightSegments
    )
        ,
    new THREE.MeshStandardMaterial({
         alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2
        })
);

floor.rotation.x = - Math.PI * 0.5;
scene.add(floor);

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// END FLOOR
const houseMeasurements = {
    width: 4,
    height: 2.5,
    depth: 4,
}
//house container
const house =  new THREE.Group();
//add various house components into the house group (walls,...)
scene.add(house);
// 1. WALLS
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(
        houseMeasurements.width, 
        houseMeasurements.height, 
        houseMeasurements.depth
    ),
    new THREE.MeshStandardMaterial(
        { 
            map: wallColorTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture,
            normalMap: wallNormalTexture
        }
    )
);

walls.position.y += houseMeasurements.height / 2;

house.add(walls);

// END WALLS

// 2. ROOF
//PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
const roofMeasurements = {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
}
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(
        roofMeasurements.radius,
         roofMeasurements.height, 
         roofMeasurements.radialSegments,
    ),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
);

roof.position.y += houseMeasurements.height +  roofMeasurements.height / 2;
roof.rotation.y += Math.PI / 4 ;

house.add(roof);

//  3. DOOR

const doorMeasurements = {
    width: 2.2,
    height: 2.2,
    widthSegments: 100,
    hightSegments: 100,
}

const door = new THREE.Mesh(
    new THREE.PlaneGeometry( 
        doorMeasurements.width,
        doorMeasurements.height,
        doorMeasurements.widthSegments,
        doorMeasurements.hightSegments
    ),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    } )
)

door.position.y += doorMeasurements.width /2,
door.position.z += houseMeasurements.depth / 2 + 0.01;
house.add(door);

// 4. BUSHES
const bushMeasurements = {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16,
}
const bushGeometry = new THREE.SphereGeometry( 
    bushMeasurements.radius, 
    bushMeasurements.widthSegments,
    bushMeasurements.heightSegments
     );
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.scale.setScalar(0.5);// === bush1.scale.set(0.5, 0,5, 0.5)
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = - 0.75;

bush2.scale.setScalar(0.25);// === bush1.scale.set(0.5, 0,5, 0.5)
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = - 0.75;

bush3.scale.setScalar(0.4);// === bush1.scale.set(0.5, 0,5, 0.5)
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = - 0.75;

bush4.scale.setScalar(0.15);// === bush1.scale.set(0.5, 0,5, 0.5)
bush4.position.set(-1, 0.05, 2.6);
house.add(bush4);
bush4.rotation.x = - 0.75;



house.add(bush1, bush2, bush3, bush4)



// 5. GRAVES "OUT OF THE HOUSE GROUP"
const graves =  new THREE.Group();
scene.add(graves);

const gravesMeasurements = {
    width: 0.6,
    height: 0.8,
    depth: 0.2,
};
const gravesGeometry = new THREE.BoxGeometry(
    gravesMeasurements.width,
    gravesMeasurements.height,
    gravesMeasurements.depth,
);
const gravesMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
});


for(let i = 0; i < 30; i++){
//to distribute the tombs around the house we need the following: 
// 1. a random angle between 0  and a full circle, 
//using radians where Math.PI is = to 3.1415.. = half circle
//since we want a full circle, we need "Math.PI * 2"
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;


//in trigonometry, when you send the same angle to sine & cosine,
// you end up with the "x" and "y" coordinates of a circle positioning
    // mesh
    const grave =  new THREE.Mesh(gravesGeometry, gravesMaterial);
    grave.position.x = x;
    grave.position.y = Math.random() * gravesMeasurements.height/2;
    grave.position.z = z;
    grave.rotation.x = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5)  * 0.4;
    grave.rotation.z = (Math.random() - 0.5)  * 0.4;

    graves.add(grave);
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()