<template>
  <v-row justify="center">
    <v-col
      v-if="!notes.length"
      cols="12"
    >
      <p class="text-center">
        No notes.
      </p>
    </v-col>
    <v-col
      v-for="note in notes"
      :key="note.id"
      sm="6"
    >
      <v-card
        :title="`${note.encrypted ? 'Regular' : 'Encrypted'} Note`"
        @dblclick.prevent="editNote(note)"
      >
        <v-card-text>
          {{ !note.encrypted ? note.content : 'Secret content' }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="note.encrypted"
            prepend-icon="mdi-lock-open"
            @click="decryptNote(note)"
          >
            Decrypt content
          </v-btn>
          <v-btn
            v-else
            prepend-icon="mdi-lock"
            @click="encryptNote(note)"
          >
            Encrypt content
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <EditNote
    :visible="editing"
    v-model:editable="editable"
    @save="onSaveNote"
  />
</template>
<script setup>
import { ref } from 'vue';
import { useNotesStore } from '@/plugins/pinia';
import { useCrypto } from '@/composables/crypto';
import EditNote from '@/components/EditNote.vue';

const { iv, key, notes, updateNote } = useNotesStore();
const { decrypt, encrypt } = useCrypto();

const editable = ref(null);
const editing = ref(false);

async function decryptNote(note) {
  note.content = await decrypt(note.content, key, iv);
  note.encrypted = false;
}

async function encryptNote(note) {
  note.content = await encrypt(note.content, key, iv);
  note.encrypted = true;
}

function editNote({ id, content, encrypted }) {
  if (encrypted) {
    console.log("This note should be decrytped before editing.");
    return;
  }

  console.log('This note will be edited...', content);
  editable.value = { id, content, encrypted };
  editing.value = true;
}

async function onSaveNote(note) {
  await updateNote(note);

  editing.value = false;
  editable.value = null;
}
</script>
