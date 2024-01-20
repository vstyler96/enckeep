<template>
  <v-dialog
    v-model="visible"
    scrollable
  >
    <v-card
      title="Creating note"
    >
      <v-card-text>
        <v-textarea
          v-model="store.note"
          label="Type your thoughts..."
          placeholder="Note"
          variant="outlined"
          counter
          no-resize
          rows="6"
        />
      </v-card-text>
      <v-card-actions class="mx-4">
        <v-switch
          v-model="store.hasEncryption"
          inset
          label="Encrypt?"
        />
        <v-spacer />
        <v-btn
          @click="saveNote(); visible = false;"
        >
          Save note
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useNotesStore } from '@/plugins/pinia';
// import { useCrypto } from '@/composables/crypto.js';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});
const emit = defineEmits(['update:model-value']);

const store = useNotesStore();
const { saveNote } = store;

const visible = computed({
  get() { return props.modelValue },
  set(value) { emit('update:model-value', value); },
});

// const note = ref();
// const hasEncryption = ref(false);

/*
const enc = new TextEncoder();
const key = enc.encode("abcdefgh12345678");
const iv = new Uint8Array(16);

const { encrypt, decrypt } = useCrypto();
const content = ref();
const encrypted = ref();
const decrypted = ref();

watch(content, async (updated) => {
  try {
    encrypted.value = await encrypt(content.value, key, iv);
    decrypted.value = await decrypt(
      encrypted.value,
      key,
      iv,
    );
  } catch (e) {
    console.log(e);
  }
});
*/
</script>
