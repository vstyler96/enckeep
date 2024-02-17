import { useCrypto } from '@/composables/crypto';
import { defineStore } from 'pinia';

export default defineStore('notes', {
  state() {
    return {
      notes: [],
      key: new Uint8Array(16),
      iv: new Uint8Array(16),
    };
  },
  actions: {
    async saveNote({ content, encrypted }) {
      const { encrypt } = useCrypto();

      if (encrypted) {
        content = await encrypt(content, this.key, this.iv);
      }

      this.notes.push({
        id: this.notes.length + 1,
        content,
        encrypted,
      });
    },
    async updateNote({ id, content, encrypted }) {
      const { encrypt } = useCrypto();

      if (encrypted) {
        content = await encrypt(content, this.key, this.iv);
      }

      const index = this.notes.findIndex(n => n.id === id);
      this.notes[index] = { id, content, encrypted };
    },
  },
});
