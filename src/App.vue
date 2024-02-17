<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="justify-center py-4">
            <Note />
        </v-row>

        <NotesPreview />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import Note from '@/components/Note.vue';
import NotesPreview from '@/components/NotesPreview.vue';
</script>
