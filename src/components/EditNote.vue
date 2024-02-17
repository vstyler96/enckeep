<template>
  <v-dialog
    :model-value="visible"
    scrollable
  >
    <v-card
      v-if="note?.id > 0"
      title="Editing note"
    >
      <v-card-text>
        <v-textarea
          v-model="note.content"
          label="Note"
          placeholder="Type your thoughts..."
          variant="outlined"
          counter
          no-resize
          rows="6"
        />
      </v-card-text>
      <v-card-actions class="mx-4">
        <v-switch
          v-model="note.encrypted"
          inset
          label="Encrypt?"
        />
        <v-spacer />
        <v-btn
          color="error"
          @click="visible = false"
        >
          Cancel
        </v-btn>
        <v-btn @click="emit('save', note)">
          Save note
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:editable', 'save']);

const props = defineProps({
  visible: { type: Boolean, default: false },
  editable: { type: Object, default: null },
});

const note = computed({
  get() { return props.editable; },
  set(value) { emit('update:editable'); },
});
</script>
