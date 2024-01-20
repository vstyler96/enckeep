<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12">
            <v-btn
              class="mx-auto"
              color="primary"
              @click="modal = true"
            >
              Create a new Note
            </v-btn>
            <Note v-model="modal" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            v-if="!notes.length"
            cols="12"
          >
            No notes created yet.
          </v-col>
          <v-col
            v-for="note in notes"
            :key="note.id"
            sm="6"
          >
            <v-card>
              <v-card-text>
                <template v-if="note.decrypted">
                  {{ note.decrypted }}
                </template>
                <template v-else>
                  {{ !note.hasEncryption ? note.content : 'Secret Content' }}
                </template>
              </v-card-text>
              <v-card-actions v-if="note.hasEncryption">
                <v-btn @click="decryptNote(note)">
                  Decrypt content
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import { ref } from 'vue';
import { useNotesStore } from '@/plugins/pinia';
import { useCrypto } from '@/composables/crypto';

const { notes, key, iv } = useNotesStore();
const { decrypt } = useCrypto();

const modal = ref(false);

async function decryptNote(note) {
  note.decrypted = await decrypt(note.content, key, iv);
}
</script>
