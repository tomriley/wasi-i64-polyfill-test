#include <stdio.h>
#include <time.h>

__attribute__((export_name("get_millis")))
int32_t get_millis() {

  int32_t i = 0;
  struct timespec now;
  clock_gettime(CLOCK_REALTIME, &now);
  i = now.tv_sec * 1000 + now.tv_nsec / 1000000;

  printf("about to return %d from C code\n", i);

  return i;
}
