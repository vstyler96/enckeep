import { createPinia, storeToRefs } from 'pinia';
import useNotesStore from './stores/notes';

export {
  storeToRefs,
  useNotesStore,
};

export default createPinia();

