<template>
  <v-btn
    v-show="!visible"
    class="mx-auto"
    prepend-icon="mdi-note-plus"
    color="secondary"
    @click="visible = true"
  >
    Create a new Note
  </v-btn>
  <v-dialog
    v-model="visible"
    scrollable
  >
    <v-card title="Creating note">
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
        <v-btn @click="createNote">
          Save note
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useNotesStore } from '@/plugins/pinia';

const { saveNote } = useNotesStore();

const visible = ref(false);

const note = reactive({
  content: null,
  encrypted: false,
});

async function createNote() {
  await saveNote(note);

  visible.value = false;

  note.content = null;
  note.encrypted = false;
}
</script>
