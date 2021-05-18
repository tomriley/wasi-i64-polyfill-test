export CC=../wasi-sdk-12.0/bin/clang\ --sysroot=../wasi-sysroot
# original
$CC -nostartfiles -Wl,--no-entry example.c -o dist/original.wasm
# with polyfills
$CC -nostartfiles -Wl,--no-entry example.c i64_polyfill.c -o dist/polyfilled.wasm

# build js
yarn build
