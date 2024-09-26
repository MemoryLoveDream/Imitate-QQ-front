<script setup>
import WindowButtons from '../../components/base/WindowButtons.vue'
import PersonalInformation from '../../components/information/PersonalInformation.vue'
import GroupInformation from '../../components/information/GroupInformation.vue'
import { useRelationshipStore } from '../../store/relationship'

const relationship = useRelationshipStore()
</script>

<template>
  <div class="information-block">
    <PersonalInformation v-show="relationship.type === 'single'" class="card" />
    <GroupInformation v-show="relationship.type === 'group'" class="card" />
    <WindowButtons />
  </div>
</template>

<style scoped lang="less">
.information-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
