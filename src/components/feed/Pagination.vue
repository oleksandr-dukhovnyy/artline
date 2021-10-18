<template>

	<div class="pagination">
		<div class="pagination-wrapper">
			<div class="pagination-wrapper-page"
				v-for="(page, i) in pages"
				:key="i"
				:class="{active: page-1 === currentPage && page !== '...'}"

				@click="selectedPage(i, page)"
			>
				<router-link class="pagination-wrapper-page-link" :to="{name: 'home'}">
					{{ page }}
				</router-link>
				
			</div>
		</div>
		
	</div>

</template>

<script>

export default {
	name: 'Pagination',
	data: () => ({
		paginationPages: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10
		],
		currentPage: 0,
		rangeStart: 0
	}),
	computed: {
		pages(){
			// let res = this.paginationPages.slice(this.rangeStart);

			// if( this.paginationPages.length - this.rangeStart > 9 && this.paginationPages.length / this.rangeStart > 0.5 ){
			// 	res = res.filter((item, i, arr)=> i < 6 || i === arr.length-1);
			// 	res[res.length-2] = '...';
			// }

			// return res;

			return this.paginationPages;
		}
	},
	methods: {
		selectedPage(pageName){
			this.currentPage = pageName;
			//this.$router.push( '/postpage=?'+pageName );
		}
	},
}

</script>

<style lang="scss" scoped>

	@import '@/assets/scss/mixins.scss';

	.pagination {
		background-color: #fff;
		border-radius: $border-radius;
		padding: $break;
		display: flex;
		justify-content: center;

		&-wrapper {
			display: grid;
			grid-template-columns: repeat(10, 35px);
			grid-gap: $break;

			&-page {
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid $main-color;
				opacity: 0.4;
				border-radius: $border-radius;

				&-link {
					@include link;
					text-decoration: none;
					color: $main-color !important;
				}
			}
		}

		
	}

	.active {
		opacity: 1;
		color: black;
		// text-decoration: underline;
		font-weight: 600;
		border: 2px solid #2a544ccc;
	}

</style>