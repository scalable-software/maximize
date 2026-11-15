/**
 * @module Maximize
 */

// Base Component
import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";

// Maximize Metadata
import {
  Tag,
  CSS,
  Attributes,
  Visibility,
  Status,
  Appearance,
  Event,
  Gesture
} from "./maximize.meta.js";

import { type Meta } from "./maximize.meta.js";

// Validation
import { Validate } from "./maximize.validation.js";

/**
 * Optional Configuration: required for maximize buttons with custom layout and style
 * @category Configuration
 */
export const configuration: Configuration = {
  url: import.meta.url,
  template: {
    id: Tag
  },
  css: {
    name: CSS
  }
} as const;

/**
 * @category Maximize
 */
export class Maximize extends Component implements Meta {
  /**
   * The tag name of the maximize button
   * @category Configuration
   */
  public static get Tag() {
    return Tag;
  }

  /**
   * Only attributes defined the Attributes object will be observed in DOM
   * @category State
   */
  public static get Attributes(): Attributes {
    return Attributes;
  }

  /**
   * Helper function to load the maximize template into DOM
   * @category Utility
   */
  public static Template = new Template(import.meta.url);

  /**
   * Internal Visibility state of the component
   * @category State
   * @default Visibility.VISIBLE
   * @hidden
   */
  private _visibility: Visibility = Visibility.VISIBLE;

  /**
   * Internal Status state of the component
   * @category State
   * @default Status.RELEASED
   * @hidden
   */
  private _status: Status = Status.RELEASED;

  /**
   * Internal Appearance state of the component
   * @category State
   * @default Appearance.FLOATING
   * @hidden
   */
  private _appearance: Appearance = Appearance.FLOATING;

  /**
   * onhide triggered when maximize visibility changes to hidden
   * @category Events
   * @hidden
   */
  private _onhide: EventListener | null = null;

  /**
   * onshow triggered when maximize visibility changes to visible
   * @category Events
   * @hidden
   */
  private _onshow: EventListener | null = null;

  /**
   * onmaximize triggered each time maximizing is requested
   * @category Events
   * @hidden
   */
  private _onmaximize: EventListener | null = null;

  /**
   * Cache element references to improve performance
   * @category State
   * @hidden
   */
  protected elements: { icon: HTMLDivElement | null } = { icon: null };

  /**
   * @hidden
   */
  constructor() {
    super(configuration);
  }

  /**
   * Get and set the visibility of the maximize button
   * @category State
   */
  public get visibility(): Visibility {
    return this._visibility;
  }
  public set visibility(visibility: Visibility | null) {
    try {
      // Normalize
      visibility = visibility ?? Visibility.VISIBLE;

      // Validate
      visibility = Validate.visibility(visibility);

      // Guard
      if (this._visibility === visibility) return;

      // Mutate
      this._visibility = visibility;
    } finally {
      // Reflect
      this._reflect(
        Attributes.VISIBILITY,
        this._visibility,
        Visibility.VISIBLE
      );
    }

    // Dispatch
    const detail = { visibility };
    visibility === Visibility.HIDDEN && this._dispatch(Event.ON_HIDE, detail);
    visibility === Visibility.VISIBLE && this._dispatch(Event.ON_SHOW, detail);
  }

  /**
   * Get the status of the maximize button: pressed while it is held, released otherwise
   * @category State
   */
  public get status(): Status {
    return this._status;
  }
  private set status(status: Status) {
    try {
      // Guard
      if (this._status === status) return;

      // Mutate
      this._status = status;
    } finally {
      // Reflect
      this._reflect(Attributes.STATUS, this._status);
    }
  }

  /**
   * Get and set the appearance of the maximize button
   * @category State
   */
  public get appearance(): Appearance {
    return this._appearance;
  }
  public set appearance(appearance: Appearance | null) {
    try {
      // Normalize
      appearance = appearance ?? Appearance.FLOATING;

      // Validate
      appearance = Validate.appearance(appearance);

      // Mutate
      this._appearance = appearance;
    } finally {
      // Reflect
      this._reflect(
        Attributes.APPEARANCE,
        this._appearance,
        Appearance.FLOATING
      );
    }
  }

