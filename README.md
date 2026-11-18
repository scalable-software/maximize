![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Maximize

A theme-aware web component that lets users ask for a window to be maximized, and can be shown or hidden, while emitting an event for each request.

---

## 1. Introduction

The **Maximize** component is a press button for the corner of a window, panel or dialog. It asks for the window to be maximized and does nothing else: each request is reported through the `onmaximize` event, and the host application decides what to do with it. The component holds no window state.

It is a custom element with a Shadow DOM, built on `@scalable.software/component`. It can be driven through properties and operations, through attributes, or by the end user with a pointer or the keyboard.

### 1.1 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scalable-software/maximize.git
   cd maximize
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests (Optional)**

   ```bash
   npm test
   ```

4. **Start Local Server**

   ```bash
   npm run serve
   ```

   - This builds the component and opens the demo page, which shows a `<maximize-button>` with a control for everything a host application can use.

---

## 2. Quick Start Usage Walkthrough

The demo page shows the component in a band across the top, and three groups below it: **States**, **Operations** and **Events**.

1. **Click** the `<maximize-button>`.
   - While the pointer is held down, the button looks pressed and **States** shows `status` as `pressed`.
   - When the pointer is lifted on the button, **Events** logs `onmaximize`.
   - Press, move the pointer off the button, and let go: the button is released and nothing is logged.

2. **Press** the **maximize** button under **Operations**.
   - `onmaximize` is logged again: the operation makes the same request as a click.

3. **Focus** the `<maximize-button>` with the Tab key and press **Enter** or the **space bar**.
   - While the key is held down, the button looks pressed and **States** shows `status` as `pressed`; holding it logs nothing, and the page does not scroll.
   - When the key is lifted, the button is released and **Events** logs `onmaximize`, once for each press.
   - Press a key, move the focus away with the Tab key, and let go: the button is released and nothing is logged.

4. **Press** **hide** and then **show** under **Operations**, or choose a `visibility` under **States**.
   - The button disappears and comes back, and `onhide` and `onshow` are logged with their `detail`.

5. **Choose** `flat` for `appearance` under **States**.
   - The button loses its border, its shadow and its rounded corners, as it would inside a taskbar.

The same can be done from the console:

```js
const maximize = document.querySelector("maximize-button");

maximize.onmaximize = () => console.log("Maximizing was requested");

maximize.maximize(); // "Maximizing was requested"
maximize.hide();
maximize.visibility; // "hidden"
maximize.show();
maximize.status; // "released"
```

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`maximize.template.html`): a `.icon` container, focusable and announced as the button "Maximize", holding the SVG icon of a single square. Its one style rule, `:host { display: none; }`, keeps the maximize hidden until its stylesheet applies, so the maximize is never seen unstyled.
- **Style** (`maximize.style.css`): the look of the button, its pressed, hover and flat variants, and the light and dark themes. Its rule `:host(:defined) { display: inline-block; }` reveals the maximize; a stylesheet that replaces this one must carry that rule, or the maximize stays hidden.
- **Class** (`maximize.ts`): extends the base component; holds the states, the operations, the event subscriptions and the gesture handlers.
- **Metadata** (`maximize.meta.ts`): the names and the values of everything the component has.
- **Validation** (`maximize.validation.ts`): the checks on values that come from outside.

### 3.2 Class Lifecycle

Lifecycle methods are implemented in the base class and extended by the **Maximize** component:

- **`connectedCallback()`**
  1. Creates a Shadow DOM.
  2. Clones the HTML template into the Shadow Root.
  3. Inserts a `<link>` for scoped CSS.
  4. Puts the `status` attribute in place.
  5. Sets up the listeners on the icon: `pointerdown`, `pointerup`, `pointerleave`, `click`, `keydown`, `keyup` and `blur`.

- **`disconnectedCallback()`**
  - Removes the listeners.

---

## 4. Core Concepts: State, Operations, Events and Gestures

### 4.1 State

- **`visibility`** (`visible` | `hidden`)
  - Whether the button is displayed.
  - **Optional attribute**: absent when `visible` (the default); present as `[visibility="hidden"]` when hidden.

