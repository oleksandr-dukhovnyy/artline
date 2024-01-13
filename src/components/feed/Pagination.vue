<template>
  <div
    v-if="paginationPages !== undefined && paginationPages > 0"
    class="pagination"
  >
    <div class="pagination-wrapper">
      <div class="pagination-wrapper-arrow-left">
        <img
          src="@/assets/icons/arrow-left-50.png"
          alt="prev_pagination_page"
          class="pagination-wrapper-arrow-left-img"
          :class="{ inactive: currentPage === 1 }"
          @click="prevPage"
        />
      </div>
      <div
        v-for="(page, i) in pages"
        :key="i"
        class="pagination-wrapper-page"
        :class="{ active: page === currentPage }"
        @click="selectPage(page)"
      >
        <span
          class="pagination-wrapper-page-link"
          :to="{ name: $route.name, query: { page } }"
        >
          {{ page }}
        </span>
      </div>
      <div class="pagination-wrapper-arrow-right">
        <img
          src="@/assets/icons/arrow-left-50.png"
          alt="next_pagination_page"
          class="pagination-wrapper-arrow-right-img flipped"
          :class="{ inactive: currentPage >= paginationPages }"
          @click="nextPage"
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

      perPage: {
        type: Number,
        default: 5,
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
        roundTo10th =
          Math.floor((this.currentPage - 1) / this.perPage) * this.perPage;
      } else {
        roundTo10th = this.paginationPages - this.perPage;
      }

      this.rangeStart = roundTo10th;
      this.setPages(roundTo10th, this.paginationPages);
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.paginationPages) {
          this.$emit('selectPage', this.currentPage + 1);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('selectPage', this.currentPage - 1);
        }
      },
      selectPage(page) {
        if (page !== this.currentPage) {
          this.$emit('selectPage', page);
        }
      },
      setPages(start, pages) {
        const res = [];

        for (let i = start; i < start + this.perPage; i++) {
          if (pages > i && i >= 0) {
            res.push(i + 1);
          }
        }

        this.pages = res;
      },
      nextPaginationPage() {
        const newStart =
          Number(this.paginationPages) - this.perPage - Number(this.rangeStart);

        if (newStart > 1) {
          this.rangeStart += this.perPage;
        }
      },
      prevPaginationPage() {
        if (this.rangeStart - this.perPage > 0) {
          this.rangeStart -= this.perPage;
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
    display: flex;
    justify-content: center;
    padding: $break;
    background-color: #fff;

    @include block-border-radius;

    &-wrapper {
      display: grid;
      grid-template-rows: 35px;
      grid-auto-flow: column;
      grid-gap: $break;
      justify-content: center;
      width: 100%;

      &-page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        padding: 10px;
        border: 1px solid $main-color;
        border-radius: 50%;
        color: #fff;
        opacity: 0.4;
        cursor: pointer;

        &:hover {
          opacity: 1;
          transition: 0.3s;
        }

        &-link {
          @include link;

          color: $main-color !important;
          text-decoration: none !important;
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
            opacity: 1;
            cursor: pointer;

            &:hover {
              opacity: 1;
              cursor: pointer;
            }

            &.inactive {
              opacity: 0.3;
            }
          }
        }
      }
    }
  }

  .active {
    border: 2px solid #2a544ccc;
    background-color: #1a484c;
    color: #fff !important;
    font-weight: 600;
    opacity: 1;

    span {
      color: #fff !important;
    }
  }
</style>
