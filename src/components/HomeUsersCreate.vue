<template>
  <q-dialog v-model="isVisibleDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Создать пользователя</div>
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll">
        <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
          voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem
          aut, natus minima, porro labore.</p>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="green" @click="$emit('isCreateDialogClose', false)" />
        <q-btn flat label="Создать" color="green" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "HomeUsersCreateComponent",
  props: {
    isCreateDialog: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const isVisibleDialog = ref(props.isCreateDialog)
    return {
      isVisibleDialog
    }
  }
})
</script>

<style lang="scss" scoped></style>
