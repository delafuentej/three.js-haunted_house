import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';
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
 * Models- GLTF Loader
 */
// Instantiate a loader
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);


gltfLoader.load(
    '/models/Lantern/glTF-Draco/Lantern.gltf',
    (gltf) => {
        console.log(gltf);
        const model = gltf.scene;
        model.position.x = - 4;
        model.position.z = 5;
       
        model.scale.set(0.1, 0.1, 0.1);
        scene.add(model)
    }
);

gltfLoader.load(
    '/models/DiffuseTransmissionPlant/glTF/DiffuseTransmissionPlant.gltf',
    (gltf) => {
        console.log(gltf);
        const model = gltf.scene;
        model.position.x = - 1.5;
        model.position.z = 2.3;
       
        model.scale.set(1.1, 1.1, 1.1);
        removeLightsFromModel(model);
        scene.add(model)
    }
)

function removeLightsFromModel(model) {
    const lightsToRemove = [];

    model.traverse((child) => {
        if (child.isLight) {
            lightsToRemove.push(child); // Guardamos las luces en un array
        }
    });

    // Eliminamos las luces después de recorrer el modelo
    lightsToRemove.forEach((light) => {
        light.parent?.remove(light);
    });
}

/**
 * Textures
 * 
 */
const textureLoader = new THREE.TextureLoader();

//FLOOR TEXTURE
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp');

const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

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
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp');
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp');
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp');

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// ROOF TEXTURE
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp');
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp');
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp');

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

//BUSH TEXTURE
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp');
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp');
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp');

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;
// END BUSH TEXTURE

// GRAVES TEXTURE
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp');
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp');
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp');

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

// DOOR TEXTURE
const doorColorTexture = textureLoader.load('./door/color.webp');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp');
const doorHeightTexture = textureLoader.load('./door/height.webp');
const doorNormalTexture = textureLoader.load('./door/normal.webp');
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp');
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp');

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
 */  //color '#86cdff' => moon light
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight);
//Lantern light
const lanternLight = new THREE.PointLight('#86cdff',5);
lanternLight.position.set(0,2.2, 2.5);
lanternLight.castShadow = true;
scene.add(lanternLight);
//having th directionalLight behind the house puts the front part in the shade
// need to add  a door light using pointLight
// DOOR LIGHT
const doorLight = new THREE.PointLight('#ff7d46', 5);
// doorLight.position.y += houseMeasurements.height;
// doorLight.position.z += houseMeasurements.depth / 2;
doorLight.position.set(-3,0,5);
house.add(doorLight);


/**
 * Ghosts Section - PointLights
 */
const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#008000', 6);
const ghost4 = new THREE.PointLight('#f8f8ff', 6);
scene.add(ghost1, ghost2, ghost3, ghost4);
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
 * Shadows- Ghost PointLights
 */
//Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Cast and receive shadows- Activate the shadows on the directionalLight and the three
// ghost lights by setting their castShadow to true
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
//Go through each object (walls, roof, floor) and decide if it needs to cast shadows
// and/or receive shadows- no shadows to graves
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for(const grave of graves.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
}

// a good thing to better performance the shadows => create a camera helper
// on the light.shadowMap.camera  and then tweak the camera until it's perfect
//Mapping => object:  not cut shadows : 
//1.reduce the mapSize to 256 
//2. SeT the top, right, bottom an left to 8 & -8
//3. Set the near to 1
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = - 8;
directionalLight.shadow.camera.left = - 8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

//to do the same above for the ghosts

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

ghost4.shadow.mapSize.width = 256;
ghost4.shadow.mapSize.height = 256;
ghost4.shadow.camera.far = 10;


/**
 * Sky
 *
 */

const sky = new Sky();
//Since Sky inherits from Mesh, we can update its scale property:
//sky.scale.set( 100, 100, 100 );
sky.scale.setScalar( 450000 );
scene.add(sky);


// to tweak the parameters of the sky:(specific to ShaderMaterial) 
sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
//sky.material.uniforms['elevation'].value = 2;
//sky.material.uniforms['azimuzh'].value = 180;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

//const sun = new THREE.Vector3();
//const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
//const theta = THREE.MathUtils.degToRad( effectController.azimuth );
//sun.setFromSphericalCoords( 1, phi, theta );
//sun.material.uniforms['sunPosition'].value.copy( sun );

/**
 * Fog
 *
 */
// const fogMeasurements = {
//     color: '#ff0000',
//     near: 1, 
//     far: 13,
// };
// scene.fog = new THREE.Fog(
//     fogMeasurements.color,
//     fogMeasurements.near,
//     fogMeasurements.far
// )

const fogMeasurements = {
    color:  '#02343f', //#03343f
    density: 0.1
};
scene.fog = new THREE.FogExp2(
    fogMeasurements.color,
    fogMeasurements.density
)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed();

    //Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45);

    const ghost2Angle =  - elapsedTime * 0.38;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y =  Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45);


    const ghost3Angle =  elapsedTime * 0.23;
    ghost3.position.x = Math.cos(ghost3Angle) * 6;
    ghost3.position.z = Math.sin(ghost3Angle) * 6;
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45);

    const ghost4Angle =  elapsedTime * 0.79;
    ghost4.position.x = Math.cos(ghost4Angle) * 6;
    ghost4.position.z = Math.sin(ghost4Angle) * 6;
    ghost4.position.y = Math.sin(ghost4Angle) * Math.sin(ghost4Angle * 2.5) * Math.sin(ghost4Angle * 3.45);
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()