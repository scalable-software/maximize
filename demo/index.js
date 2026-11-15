import {
  Maximize,
  State,
  Visibility,
  Appearance,
  Operation
} from "@scalable.software/maximize";

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

/* States: a choice for each writable state, text for each readonly state */
const states = document.querySelector("#states .states");

const choices = {
  [State.VISIBILITY]: Visibility,
  [State.APPEARANCE]: Appearance
};

const followers = Object.values(State).map((name) => {
  const row = document.createElement("fieldset");
  const legend = document.createElement("legend");
  row.append(legend);
  states.append(row);

  // A readonly state is shown as text, with no control
  if (!(name in choices)) {
    legend.textContent = `${name} (readonly)`;
    const value = document.createElement("output");
    row.append(value);
    return () => (value.textContent = maximize[name]);
  }

  // A writable state has one choice for each of its values: choosing sets the property
  legend.textContent = name;
  const inputs = Object.values(choices[name]).map((value) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = value;
    input.addEventListener("change", () => (maximize[name] = value));
    label.append(input, value);
    row.append(label);
    return input;
  });
  return () =>
    inputs.forEach((input) => (input.checked = input.value === maximize[name]));
});

// States are attributes: the page follows the component by watching them
const follow = () => followers.forEach((update) => update());

new MutationObserver(follow).observe(maximize, { attributes: true });

follow();
