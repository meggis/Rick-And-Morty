<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col-4">
        <img src="@/assets/images/logo.png" alt="Rick and Morty logo" />
      </div>
      <div class="col-5 align-self-center">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text search-label-padding">Search by</label>
          </div>
          <select class="custom-select search-label-padding">
            <option selected>Name</option>
            <option value="1">Name</option>
            <option value="2">Identifier</option>
            <option value="3">Episode</option>
          </select>
          <input
            type="text"
            class="form-control my-icon"
            aria-label="Text input with dropdown button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.my-icon {
  background-image: url('@/assets/images/search-icon.png');
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.search-label-padding {
  padding-left: 20px !important;
  padding-right: 20px !important;
}
.container {
  margin: 3vh auto;
}
.input-group-text {
  background-color: white !important;
  color: #a9b1bd !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
select {
  color: #a9b1bd !important;
  border-color: #a9b1bd !important;
}
</style>
