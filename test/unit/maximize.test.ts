import { Template } from "@scalable.software/component";

import {
  Maximize,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Status,
  Appearance,
  Operation,
  Event,
  Gesture,
  Key
} from "@scalable.software/maximize";

// Configuration
configuration(Configuration.TAG, () => {
  and("Maximize imported", () => {
    then("Maximize is defined", () => {
      expect(Maximize).toBeDefined();
    });

    and("Maximize is defined", () => {
      then("Maximize.Tag static getter is defined", () => {
        expect(Maximize.Tag).toBeDefined();
      });

      and("Maximize.Tag static getter is defined", () => {
        then("Maximize.Tag is Tag", () => {
          expect(Maximize.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Maximize imported", () => {
    then("Maximize is defined", () => {
      expect(Maximize).toBeDefined();
    });

    and("Maximize is defined", () => {
      then("Maximize.Attributes static getter is defined", () => {
        expect(Maximize.Attributes).toBeDefined();
      });

      and("Maximize.Attributes static getter is defined", () => {
        then("Maximize.Attributes is Attributes", () => {
          expect(Maximize.Attributes).toBe(Attributes);
        });
      });
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Maximize.Template static property is defined", () => {
    expect(Maximize.Template).toBeDefined();
  });

  and("Maximize.Template static property is defined", () => {
    then("Maximize.Template is a Template", () => {
      expect(Maximize.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Maximize.Template.load(
          "maximize.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("maximize.root contents contains template contents", () => {
          expect(maximize.root.innerHTML).toContain(template.innerHTML);
        });

        and("`maximize.root` contents contains template contents", () => {
          then("`maximize.root` contains `div.icon`", () => {
            const div = maximize.root.querySelector("div.icon");
            expect(div).not.toBeNull();
          });

          when("`maximize.root` contains `div.icon`", () => {
            let div: HTMLDivElement;
            beforeEach(() => {
              div = maximize.root.querySelector("div.icon") as HTMLDivElement;
            });

            then("`div.icon` contains `svg.maximize`", () => {
              const svg = div.querySelector("svg.maximize");
              expect(svg).not.toBeNull();
            });

            then("`div.icon` has `tabindex` `0`", () => {
              expect(div.getAttribute("tabindex")).toBe("0");
            });

            then("`div.icon` has `role` `button`", () => {
              expect(div.getAttribute("role")).toBe("button");
            });

            then("`div.icon` has `aria-label` `Maximize`", () => {
              expect(div.getAttribute("aria-label")).toBe("Maximize");
            });
          });
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("maximize.root contents contains a link to stylesheet", () => {
          expect(maximize.root.innerHTML).toContain("stylesheet");
        });

        and("maximize.root contents contains a link to stylesheet", () => {
          then("the stylesheet file's name is correct", () => {
            expect(maximize.root.innerHTML).toContain(CSS);
          });
        });
      });
    });
  });
});

composition(Composition.ELEMENT, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.elements.icon` is defined", () => {
          expect(maximize["elements"].icon).toBeDefined();
        });

        when("`maximize.elements.icon` is defined", () => {
          then(
            "`maximize.elements.icon` is a cached reference to the `div` with class `icon`",
            () => {
              const icon = maximize.root.querySelector(".icon") as HTMLDivElement;
              expect(maximize["elements"].icon).toBe(icon);
            }
          );
        });
      });
    });
  });
});

// State
state(State.VISIBILITY, () => {
  given("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("a HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.visibility` getter exists", () => {
          expect(maximize.visibility).toBeDefined();
        });

        when("`maximize.visibility` getter exists", () => {
          then("`maximize.visibility` is `Visibility.VISIBLE`", () => {
            expect(maximize.visibility).toBe(Visibility.VISIBLE);
          });
        });

        then("`visibility` attribute does not exist", () => {
          expect(maximize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
        });

        then("`maximize.visibility` setter exists", () => {
          expect(hasSetter(maximize, "visibility")).toBeTrue();
        });

        and("`maximize.visibility` setter exists", () => {
          when("`maximize.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              maximize.visibility = Visibility.HIDDEN;
            });

            then("`maximize.visibility` is `Visibility.HIDDEN`", () => {
              expect(maximize.visibility).toBe(Visibility.HIDDEN);
            });

            then("maximize `visibility` attribute is `Visibility.HIDDEN`", () => {
              const value = maximize.getAttribute(Attributes.VISIBILITY);
              expect(value).toBe(Visibility.HIDDEN);
            });

            when("`maximize.visibility` is set to `Visibility.VISIBLE`", () => {
              beforeEach(() => {
                maximize.visibility = Visibility.VISIBLE;
              });

              then("`visibility` attribute does not exist", () => {
                expect(maximize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
              });
            });

            when("`visibility` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  maximize.setAttribute(Attributes.VISIBILITY, "invalid");
                });
              });

              then("`visibility` attribute is `Visibility.HIDDEN`", () => {
                const value = maximize.getAttribute(Attributes.VISIBILITY);
                expect(value).toBe(Visibility.HIDDEN);
              });
            });
          });

          when("`maximize.visibility` is set to `null`", () => {
            beforeEach(() => {
              maximize.visibility = null;
            });

            then("`maximize.visibility` is `Visibility.VISIBLE`", () => {
              expect(maximize.visibility).toBe(Visibility.VISIBLE);
            });
          });

          when("`visibility` attribute is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              maximize.setAttribute(Attributes.VISIBILITY, Visibility.HIDDEN);
            });

            then("`maximize.visibility` is `Visibility.HIDDEN`", () => {
              expect(maximize.visibility).toBe(Visibility.HIDDEN);
            });
          });

          when("`visibility` attribute is set to `Visibility.VISIBLE`", () => {
            beforeEach(() => {
              maximize.setAttribute(Attributes.VISIBILITY, Visibility.VISIBLE);
            });

            then("`visibility` attribute does not exist", () => {
              expect(maximize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });
          });

          when("`visibility` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                maximize.setAttribute(Attributes.VISIBILITY, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`visibility` attribute does not exist", () => {
              expect(maximize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });

            then("`maximize.visibility` is `Visibility.VISIBLE`", () => {
              expect(maximize.visibility).toBe(Visibility.VISIBLE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });

          when("`maximize.visibility` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                maximize.visibility = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

state(State.STATUS, () => {
  given("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("a HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.status` getter exists", () => {
          expect(maximize.status).toBeDefined();
        });

        when("`maximize.status` getter exists", () => {
          then("`maximize.status` is `Status.RELEASED`", () => {
            expect(maximize.status).toBe(Status.RELEASED);
          });
        });

        then("`status` attribute exists", () => {
          const value = maximize.getAttribute(Attributes.STATUS);
          expect(value).not.toBeNull();
        });

        and("`status` attribute exists", () => {
          then("`status` attribute is `Status.RELEASED`", () => {
            const value = maximize.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });

          when("`status` attribute is removed", () => {
            let reported: jasmine.Spy;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (spy) => {
                maximize.removeAttribute(Attributes.STATUS);
                reported = spy;
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = maximize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(reported).not.toHaveBeenCalled();
            });
          });

          when("`status` attribute is set to `Status.PRESSED`", () => {
            let reported: jasmine.Spy;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (spy) => {
                maximize.setAttribute(Attributes.STATUS, Status.PRESSED);
                reported = spy;
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = maximize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(reported).not.toHaveBeenCalled();
            });
          });

          when("`status` attribute is set to `invalid`", () => {
            let reported: jasmine.Spy;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (spy) => {
                maximize.setAttribute(Attributes.STATUS, "invalid");
                reported = spy;
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = maximize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(reported).not.toHaveBeenCalled();
            });
          });
        });

        then("assigning `maximize.status` outside the maximize does not compile", () => {
          const assign = () => {
            // @ts-expect-error: the setter of `status` is private
            maximize.status = Status.PRESSED;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });

        when("invoking `maximize._release`", () => {
          beforeEach(() => {
            maximize["_release"]();
          });

          then("`maximize.status` is `Status.RELEASED`", () => {
            expect(maximize.status).toBe(Status.RELEASED);
          });
        });

        when("invoking `maximize._press`", () => {
          beforeEach(() => {
            maximize["_press"]();
          });

          then("`maximize.status` is `Status.PRESSED`", () => {
            expect(maximize.status).toBe(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = maximize.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          when("invoking `maximize._release`", () => {
            beforeEach(() => {
              maximize["_release"]();
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toBe(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = maximize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });
          });
        });
      });

      and(
        "a new maximize with `status` attribute `Status.PRESSED` is added to DOM",
        () => {
          let maximize: Maximize;
          beforeEach(() => {
            maximize = add<Maximize>(Maximize.Tag, {
              [Attributes.STATUS]: Status.PRESSED
            });
          });
          afterEach(() => {
            maximize.remove();
          });

          then("`maximize.status` is `Status.RELEASED`", () => {
            expect(maximize.status).toBe(Status.RELEASED);
          });

          then("`status` attribute is `Status.RELEASED`", () => {
            const value = maximize.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });
        }
      );
    });
  });
});

state(State.APPEARANCE, () => {
  given("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("a HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.appearance` getter exists", () => {
          expect(maximize.appearance).toBeDefined();
        });

        when("`maximize.appearance` getter exists", () => {
          then("`maximize.appearance` is `Appearance.FLOATING`", () => {
            expect(maximize.appearance).toBe(Appearance.FLOATING);
          });
        });

        then("`appearance` attribute does not exist", () => {
          expect(maximize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
        });

        then("`maximize.appearance` setter exists", () => {
          expect(hasSetter(maximize, "appearance")).toBeTrue();
        });

        and("`maximize.appearance` setter exists", () => {
          when("`maximize.appearance` is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              maximize.appearance = Appearance.FLAT;
            });

            then("`maximize.appearance` is `Appearance.FLAT`", () => {
              expect(maximize.appearance).toBe(Appearance.FLAT);
            });

            then("maximize `appearance` attribute is `Appearance.FLAT`", () => {
              const value = maximize.getAttribute(Attributes.APPEARANCE);
              expect(value).toBe(Appearance.FLAT);
            });

            when("`maximize.appearance` is set to `Appearance.FLOATING`", () => {
              beforeEach(() => {
                maximize.appearance = Appearance.FLOATING;
              });

              then("`appearance` attribute does not exist", () => {
                expect(maximize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
              });
            });

            when("`appearance` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  maximize.setAttribute(Attributes.APPEARANCE, "invalid");
                });
              });

              then("`appearance` attribute is `Appearance.FLAT`", () => {
                const value = maximize.getAttribute(Attributes.APPEARANCE);
                expect(value).toBe(Appearance.FLAT);
              });
            });
          });

          when("`maximize.appearance` is set to `null`", () => {
            beforeEach(() => {
              maximize.appearance = null;
            });

            then("`maximize.appearance` is `Appearance.FLOATING`", () => {
              expect(maximize.appearance).toBe(Appearance.FLOATING);
            });
          });

          when("`appearance` attribute is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              maximize.setAttribute(Attributes.APPEARANCE, Appearance.FLAT);
            });

            then("`maximize.appearance` is `Appearance.FLAT`", () => {
              expect(maximize.appearance).toBe(Appearance.FLAT);
            });
          });

          when("`appearance` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                maximize.setAttribute(Attributes.APPEARANCE, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`appearance` attribute does not exist", () => {
              expect(maximize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });

            then("`maximize.appearance` is `Appearance.FLOATING`", () => {
              expect(maximize.appearance).toBe(Appearance.FLOATING);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });

          when("`maximize.appearance` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                maximize.appearance = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

// Operation
operation(Operation.HIDE, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.hide` method exists", () => {
          expect(maximize.hide).toBeDefined();
        });

        and("`maximize.hide` method exists", () => {
          when("invoking `maximize.hide`", () => {
            let result: unknown;
            beforeEach(() => {
              result = maximize.hide();
            });

            then("`maximize.visibility` is `Visibility.HIDDEN`", () => {
              expect(maximize.visibility).toBe(Visibility.HIDDEN);
            });

            then("`maximize.hide` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

operation(Operation.SHOW, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.show` method exists", () => {
          expect(maximize.show).toBeDefined();
        });

        and("`maximize.show` method exists", () => {
          and("`maximize.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              maximize.visibility = Visibility.HIDDEN;
            });

            when("invoking `maximize.show`", () => {
              let result: unknown;
              beforeEach(() => {
                result = maximize.show();
              });

              then("`maximize.visibility` is `Visibility.VISIBLE`", () => {
                expect(maximize.visibility).toBe(Visibility.VISIBLE);
              });

              then("`maximize.show` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.MAXIMIZE, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.maximize` method exists", () => {
          expect(maximize.maximize).toBeDefined();
        });

        and("`maximize.maximize` method exists", () => {
          and("`maximize.onmaximize` is set to a listener", () => {
            let onmaximize: jasmine.Spy;
            beforeEach(() => {
              onmaximize = jasmine.createSpy("onmaximize");
              maximize.onmaximize = onmaximize;
            });

            when("invoking `maximize.maximize`", () => {
              let result: unknown;
              beforeEach(() => {
                result = maximize.maximize();
              });

              then("`maximize.onmaximize` is called", () => {
                expect(onmaximize).toHaveBeenCalled();
              });

              then("`maximize.maximize` returns nothing", () => {
                expect(result).toBeUndefined();
              });

              then("`maximize.visibility` is `Visibility.VISIBLE`", () => {
                expect(maximize.visibility).toBe(Visibility.VISIBLE);
              });

              then("`maximize.status` is `Status.RELEASED`", () => {
                expect(maximize.status).toBe(Status.RELEASED);
              });

              then("`maximize.appearance` is `Appearance.FLOATING`", () => {
                expect(maximize.appearance).toBe(Appearance.FLOATING);
              });
            });

            when("invoking `maximize.maximize` twice", () => {
              beforeEach(() => {
                maximize.maximize();
                maximize.maximize();
              });

              then("`maximize.onmaximize` is called twice", () => {
                expect(onmaximize).toHaveBeenCalledTimes(2);
              });
            });
          });
        });
      });
    });
  });
});

