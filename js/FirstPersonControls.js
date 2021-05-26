// // W S A D 的keycode
// const KEY_W = 87;
// const KEY_S = 83;
// const KEY_A = 65;
// const KEY_D = 68;

// class FirstPersonControls {
//     constructor(camera, domElement) {
//         this.domElement = domElement || document.body;
//         this.isLocked = false;
//         this.camera = camera;

//         // 初始化camera, 将camera放在pitchObject正中央
//         camera.rotation.set(0, 0, 0);
//         camera.position.set(0, 0, 0);

//         // 将camera添加到pitchObject, 使camera沿水平轴做旋转, 并提升pitchObject的相对高度
//         this.pitchObject = new THREE.Object3D();
//         this.pitchObject.add(camera);
//         this.pitchObject.position.y = 10;

//         // 将pitObject添加到yawObject, 使camera沿竖直轴旋转
//         this.yawObject = new THREE.Object3D();
//         this.yawObject.add(this.pitchObject);

//         // 初始化移动状态
//         this.moveForward = false;
//         this.moveBackward = false;
//         this.moveLeft = false;
//         this.moveRight = false;
//     }

//     onPointerlockChange() {
//         console.log(this.domElement);
//         this.isLocked = document.pointerLockElement === this.domElement;
//     }

//     onPointerlockError() {
//         console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');
//     }

//     onMouseMove(event) {
//         if (this.isLocked) {
//             let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
//             let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

//             this.yawObject.rotation.y -= movementX * 0.002;
//             this.pitchObject.rotation.x -= movementY * 0.002;
//             // 这一步的目的是什么
//             this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
//         }
//     }

//     onKeyDown(event) {
//         switch (event.keyCode) {
//             case KEY_W:
//                 this.moveForward = true;
//                 break;
//             case KEY_A:
//                 this.moveLeft = true;
//                 break;
//             case KEY_S:
//                 this.moveBackward = true;
//                 break;
//             case KEY_D:
//                 this.moveRight = true;
//                 break;
//         }
//     }

//     onKeyUp(event) {
//         switch (event.keyCode) {
//             case KEY_W:
//                 this.moveForward = false;
//                 break;
//             case KEY_A:
//                 this.moveLeft = false;
//                 break;
//             case KEY_S:
//                 this.moveBackward = false;
//                 break;
//             case KEY_D:
//                 this.moveRight = false;
//                 break;
//         }
//     }

//     update(delta) {
//         // 移动速度
//         const moveSpeed = 100;

//         // 确定移动方向
//         let direction = new THREE.Vector3();
//         direction.x = Number(this.moveRight) - Number(this.moveLeft);
//         direction.z = Number(this.moveBackward) - Number(this.moveForward);
//         direction.y = 0;

//         // 移动方向向量归一化，使得实际移动的速度大小不受方向影响
//         if (direction.x !== 0 || direction.z !== 0) {
//             direction.normalize();
//         }

//         // 移动距离等于速度乘上间隔时间delta
//         if (this.moveForward || this.moveBackward) {
//             this.yawObject.translateZ(moveSpeed * direction.z * delta);
//         }
//         if (this.moveLeft || this.moveRight) {
//             this.yawObject.translateX(moveSpeed * direction.x * delta);
//         }
//     }

//     connect() {
//         this.domElement.addEventListener('click', this.domElement.requestPointerLock);
//         // 在函数后面添加bind(this)的目的是什么
//         document.addEventListener('pointerlockchange', this.onPointerlockChange.bind(this), false);
//         document.addEventListener('pointerlockerror', this.onPointerlockError.bind(this), false);
//         document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
//         //keybind
//         document.addEventListener('keydown', this.onKeyDown.bind(this), false);
//         document.addEventListener('keyup', this.onKeyUp.bind(this), false);
//     }

// }


// W S A D 的keycode
const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

class FirstPersonControls  {
    constructor(camera, domElement) {
        this.domElement = domElement || document.body;
        this.isLocked = false;
        this.camera = camera;

        //初始化camera,将camera放在pitchObject正中央
        camera.rotation.set(0, 0, 0);
        camera.position.set(0, 0, 0);

        // 将camera添加到pitchObject, 使camera沿水平轴做旋转, 并提升pitchObject的相对高度
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(camera);
        this.pitchObject.position.y = 10;

        // 将pitObject添加到yawObject, 使camera沿竖直轴旋转
        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);

        // 初始化移动状态
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
    }

    onPointerlockChange() {
        console.log(this.domElement);
        this.isLocked = document.pointerLockElement === this.domElement;
    }

    onPointerlockError() {
        console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );
    }

    onMouseMove(event) {
        if (this.isLocked) {
            let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            // Modify the virtual rotation instead of the real one
            this.yawObject.rotation.y -= movementX * 0.002;
            // this.pitchObject.rotation.y -= movementX * 0.002;//这样写地板也会跟着旋转，我们想要的效果是只对填空选择，地板是不变的
            this.pitchObject.rotation.x -= movementY * 0.002;
						// 这一步的目的是什么
                        //注释取消这一步，垂直移动效果不好
            // this.pitchObject.rotation.x = Math.max( - Math.PI / 2, Math.min( Math.PI / 2, this.pitchObject.rotation.x ) );
        }
    }

	onKeyDown(event) {
        switch (event.keyCode) {
          case KEY_W: this.moveForward = true; break;
          case KEY_A: this.moveLeft = true; break;
          case KEY_S: this.moveBackward = true; break;
          case KEY_D: this.moveRight = true; break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
          case KEY_W: this.moveForward = false; break;
          case KEY_A: this.moveLeft = false; break;
          case KEY_S: this.moveBackward = false; break;
          case KEY_D: this.moveRight = false; break;
        }
    }

    update(delta) {
        // 移动速度
        const moveSpeed = 100;
        
        // 确定移动方向
        let direction = new THREE.Vector3();
        direction.x = Number(this.moveRight) - Number(this.moveLeft);
        direction.z = Number(this.moveBackward) - Number(this.moveForward);
        direction.y = 0;
    
        // 移动方向向量归一化，使得实际移动的速度大小不受方向影响
        if (direction.x !== 0 || direction.z !== 0) {
          direction.normalize();
        }
            
        // 移动距离等于速度乘上间隔时间delta
        if (this.moveForward || this.moveBackward) {
          this.yawObject.translateZ(moveSpeed * direction.z * delta);
        }
        if (this.moveLeft || this.moveRight) {
          this.yawObject.translateX(moveSpeed * direction.x * delta);
        }
    }   

    connect() {
        this.domElement.addEventListener('click', this.domElement.requestPointerLock);
      	// 思考函数后面为什么要加bind(this)
        //bind()方法主要是将函数绑定到某个对象，bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()中的第一个参数的值
        //例如，f.bind(obj)，实际上可以理解为obj.f()，这时f函数体内的this自然指向的是obj；
        document.addEventListener( 'pointerlockchange', this.onPointerlockChange.bind(this), false );
        document.addEventListener( 'pointerlockerror', this.onPointerlockError.bind(this), false );
        document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false);
        document.addEventListener( 'keydown', this.onKeyDown.bind(this), false);
        document.addEventListener( 'keyup', this.onKeyUp.bind(this), false);
    }

}