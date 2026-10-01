import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { mount } from './mount';
import type { DiagramInstance } from './mount';
import type { DiagramOptions, Entity, HeadersInit, Locale, Schema, Theme } from './types';

/**
 * Vue 3 wrapper (React is bundled, nothing else to install):
 *
 *   <DoctrineDiagram api-url="/diagram" theme="auto" @entity-select="onSelect" />
 */
export const DoctrineDiagram = defineComponent({
  name: 'DoctrineDiagram',
  props: {
    apiUrl: { type: String, default: undefined },
    manager: { type: String, default: undefined },
    schema: { type: Object as PropType<Schema>, default: undefined },
    headers: { type: [Object, Function] as PropType<DiagramOptions['headers']>, default: undefined },
    credentials: { type: String as PropType<RequestCredentials>, default: undefined },
    fetch: { type: Function as PropType<typeof fetch>, default: undefined },
    theme: { type: String as PropType<Theme>, default: undefined },
    locale: { type: String as PropType<Locale>, default: undefined },
    title: { type: String, default: undefined },
    height: { type: [String, Number], default: '100%' },
    storageKey: { type: [String, Boolean] as PropType<string | false>, default: undefined },
    injectStyles: { type: Boolean, default: true },
  },
  emits: ['entity-select', 'manager-change'],
  setup(props, { emit }) {
    const el = ref<HTMLElement | null>(null);
    let instance: DiagramInstance | null = null;

    const options = (): DiagramOptions => ({
      apiUrl: props.apiUrl,
      manager: props.manager,
      schema: props.schema,
      headers: props.headers as HeadersInit | (() => HeadersInit | Promise<HeadersInit>) | undefined,
      credentials: props.credentials,
      fetch: props.fetch,
      theme: props.theme,
      locale: props.locale,
      title: props.title,
      height: '100%',
      storageKey: props.storageKey,
      injectStyles: props.injectStyles,
      onEntitySelect: (entity: Entity | null) => emit('entity-select', entity),
      onManagerChange: (name: string) => emit('manager-change', name),
    });

    onMounted(() => {
      if (el.value) instance = mount(el.value, options());
    });
    watch(
      () => ({ ...props }),
      () => instance && instance.update(options()),
    );
    onBeforeUnmount(() => {
      if (instance) instance.unmount();
      instance = null;
    });

    return () =>
      h('div', {
        ref: el,
        style: { height: typeof props.height === 'number' ? `${props.height}px` : props.height },
      });
  },
});

export default DoctrineDiagram;
export { mount };
export type { DiagramOptions, Entity, Schema };
