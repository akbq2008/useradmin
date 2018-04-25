<template>
	<h1>home</h1>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>