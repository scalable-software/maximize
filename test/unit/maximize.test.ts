import { Template } from "@scalable.software/component";

import {
  Maximize,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility
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
          });
        });
      });
    });
  });
});

// Operation

// Event

// Gesture
