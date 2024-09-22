import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import "vuetify/styles";
export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  icons: {
    iconfont: "mdi",
  },
});
