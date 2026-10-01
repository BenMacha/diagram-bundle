// <script src="/bundles/diagram/build/diagram.js"></script>
// registers <doctrine-diagram> and exposes window.DoctrineDiagram.{mount, parseJdl, toJdl}.
import { defineElement } from './element';
import { parseJdl, toJdl } from './jdl';
import { mount } from './mount';

defineElement();

export { defineElement, mount, parseJdl, toJdl };
export const version = '2.0.0';
