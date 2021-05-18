import { WASI } from "@wasmer/wasi";
import { WasmFs } from "@wasmer/wasmfs";
import { wrapI64Polyfill } from "./i64_polyfill";

function getImports(wasi) {
  let i64Polyfill = wrapI64Polyfill(wasi.wasiImport);

  return {
    i64_polyfill: i64Polyfill,
    wasi_snapshot_preview1: wasi.wasiImport,
    env: {
      _provide_mode: () => { return 1 /* app mode */; },
      //writeOutput: () => { /* stub */},
      memory: wasi.memory, // what does this do?
    }
  }
};

console.log("example-wasi loaded");


export async function loadWasm(wasmPath) {
  const wasmFs = new WasmFs();

  // Output stdout and stderr to console
  const originalWriteSync = wasmFs.fs.writeSync;
  wasmFs.fs.writeSync = (fd, buffer, offset, length, position) => {
    const text = new TextDecoder("utf-8").decode(buffer);
    switch (fd) {
      case 1:
        console.log(text);
        break;
      case 2:
        console.warn(text);
        break;
    }
    return originalWriteSync(fd, buffer, offset, length, position);
  };

  let wasi = new WASI({
    args: [],
    env: {},
    bindings: {
      ...WASI.defaultBindings,
      fs: wasmFs.fs
    }
  });

  const response = await fetch(wasmPath);
  const buffer = await response.arrayBuffer();
  const imports = getImports(wasi);
  const module = await WebAssembly.compile(buffer);
  console.log(module);
  console.log(imports);
  const instance = await WebAssembly.instantiate(module, imports);
  wasi.memory = instance.exports.memory;
  console.log(`loaded ${wasmPath}`);
  return instance.exports;
};
