import { Maximize } from "@scalable.software/maximize";

await Maximize.Template.load("maximize.template.html");

customElements.define(Maximize.Tag, Maximize);