  /**
   * Triggered via `.hide()`
   * @event
   * @category Events
   */
  public set onhide(handler: EventListener | null) {
    this._onhide = this._subscribe(Event.ON_HIDE, this._onhide, handler);
  }

  /**
   * Triggered via `.show()`
   * @event
   * @category Events
   */
  public set onshow(handler: EventListener | null) {
    this._onshow = this._subscribe(Event.ON_SHOW, this._onshow, handler);
  }

  /**
   * Triggered via `.maximize()`, a click on the icon, or the Enter key or the space bar
   * @event
   * @category Events
   */
  public set onmaximize(handler: EventListener | null) {
    this._onmaximize = this._subscribe(
      Event.ON_MAXIMIZE,
      this._onmaximize,
      handler
    );
  }

  /**
   * Hide the maximize button when it is visible
   * @category Operations
   */
  public hide = () => {
    this.visibility = Visibility.HIDDEN;
  };

  /**
   * Show the maximize button when it is hidden
   * @category Operations
   */
  public show = () => {
    this.visibility = Visibility.VISIBLE;
  };

  /**
   * Request maximizing: changes no state, every call dispatches `onmaximize`
   * @category Operations
   */
  public maximize = () => {
    this._dispatch(Event.ON_MAXIMIZE);
  };

  /**
   * Press the maximize button: called when the pointer goes down on the icon
   * @category Operations
   * @hidden
   */
  private _press = () => {
    this.status = Status.PRESSED;
  };

  /**
   * Release the maximize button: called when the pointer is lifted from the icon or leaves it
   * @category Operations
   * @hidden
   */
  private _release = () => {
    this.status = Status.RELEASED;
  };

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.VISIBILITY]: (value: Visibility | null) =>
      (this.visibility = value),
    [Attributes.STATUS]: () => this._reflect(Attributes.STATUS, this._status),
    [Attributes.APPEARANCE]: (value: Appearance | null) =>
      (this.appearance = value)
  };

  /**
   * Cache element references to improve performance
   * @category Configuration
   * @hidden
   */
  protected _cache = () => {
    this.elements.icon = this.root.querySelector(".icon");
  };

  /**
   * Initialize maximize attributes with default values
   * @category Configuration
   * @hidden
   */
  protected _initialize = () => {
    this._reflect(Attributes.STATUS, this._status);
  };

  /**
   * Called by the connectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _addEventListeners = () => {
    this.elements.icon?.addEventListener(
      Gesture.POINTERDOWN,
      this._handleIconPointerdown
    );
    this.elements.icon?.addEventListener(
      Gesture.POINTERUP,
      this._handleIconPointerup
    );
    this.elements.icon?.addEventListener(
      Gesture.POINTERLEAVE,
      this._handleIconPointerleave
    );
    this.elements.icon?.addEventListener(
      Gesture.CLICK,
      this._handleIconClick
    );
  };

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {
    this.elements.icon?.removeEventListener(
      Gesture.POINTERDOWN,
      this._handleIconPointerdown
    );
    this.elements.icon?.removeEventListener(
      Gesture.POINTERUP,
      this._handleIconPointerup
    );
    this.elements.icon?.removeEventListener(
      Gesture.POINTERLEAVE,
      this._handleIconPointerleave
    );
    this.elements.icon?.removeEventListener(
      Gesture.CLICK,
      this._handleIconClick
    );
  };

  /**
   * Handles the pointer going down on the icon: presses the maximize button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerdown = () => this._press();

  /**
   * Handles the pointer being lifted from the icon: releases the maximize button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerup = () => this._release();

  /**
   * Handles the pointer leaving the icon: releases the maximize button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerleave = () => this._release();

  /**
   * Handles a click on the icon: requests maximizing
   * @category Gesture
   * @hidden
   */
  private _handleIconClick = () => this.maximize();
}
