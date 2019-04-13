import { View as GraphicsView } from 'expo-graphics'
import ExpoTHREE, { THREE } from 'expo-three'
import React from 'react'

export default class App extends React.Component {
	componentWillMount() {
		THREE.suppressExpoWarnings()
	}

	render() {
		return (
			<GraphicsView onContextCreate={this.onContextCreate} onRender={this.onRender} />
		)
	}

	onContextCreate = async ({ gl, canvas, width, height, scale: pixelRatio, }) => {
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
		this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height })

		this.renderer.setClearColor(0xffffff)
		this.camera.position.z = 5

		let geometry = new THREE.BoxGeometry(1, 1, 1)
		let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
		this.cube = new THREE.Mesh(geometry, material)
		this.scene.add(this.cube)

		this.scene.add(new THREE.AmbientLight(0x404040))

		let light = new THREE.DirectionalLight(0xffffff, 0.5)
		light.position.set(3, 3, 3)
		this.scene.add(light)

	}

	onRender = delta => {
		this.cube.rotation.x += 0.5 * delta
		this.cube.rotation.y += 0.5 * delta
		this.renderer.render(this.scene, this.camera)
	}
}