- **`status`** (`released` | `pressed`), **readonly**
  - Whether the button is being pressed. It is `pressed` from the moment the pointer goes down on the icon until it is lifted or leaves the icon, and from the moment Enter or Space goes down on the focused icon until the key is lifted or the icon loses focus. It is `released` at all other times.
  - **Compulsory attribute**: always present, so that the stylesheet can show the pressed look through `:host([status="pressed"])`.
  - Only the component changes it. It has no public setter, and an attribute that is changed or removed from outside is put back.

- **`appearance`** (`floating` | `flat`)
  - Whether the button stands alone, with its own border, shadow and rounded corners, or lies flat inside another surface such as a taskbar.
  - **Optional attribute**: absent when `floating` (the default); present as `[appearance="flat"]` when flat.
  - It changes how the button looks, not what it does: it has no operation and sends no event.

A writable state can be set through its property or its attribute; both go through the same setter:

```js
maximize.visibility = "hidden";
maximize.setAttribute("appearance", "flat");
```

- An invalid value assigned to a property throws, for example `Invalid visibility value: invalid`.
- An invalid value written to an attribute is reported by the browser, and the attribute is put back to show the state.
- `null`, or a removed attribute, means the default.

### 4.2 Operations

1. `hide()` → sets `visibility` to `hidden`
2. `show()` → sets `visibility` to `visible`
3. `maximize()` → requests maximizing. It changes no state: every call dispatches `onmaximize`.

### 4.3 Events

- **`onhide`**: dispatched when `visibility` changes from `visible` to `hidden`, with `detail: { visibility: "hidden" }`.
- **`onshow`**: dispatched when `visibility` changes from `hidden` to `visible`, with `detail: { visibility: "visible" }`.
- **`onmaximize`**: dispatched each time maximizing is requested, by a gesture or by the `maximize` operation. It has no `detail`.

Assign a handler to the property, or listen on the element:

```js
maximize.onmaximize = () => host.maximize();

maximize.addEventListener("onmaximize", () => {
  // ...
});
```

- Assigning a new handler replaces the previous one; `null` removes it.
- A value that is not a function throws, for example `Invalid onmaximize value: invalid`.
- The events do not bubble: subscribe on the element itself.
- `onevent`, from the base component, receives every event the component sends.

### 4.4 Gestures

| Gesture | On | Does |
|---|---|---|
| `pointerdown` | the icon | the button becomes `pressed` |
| `pointerup` | the icon | the button becomes `released` |
| `pointerleave` | the icon | the button becomes `released`, and no request is made |
| `click` | the icon | calls `maximize()` |
| `keydown` | the icon | the button becomes `pressed` when the key is Enter or Space, and the page does not scroll |
| `keyup` | the icon | when the key is Enter or Space: calls `maximize()` if the button is `pressed`, then the button becomes `released` |
| `blur` | the icon | the button becomes `released`, and no request is made |
| hover | the icon | changes the background, the border, the shadow and the colour of the icon |

The button behaves like the matching control in the corner of a desktop window: it looks pressed while it is held, the request is made when the pointer is let go on it, and moving away before letting go makes no request. It acts the same under the keyboard: the request is made when Enter or Space is lifted, once for each press, and moving the focus away before lifting the key makes no request. Assistive technology announces it by its name, "Maximize", through the `aria-label` of the icon.

---

## 5. Development Workflow

### 5.1 Testing

Unit tests run with Karma and Jasmine in headless Chrome. The run first checks the specification against the schema of each policy, and then compiles.

```bash
npm test
```

A test report and a coverage report are written to `report` and `coverage`.

### 5.2 Documentation (Typedoc)

```bash
npm run document
```

Generates the API docs in `docs` from the TypeScript annotations.

### 5.3 Build

```bash
npm run build
```

Compiles to `dist/`, the only folder that is published.

### 5.4 Import Maps

The component is an ES module, imported by its package name. An import map tells the browser where that name, and the base component it depends on, are found:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/maximize": "/node_modules/@scalable.software/maximize/dist/index.js",
      "@scalable.software/component": "/node_modules/@scalable.software/component/dist/index.js"
    }
  }
</script>
<script type="module">
  import { Maximize } from "@scalable.software/maximize";

  await Maximize.Template.load("maximize.template.html");

  customElements.define(Maximize.Tag, Maximize);
</script>

<maximize-button></maximize-button>
```

---

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
