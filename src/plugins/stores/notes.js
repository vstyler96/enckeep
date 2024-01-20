import { useCrypto } from '@/composables/crypto';
import { defineStore } from 'pinia';

export default defineStore('notes', {
  state() {
    return {
      note: '',
      hasEncryption: false,
      notes: [],
      key: new Uint8Array(16),
      iv: new Uint8Array(16),
    };
  },
  actions: {
    async saveNote() {
      const { encrypt } = useCrypto();
      const { hasEncryption, note } = this;
      let content = note;
      if (hasEncryption) {
        content = await encrypt(note, this.key, this.iv);
      }

      this.notes.push({
        id: this.notes.length + 2,
        content,
        hasEncryption,
      });

      this.note = '';
      this.hasEncryption = false;
    },
  },
});
