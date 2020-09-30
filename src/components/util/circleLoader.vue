<template>
  <section>
    <div class="loadingio-spinner-ripple-k1pi1woazd">
      <div class="ldio-ooynjkb0sh">
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@keyframes ldio-ooynjkb0sh {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}

.ldio-ooynjkb0sh div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-ooynjkb0sh 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.ldio-ooynjkb0sh div:nth-child(1) {
  border-color: #93dbe9;
}

.ldio-ooynjkb0sh div:nth-child(2) {
  border-color: #689cc5;
  animation-delay: -0.5s;
}

.loadingio-spinner-ripple-k1pi1woazd {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ldio-ooynjkb0sh {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-ooynjkb0sh div {
  box-sizing: content-box;
}
</style>