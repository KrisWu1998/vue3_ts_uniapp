import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import styleImport, { VantResolve } from 'vite-plugin-style-import';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/h5',
  plugins: [
    uni(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
});
