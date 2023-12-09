<template>
  <div
    v-if="paginationPages !== undefined && paginationPages > 0"
    class="pagination animate__animated animate__slideInLeft"
  >
    <div class="pagination-wrapper">
      <div class="pagination-wrapper-arrow-left">
        <img
          src="@/assets/icons/arrow-left-50.png"
          alt="prev_pagination_page"
          class="pagination-wrapper-arrow-left-img"
          :class="{ unactive: rangeStart < 1 }"
          @click="prevPaginationPage()"
        />
      </div>
      <div
        v-for="(page, i) in pages"
        :key="i"
        class="pagination-wrapper-page"
        :class="{ active: page === currentPage }"
        @click="selectPage(page)"
      >
        <router-link
          class="pagination-wrapper-page-link"
          :to="{ name: $route.name, query: { page } }"
        >
          {{ page }}
        </router-link>
      </div>
      <div class="pagination-wrapper-arrow-right">
        <img
          src="@/assets/icons/arrow-left-50.png"
          alt="next_pagination_page"
          class="pagination-wrapper-arrow-right-img flipped"
          :class="{ unactive: paginationPages - rangeStart <= 10 }"
          @click="nextPaginationPage()"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ThePagination',
    props: {
      paginationPages: {
        type: Number,
        default: 1,
      },
    },
    data: () => ({
      rangeStart: 0,
      pages: [],
    }),
    computed: {
      currentPage() {
        const currentPage = +this.$route.query.page;

        return isNaN(currentPage) || currentPage === 0 ? 1 : currentPage;
      },
    },
    watch: {
      rangeStart() {
        this.setPages(this.rangeStart, this.paginationPages);
      },
    },
    created() {
      let roundTo10th;

      if (this.currentPage < this.paginationPages) {
        roundTo10th = Math.floor((this.currentPage - 1) / 10) * 10;
      } else {
        roundTo10th = this.paginationPages - 10;
      }

      this.rangeStart = roundTo10th;
      this.setPages(roundTo10th, this.paginationPages);
    },
    methods: {
      selectPage(page) {
        this.$emit('selectPage', page);
      },
      setPages(start, pages) {
        const res = [];

        for (let i = start; i < start + 10; i++) {
          if (pages > i && i >= 0) {
            res.push(i + 1);
          }
        }

        this.pages = res;
      },
      nextPaginationPage() {
        const newStart =
          Number(this.paginationPages) - 10 - Number(this.rangeStart);

        if (newStart > 1) {
          this.rangeStart += 10;
        }
      },
      prevPaginationPage() {
        if (this.rangeStart - 10 > 0) {
          this.rangeStart -= 10;
        } else {
          this.rangeStart = 0;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .flipped {
    transform: rotate(180deg);
  }

  .pagination {
    background-color: #fff;
    border-radius: $border-radius;
    padding: $break;
    display: flex;
    justify-content: center;

    &-wrapper {
      display: grid;
      grid-template-columns: repeat(12, 35px);
      grid-template-rows: 35px;
      grid-gap: $break;

      &-page {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $main-color;
        opacity: 0.4;
        border-radius: $border-radius;
        cursor: pointer;

        &-link {
          @include link;

          text-decoration: none;
          color: $main-color !important;
        }
      }

      &-arrow,
      &-right {
        &-left,
        &-right {
          display: flex;
          align-items: center;

          &-img {
            width: 25px;
            height: 25px;

            &.unactive {
              opacity: 0.3;
            }
          }
        }
      }
    }
  }

  .active {
    opacity: 1;
    color: black;
    font-weight: 600;
    border: 2px solid #2a544ccc;
  }
</style>
