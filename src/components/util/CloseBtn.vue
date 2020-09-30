<template>
  <div class="close-container">
    <div class="leftright"></div>
    <div class="rightleft"></div>
    <label class="close"><slot></slot></label>
  </div>
</template>
<style lang="scss" scoped>
// COLORS
$softorange: #d3d2ec;
$tomatored: #0a9e6a;

.close-container {
  position: absolute;
  top: 5%;
  right: 2.5%;
  transform: translate(-5%, -2.5%);
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.leftright {
  height: 4px;
  width: 50px;
  position: absolute;
  margin-top: 24px;
  background-color: $softorange;
  border-radius: 2px;
  transform: rotate(45deg);
  transition: all 0.3s ease-in;
}

.rightleft {
  height: 4px;
  width: 50px;
  position: absolute;
  margin-top: 24px;
  background-color: $softorange;
  border-radius: 2px;
  transform: rotate(-45deg);
  transition: all 0.3s ease-in;
}

label {
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease-in;
  opacity: 0;
}
.close {
  position: absolute;
  right: 2.5%;
  bottom: -50%;
}

.close-container:hover .leftright {
  transform: rotate(-45deg);
  background-color: $tomatored;
}
.close-container:hover .rightleft {
  transform: rotate(45deg);
  background-color: $tomatored;
}
.close-container:hover label {
  opacity: 1;
}
</style>