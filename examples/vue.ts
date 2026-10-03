import { createApp, h, ref } from 'vue';
import { DoctrineDiagram } from '@benmacha/doctrine-diagram/vue';

const selected = ref('');

createApp({
  render: () => [
    h('p', `Selected: ${selected.value}`),
    h(DoctrineDiagram, { apiUrl: '/diagram', height: '85vh', onEntitySelect: (e: { name: string } | null) => (selected.value = e ? e.name : '') }),
  ],
}).mount('#app');
