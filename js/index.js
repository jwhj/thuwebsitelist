AV.init({
	appId: 'jJdrbW3fWjb9JjkalcLYU0KK-MdYXbMMI',
	appKey: 'pFxwVPjxhnsU2y3IwscxrGlP'
})
const vm = new Vue({
	el: '#app',
	data: {
		lst: JSON.parse(localStorage.lst || '[]'),
		showEditor: false,
		key: '',
		name: '',
		url: '',
		loading: false
	},
	methods: {
		load() {
			this.loading = true
			const q = new AV.Query('lst')
			q.find().then(lst => {
				const tmpLst = []
				for (let i of lst) {
					const tmp = [i.get('name'), i.get('url')]
					tmpLst.push(tmp)
				}
				this.lst = tmpLst
				localStorage.lst = JSON.stringify(this.lst)
				this.loading = false
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