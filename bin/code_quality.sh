#!/bin/sh

red='\e[1;31m'
cyn='\e[1;36m'
grn='\e[1;32m'
end='\e[0m'

ERROR=0

printf "\n$cyn Running lint... $end\n"
npm run lint
if ! [ $? -eq 0 ]; then
  printf "\n$red ERROR! Linting failed.$end\n";
  ERROR=1;
else
  printf "$grn OK: Code lint check.$end\n";
fi

printf "\n$cyn Running unit tests... $end\n"
npm run test
if ! [ $? -eq 0 ]; then
  printf "\n$red ERROR! Unit tests failed.$end\n";
  ERROR=1;
else
  printf "$grn OK: Unit tests.$end\n";
fi

exit $ERROR #ignore audit

printf "\n$cyn Running audit for security... $end\n"
npm run audit > /dev/null 2>&1
if ! [ $? -eq 0 ]; then
  npm audit
  printf "\n$red ERROR! Audit failed.$end\n";
  ERROR=1;
else
  printf "$grn OK: Audit security check.$end\n";
fi

exit $ERROR
