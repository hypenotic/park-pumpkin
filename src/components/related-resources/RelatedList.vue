<template>
    <section class="related-resources" id="related-resources-jump">
        <!-- <h3 v-html="data.meta_box._page_grant_resource_heading"></h3> -->
        <h3 v-html="title"></h3>
        <!-- <div class="related-resources-copy" v-html="data.meta_box._page_grant_resource_copy"></div> -->
        <div class="related-resources-copy" v-html="copy"></div>
        <div class="wide-container">
            <div class="columns is-multiline">
                <app-card v-for="related in posts" :key="related.title.rendered" :related="related">
                </app-card>
            </div>
        </div>
    </section>
</template>

<script>
    import RelatedCard from './RelatedCard.vue';
    export default {
        props: ['title', 'copy', 'posts'],
        components: {
            appCard: RelatedCard
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: { 
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>

@import '../../styles/variables.scss';

.related-resources {
	padding: 24px;
	padding-bottom: 180px;
	margin-top: 50px;
	margin-bottom: -50px;
	@media #{$medium-and-up} {
		padding: 50px;
		padding-bottom: 200px;
	}
	h3 {
		color: $green;
        font-size: 40px;
        text-align: center;
		@media #{$small-and-down} {
			font-size: 32px;
			font-weight: bold;
		}
	}
	a {
        border-bottom: 1px solid $blue;
        &:hover {
            color: $blue;
            font-weight: bold;
        }
    }
}

.related-resources-copy {
	text-align: center;
	margin-bottom: 40px;
}

.single-card:first-child {
	transform: rotate(-2deg);
}

.single-card:nth-child(7n) {
	transform: rotate(-2deg);
}

.single-card:nth-child(3n) {
	transform: rotate(2deg);
}

</style>
