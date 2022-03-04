import { mount } from "@vue/test-utils";
import FetchExample from "../../../components/FetchExample.vue";

describe("Component", () => {
  test("something", () => {
    const wrapper = mount(FetchExample);
    expect(wrapper.element).toMatchSnapshot();
  });
});
