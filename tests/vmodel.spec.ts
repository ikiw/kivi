import {VModel} from "../lib/vmodel";
import {XlinkNamespace} from "../lib/misc";

const expect = chai.expect;

describe("VModel", () => {
  it("should create div element", () => {
    const m = new VModel("div");
    const e = m.createElement();
    expect(e.tagName).to.equal("DIV");
    expect(e).isPrototypeOf(HTMLElement);
  });

  it("should create svg element", () => {
    const m = new VModel("a")
      .svg();
    const e = m.createElement();
    expect(e).isPrototypeOf(SVGElement);
  });

  it("should assign props", () => {
    const m = new VModel("div")
      .props({
        prop1: "value1",
        prop2: "value2",
      });
    const e = m.createElement();
    expect((e as any).prop1).to.equal("value1");
    expect((e as any).prop2).to.equal("value2");
  });

  it("should assign attrs", () => {
    const m = new VModel("div")
      .attrs({
        attr1: "value1",
        attr2: "value2",
      });
    const e = m.createElement();
    expect(e.getAttribute("attr1")).to.equal("value1");
    expect(e.getAttribute("attr2")).to.equal("value2");
  });

  it("should assign svg attrs", () => {
    const m = new VModel("a")
      .svg()
      .attrs({
        "xlink:href": "value"
      });
    const e = m.createElement();
    expect(e.getAttributeNS(XlinkNamespace, "href")).to.equal("value");
  });

  it("should assign style", () => {
    const m = new VModel("div")
      .style("background: red");
    const e = m.createElement();
    expect((e as HTMLElement).style.background).to.have.string("red");
  });

  it("should assign svg style", () => {
    const m = new VModel("a")
      .svg()
      .style("background: red");
    const e = m.createElement();
    expect((e as SVGElement).getAttribute("style")).to.have.string("red");
  });

  it("should assign className", () => {
    const m = new VModel("div")
      .className("box");
    const e = m.createElement();
    expect((e as HTMLElement).className).to.equal("box");
  });

  it("should assign svg className", () => {
    const m = new VModel("a")
      .svg()
      .className("box");
    const e = m.createElement();
    expect((e as SVGElement).getAttribute("class")).to.equal("box");
  });

  it("should update using custom update handler", () => {
    const m = new VModel<string>("div")
      .updateHandler((element: HTMLElement, oldData: string | undefined, newData: string) => {
        if (oldData === undefined) {
          element.className = newData;
        } else {
          expect(element.className).to.equal("a");
          element.className = newData;
        }
      });

    const e = m.createElement();
    m.update(e, undefined, "a");
    expect((e as HTMLElement).className).to.equal("a");
    m.update(e, "a", "b");
    expect((e as HTMLElement).className).to.equal("b");
  });
});
