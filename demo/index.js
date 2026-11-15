import { Maximize, Operation } from "@scalable.software/maximize";

await Maximize.Template.load("maximize.template.html");

customElements.define(Maximize.Tag, Maximize);

const maximize = document.querySelector(Maximize.Tag);

/* Operations: one button for each operation */
const operations = document.querySelector("#operations .buttons");

Object.values(Operation).forEach((name) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = name;
  button.addEventListener("click", () => maximize[name]());
  operations.append(button);
});
