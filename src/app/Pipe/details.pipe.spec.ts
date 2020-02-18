import { DetailsPipe } from "../Pipe/details.pipe";

describe("DetailsPipe", () => {
  it("create an instance", () => {
    const pipe = new DetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
