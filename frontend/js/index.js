AV.init({
	appId: 'jJdrbW3fWjb9JjkalcLYU0KK-MdYXbMMI',
	appKey: 'pFxwVPjxhnsU2y3IwscxrGlP'
})
const vm = new Vue({
	el: '#app',
	data: {
		lst: [],
		showEditor: false,
		key: '',
		name: '',
		url: ''
	},
	methods: {
		load() {
			const q = new AV.Query('lst')
			q.find().then(lst => {
				this.lst = []
				for (let i of lst) {
					const tmp = [i.get('name'), i.get('url')]
					this.lst.push(tmp)
				}
			})
		},
		add() {
			const Lst = AV.Object.extend('lst')
			const i = new Lst()
			i.set('name', this.name)
			i.set('url', this.url)
			i.save().then(() => {
				this.load()
				alert('添加成功')
			}).catch(alert)
		}
	},
	mounted() {
		this.load()
	}
})