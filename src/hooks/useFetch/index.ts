import { onUnmounted, shallowRef } from "vue";

type State<T> = {
  data?: T;
  error?: Error;
};

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

const useFetch = <T = unknown>(url?: string, options?: RequestInit) => {
  const controller = new AbortController();
  let signal = controller.signal;

  options = { ...options, signal };

  const initialState: State<T> = {
    data: undefined,
    error: undefined,
  };

  // 如果一个对象被赋值为ref的值，则该对象会使用reactive()进行深度响应。
  // 为了避免深度响应,应该使用shallowRef
  // 详情可见: https://staging-cn.vuejs.org/api/reactivity-core.html#ref

  const state = shallowRef<State<T>>(initialState);

  const dispatch = (action: Action<T>): void => {
    switch (action.type) {
      case "loading":
        state.value = initialState;
        break;
      case "fetched":
        state.value = { ...initialState, data: action.payload };
        break;
      case "error":
        state.value = { ...initialState, error: action.payload };
        break;
    }
  };

  if (!url) return;

  const fetchData = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = (await res.json()) as T;
      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error as Error });
    }
  };

  fetchData();
  // 组件卸载时中止请求
  onUnmounted(() => {
    controller.abort();
  });

  // 返回的必须是个Ref, ref具有响应式, ref.value并不是
  return state;
};

export default useFetch;
