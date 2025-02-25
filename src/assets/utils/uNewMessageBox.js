import { createApp, h } from "vue";
import MessageBox from "@/components/MessageBox.vue";

export function useMessage() {
  return (options) => {
    console.log("호출됨", options);

    return new Promise((resolve) => {
      const container = document.createElement("div");
      document.body.appendChild(container);

      const app = createApp({
        data: () => ({
          visible: true, // 초기값 true
        }),
        methods: {
          close() {
            this.visible = false;
            app.unmount();
            document.body.removeChild(container);
          },
          confirm() {
            console.log("✔️ 확인 버튼 클릭됨");

            // onConfirm 함수 실행
            if (typeof options.onConfirm === "function") {
              options.onConfirm(); // 전달된 함수 실행
            }

            resolve(true);
            this.close();
          },
        },
        render() {
          console.log("🎨 MessageBox 렌더링 시도");
          return h(MessageBox, {
            ...options,
            visible: this.visible, // visible 상태 바인딩
            onClose: this.close,
            onConfirm: this.confirm,
          });
        },
      });

      app.mount(container);
    });
  };
}