// Event
events(Event.ON_HIDE, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.onhide` setter exists", () => {
          expect(hasSetter(maximize, Event.ON_HIDE)).toBeTrue();
        });

        and("`maximize.onhide` setter exists", () => {
          and("`maximize.onhide` is set to a listener", () => {
            let onhide: jasmine.Spy;
            beforeEach(() => {
              onhide = jasmine.createSpy("onhide");
              maximize.onhide = onhide;
            });

            when("`maximize.onhide` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  maximize.onhide = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then("error message contains 'Invalid onhide value: invalid'", () => {
                expect(error.message).toBe("Invalid onhide value: invalid");
              });

              when("`maximize.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  maximize.visibility = Visibility.HIDDEN;
                });

                then("`maximize.onhide` is still called", () => {
                  expect(onhide).toHaveBeenCalled();
                });
              });
            });

            and("`maximize.onhide` is set to a new listener", () => {
              let onhide2: jasmine.Spy;
              beforeEach(() => {
                onhide2 = jasmine.createSpy("onhide2");
                maximize.onhide = onhide2;
              });

              when("`maximize.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  maximize.visibility = Visibility.HIDDEN;
                });

                then("old `maximize.onhide` is not called", () => {
                  expect(onhide).not.toHaveBeenCalled();
                });

                then("new `maximize.onhide` is called", () => {
                  expect(onhide2).toHaveBeenCalled();
                });
              });
            });

            when("`maximize.visibility` is set to `Visibility.HIDDEN` twice", () => {
              beforeEach(() => {
                maximize.visibility = Visibility.HIDDEN;
                maximize.visibility = Visibility.HIDDEN;
              });

              then("`maximize.onhide` is called once", () => {
                expect(onhide).toHaveBeenCalledTimes(1);
              });
            });

            when("`maximize.visibility` is set to `Visibility.HIDDEN`", () => {
              beforeEach(() => {
                maximize.visibility = Visibility.HIDDEN;
              });

              then("`maximize.onhide` is called", () => {
                expect(onhide).toHaveBeenCalled();
              });

              then(
                "`maximize.onhide` is called with `{ detail: { visibility: Visibility.HIDDEN } }`",
                () => {
                  const message = {
                    detail: { visibility: Visibility.HIDDEN }
                  };
                  expect(onhide).toHaveBeenCalledWith(
                    jasmine.objectContaining(message)
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});

events(Event.ON_SHOW, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.onshow` setter exists", () => {
          expect(hasSetter(maximize, Event.ON_SHOW)).toBeTrue();
        });

        and("`maximize.onshow` setter exists", () => {
          and("`maximize.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              maximize.visibility = Visibility.HIDDEN;
            });

            and("`maximize.onshow` is set to a listener", () => {
              let onshow: jasmine.Spy;
              beforeEach(() => {
                onshow = jasmine.createSpy("onshow");
                maximize.onshow = onshow;
              });

              when("`maximize.onshow` is set to `invalid`", () => {
                let error: Error;
                beforeEach(() => {
                  try {
                    // @ts-expect-error
                    maximize.onshow = "invalid";
                  } catch (err) {
                    error = err as Error;
                  }
                });

                then("an error is thrown", () => {
                  expect(error).toBeDefined();
                });

                then("error message contains 'Invalid onshow value: invalid'", () => {
                  expect(error.message).toBe("Invalid onshow value: invalid");
                });

                when("`maximize.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    maximize.visibility = Visibility.VISIBLE;
                  });

                  then("`maximize.onshow` is still called", () => {
                    expect(onshow).toHaveBeenCalled();
                  });
                });
              });

              and("`maximize.onshow` is set to a new listener", () => {
                let onshow2: jasmine.Spy;
                beforeEach(() => {
                  onshow2 = jasmine.createSpy("onshow2");
                  maximize.onshow = onshow2;
                });

                when("`maximize.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    maximize.visibility = Visibility.VISIBLE;
                  });

                  then("old `maximize.onshow` is not called", () => {
                    expect(onshow).not.toHaveBeenCalled();
                  });

                  then("new `maximize.onshow` is called", () => {
                    expect(onshow2).toHaveBeenCalled();
                  });
                });
              });

              when("`maximize.visibility` is set to `Visibility.VISIBLE` twice", () => {
                beforeEach(() => {
                  maximize.visibility = Visibility.VISIBLE;
                  maximize.visibility = Visibility.VISIBLE;
                });

                then("`maximize.onshow` is called once", () => {
                  expect(onshow).toHaveBeenCalledTimes(1);
                });
              });

              when("`maximize.visibility` is set to `Visibility.VISIBLE`", () => {
                beforeEach(() => {
                  maximize.visibility = Visibility.VISIBLE;
                });

                then("`maximize.onshow` is called", () => {
                  expect(onshow).toHaveBeenCalled();
                });

                then(
                  "`maximize.onshow` is called with `{ detail: { visibility: Visibility.VISIBLE } }`",
                  () => {
                    const message = {
                      detail: { visibility: Visibility.VISIBLE }
                    };
                    expect(onshow).toHaveBeenCalledWith(
                      jasmine.objectContaining(message)
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

events(Event.ON_MAXIMIZE, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        then("`maximize.onmaximize` setter exists", () => {
          expect(hasSetter(maximize, Event.ON_MAXIMIZE)).toBeTrue();
        });

        and("`maximize.onmaximize` setter exists", () => {
          and("`maximize.onmaximize` is set to a listener", () => {
            let onmaximize: jasmine.Spy;
            beforeEach(() => {
              onmaximize = jasmine.createSpy("onmaximize");
              maximize.onmaximize = onmaximize;
            });

            when("`maximize.onmaximize` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  maximize.onmaximize = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then("error message contains 'Invalid onmaximize value: invalid'", () => {
                expect(error.message).toBe("Invalid onmaximize value: invalid");
              });

              when("`maximize.maximize` is invoked", () => {
                beforeEach(() => {
                  maximize.maximize();
                });

                then("`maximize.onmaximize` is still called", () => {
                  expect(onmaximize).toHaveBeenCalled();
                });
              });
            });

            when("`maximize.maximize` is invoked", () => {
              beforeEach(() => {
                maximize.maximize();
              });

              then("`maximize.onmaximize` is called", () => {
                expect(onmaximize).toHaveBeenCalled();
              });

              then("`maximize.onmaximize` is called with no detail", () => {
                const message = { detail: null };
                expect(onmaximize).toHaveBeenCalledWith(
                  jasmine.objectContaining(message)
                );
              });
            });

            and("`maximize.onmaximize` is set to a new listener", () => {
              let onmaximize2: jasmine.Spy;
              beforeEach(() => {
                onmaximize2 = jasmine.createSpy("onmaximize2");
                maximize.onmaximize = onmaximize2;
              });

              when("`maximize.maximize` is invoked", () => {
                beforeEach(() => {
                  maximize.maximize();
                });

                then("old `maximize.onmaximize` is not called", () => {
                  expect(onmaximize).not.toHaveBeenCalled();
                });

                then("new `maximize.onmaximize` is called", () => {
                  expect(onmaximize2).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

// Gesture
gesture(Gesture.POINTERDOWN, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        when("user presses the pointer down on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = maximize.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          then("`maximize.status` is `Status.PRESSED`", () => {
            expect(maximize.status).toEqual(Status.PRESSED);
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERUP, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        and("user presses the pointer down on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = maximize.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("user lifts the pointer from `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERUP));
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toEqual(Status.RELEASED);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERLEAVE, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        and("user presses the pointer down on `div` with class `icon`", () => {
          let onmaximize: jasmine.Spy;
          beforeEach(() => {
            onmaximize = jasmine.createSpy("onmaximize");
            maximize.onmaximize = onmaximize;
            const icon = maximize.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("the pointer leaves `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERLEAVE));
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toEqual(Status.RELEASED);
            });

            then("`onmaximize` is not called", () => {
              expect(onmaximize).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.CLICK, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        when("user `click` on `div` with class `icon`", () => {
          let onmaximize: jasmine.Spy;
          beforeEach(() => {
            onmaximize = jasmine.createSpy("onmaximize");
            maximize.onmaximize = onmaximize;
            const icon = maximize.root.querySelector(".icon") as HTMLElement;
            icon.click();
          });

          then("`onmaximize` is called", () => {
            expect(onmaximize).toHaveBeenCalled();
          });
        });

        when("user presses and lifts the pointer on `div` with class `icon`", () => {
          let onmaximize: jasmine.Spy;
          beforeEach(() => {
            onmaximize = jasmine.createSpy("onmaximize");
            maximize.onmaximize = onmaximize;
            const icon = maximize.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERUP));
            icon.click();
          });

          then("`maximize.status` is `Status.RELEASED`", () => {
            expect(maximize.status).toEqual(Status.RELEASED);
          });

          then("`onmaximize` is called once", () => {
            expect(onmaximize).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});

gesture(Gesture.KEYDOWN, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        and("`maximize.onmaximize` is set to a listener", () => {
          let onmaximize: jasmine.Spy;
          beforeEach(() => {
            onmaximize = jasmine.createSpy("onmaximize");
            maximize.onmaximize = onmaximize;
          });

          when("user presses `Key.ENTER` on `div` with class `icon`", () => {
            let keydown: KeyboardEvent;
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              keydown = new KeyboardEvent(Gesture.KEYDOWN, {
                key: Key.ENTER,
                cancelable: true
              });
              icon.dispatchEvent(keydown);
            });

            then("the default action of the key is prevented", () => {
              expect(keydown.defaultPrevented).toBeTrue();
            });

            then("`maximize.status` is `Status.PRESSED`", () => {
              expect(maximize.status).toEqual(Status.PRESSED);
            });

            then("`onmaximize` is not called", () => {
              expect(onmaximize).not.toHaveBeenCalled();
            });
          });

          when("user presses `Key.SPACE` on `div` with class `icon`", () => {
            let keydown: KeyboardEvent;
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              keydown = new KeyboardEvent(Gesture.KEYDOWN, {
                key: Key.SPACE,
                cancelable: true
              });
              icon.dispatchEvent(keydown);
            });

            then("the default action of the key is prevented", () => {
              expect(keydown.defaultPrevented).toBeTrue();
            });

            then("`maximize.status` is `Status.PRESSED`", () => {
              expect(maximize.status).toEqual(Status.PRESSED);
            });

            then("`onmaximize` is not called", () => {
              expect(onmaximize).not.toHaveBeenCalled();
            });
          });

          when("user holds `Key.ENTER` down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, { key: Key.ENTER })
              );
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, {
                  key: Key.ENTER,
                  repeat: true
                })
              );
            });

            then("`maximize.status` is `Status.PRESSED`", () => {
              expect(maximize.status).toEqual(Status.PRESSED);
            });

            then("`onmaximize` is not called", () => {
              expect(onmaximize).not.toHaveBeenCalled();
            });
          });

          when("user presses another key on `div` with class `icon`", () => {
            let keydown: KeyboardEvent;
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              keydown = new KeyboardEvent(Gesture.KEYDOWN, {
                key: "a",
                cancelable: true
              });
              icon.dispatchEvent(keydown);
            });

            then("the default action of the key is not prevented", () => {
              expect(keydown.defaultPrevented).toBeFalse();
            });

            then("`maximize.status` is `Status.RELEASED`", () => {
              expect(maximize.status).toEqual(Status.RELEASED);
            });

            then("`onmaximize` is not called", () => {
              expect(onmaximize).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.KEYUP, () => {
  and("Maximize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Maximize.Tag, Maximize);
    });

    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Maximize.Template.load("maximize.template.html");
      });
      afterEach(() => {
        remove(Maximize.Tag);
      });

      and("a new maximize is added to DOM", () => {
        let maximize: Maximize;
        beforeEach(() => {
          maximize = add<Maximize>(Maximize.Tag);
        });
        afterEach(() => {
          maximize.remove();
        });

        and("`maximize.onmaximize` is set to a listener", () => {
          let onmaximize: jasmine.Spy;
          beforeEach(() => {
            onmaximize = jasmine.createSpy("onmaximize");
            maximize.onmaximize = onmaximize;
          });

          and("user presses `Key.ENTER` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, { key: Key.ENTER })
              );
            });

            when("user lifts `Key.ENTER` on `div` with class `icon`", () => {
              beforeEach(() => {
                const icon = maximize.root.querySelector(".icon") as HTMLElement;
                icon.dispatchEvent(
                  new KeyboardEvent(Gesture.KEYUP, { key: Key.ENTER })
                );
              });

              then("`onmaximize` is called once", () => {
                expect(onmaximize).toHaveBeenCalledTimes(1);
              });

              then("`maximize.status` is `Status.RELEASED`", () => {
                expect(maximize.status).toEqual(Status.RELEASED);
              });

              when("user lifts `Key.ENTER` on `div` with class `icon` again", () => {
                beforeEach(() => {
                  const icon = maximize.root.querySelector(
                    ".icon"
                  ) as HTMLElement;
                  icon.dispatchEvent(
                    new KeyboardEvent(Gesture.KEYUP, { key: Key.ENTER })
                  );
                });

                then("`onmaximize` is called once", () => {
                  expect(onmaximize).toHaveBeenCalledTimes(1);
                });
              });
            });
          });

          and("user presses `Key.SPACE` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = maximize.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, { key: Key.SPACE })
              );
            });

            when("user lifts `Key.SPACE` on `div` with class `icon`", () => {
              beforeEach(() => {
                const icon = maximize.root.querySelector(".icon") as HTMLElement;
                icon.dispatchEvent(
                  new KeyboardEvent(Gesture.KEYUP, { key: Key.SPACE })
                );
              });

              then("`onmaximize` is called once", () => {
                expect(onmaximize).toHaveBeenCalledTimes(1);
              });

              then("`maximize.status` is `Status.RELEASED`", () => {
                expect(maximize.status).toEqual(Status.RELEASED);
              });

              when("user lifts `Key.SPACE` on `div` with class `icon` again", () => {
                beforeEach(() => {
                  const icon = maximize.root.querySelector(
                    ".icon"
                  ) as HTMLElement;
                  icon.dispatchEvent(
                    new KeyboardEvent(Gesture.KEYUP, { key: Key.SPACE })
                  );
                });

                then("`onmaximize` is called once", () => {
                  expect(onmaximize).toHaveBeenCalledTimes(1);
                });
              });
            });
          });
        });
      });
    });
  });
});
