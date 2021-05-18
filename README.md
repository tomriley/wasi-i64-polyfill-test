Small test project to learn about wasi/wasm and work around this problem (problems with i64 signatures not being supported within iOS browers):

* https://github.com/WebAssembly/WASI/issues/334
* https://github.com/swiftwasm/carton/issues/127

Polyfill code used (by Yuta Saito): https://github.com/swiftwasm/swiftwasm-pad/tree/master/Frontend/Sources/i64_polyfill
